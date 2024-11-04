import {useState} from "react";
import {Meal} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {useNavigate} from "react-router-dom";

const NewMeal = () => {

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
        await axiosApi.post('meals.json', meal);
        navigate('/');
      } catch (e) {
          console.log(e);
      } finally {
          setSpinner(false);
      }
    };

    if (spinner) {
        return <Loader />;
    }

    return (
        <form onSubmit={onSubmit} className="d-flex flex-column gap-3 w-50 mx-auto mt-5 border p-5 shadow" style={{background: '#AACCB8'}}>
              <div className="form-group">
                  <select className="form-control" name="type" onChange={onHandleChange} value={meal.type}>
                      <option value="">Select type</option>
                      {mealTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                  </select>
              </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter meal description!" name="description" onChange={onHandleChange} value={meal.description} />
            </div>
            <div className="form-group">
            <input type="number" className="form-control" placeholder="Enter Kcal!" name="kcal" onChange={onHandleChange} value={meal.kcal} />
            </div>
            <button className="btn btn-success mt-3" type="submit">Save</button>
        </form>
    );
};

export default NewMeal;