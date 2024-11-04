export interface Meal {
    type: string;
    description: string;
    kcal: string;
}
export interface Meals extends Meal {
    id: string
}

export interface iMeal {
    [id: string]: Meal;
}