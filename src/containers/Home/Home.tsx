import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import {iMeal, Meals} from "../../types.ts";
import Card from "../../components/Card/Card.tsx";

const Home = () => {

    const [meals, setMeals] = useState<Meals[]>([]);

    const request = useCallback(async () => {
        const { data: res } = await axiosApi.get<iMeal | null>('meals.json');
        if (res !== null) {
            const data = Object.keys(res).map(m => ({
                ...res[m],
                id: m
            }));
            console.log(data);
            setMeals(data);
        }
    }, []);

    const total: number = meals.reduce((acc, meal) => acc + parseFloat(meal.kcal), 0);

    const del = useCallback(async (id: string) => {
        if (id) {
            await axiosApi.delete(`meals/${id}.json`);
        }
    }, []);

    // const edit = useCallback(async (id: string) => {
    //
    // }, []);

    useEffect(() => {
        void request();
    }, [request, del]);

    console.log(meals);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mt-5">
                <span className="fs-5">Total calories: {total}</span>
                <Link to={'/meals/new'} className="btn btn-outline-success">Add new meal</Link>
            </div>

            <div className="mt-5">
                {meals.reverse().map((meal) => (
                    <Card type={meal.type} description={meal.description} kcal={meal.kcal} key={meal.id} id={meal.id} del={del} />
                ))}
            </div>

        </div>
    );
};

export default Home;