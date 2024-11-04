import {useCallback, useEffect, useState} from "react";
import {Meal} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {useNavigate, useParams} from "react-router-dom";

const NewMeal = () => {
    const { id: params} = useParams();

    const [meal, setMeal] = useState<Meal>({
        type: '',
        description: '',
        kcal: ''
    });
    const [spinner, setSpinner] = useState(false);
    const mealTypes = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];
    const navigate = useNavigate();

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setMeal(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value
      }));
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      try {
          setSpinner(true);
          if (params) {
              await axiosApi.put(`meals/${params}.json`, meal);
          } else {
              await axiosApi.post('meals.json', meal);
              navigate('/');
          }
      } catch (e) {
          console.log(e);
      } finally {
          setSpinner(false);
      }
    };

    const request = useCallback(async () => {
        if (params) {
            try {
                const res = await axiosApi.get(`meals/${params}.json`);
                setMeal(res.data);
            } catch (error) {
                console.error(error);
            }
        }
    }, [params]);

    useEffect(() => {
        if (params) {
            request();
        }
    }, [request, params]);

    if (spinner) {
        return <Loader />;
    }

    return (
        <form onSubmit={onSubmit} className="d-flex flex-column gap-3 w-75 mx-auto mt-5 border p-5 shadow" style={{background: '#AACCB8'}}>
              <div className="form-group">
                  <select className="form-control" name="type" onChange={onHandleChange} value={meal.type} required>
                      <option value="">Select type</option>
                      {mealTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                  </select>
              </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter meal description!" name="description" onChange={onHandleChange} value={meal.description} required />
            </div>
            <div className="form-group">
            <input type="number" className="form-control" placeholder="Enter Kcal!" name="kcal" onChange={onHandleChange} value={meal.kcal} required />
            </div>
            <button className="btn btn-success mt-3" type="submit" disabled={spinner}>Save</button>
        </form>
    );
};

export default NewMeal;