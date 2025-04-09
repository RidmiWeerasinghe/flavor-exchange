import { useState } from "react"
import { Recipe } from "../api/models/types";
import { createRecipe, updateRecipe } from "../api/service/recipes";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";

type FormData = {
    id: number
    title: string,
    image: string,
    ingredients: string[],
    instructions: string,
    ratings: number,
}

export default function useCreateRecipeForm() {
    const userId = useUserStore(state => state.id)
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        id: 0,
        title: '',
        image: '',
        ingredients: [],
        instructions: "",
        ratings: 0
    })
    const [rawIngredientsInput, setRawIngredientsInput] = useState('');
    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        const recipe: Recipe = {
            id: formValues.id,
            title: formValues.title,
            image: formValues.image,
            ingredients: formValues.ingredients,
            instructions: formValues.instructions,
            createdBy: userId ? userId : 2,
            ratings: formValues.ratings
        };
        updateRecipe(recipe);
        navigate("/my-recipes");
    }

    const handleFormArrayInput = (value: string) => {
        setRawIngredientsInput(value)
        const updatedArray = value
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')

        setFormValues(prev => ({
            ...prev,
            ingredients: updatedArray,
        }))
    }
    const initializeFormValues = (data: Recipe) => {
        setFormValues({
            id: data.id,
            title: data.title,
            image: data.image,
            ingredients: data.ingredients,
            instructions: data.instructions,
            ratings: data.ratings
        });
        setRawIngredientsInput(data.ingredients.join(', '));
    };

    return {
        formValues,
        handleFormInput,
        handleFormArrayInput,
        rawIngredientsInput,
        handleSubmit,
        initializeFormValues
    }
}
