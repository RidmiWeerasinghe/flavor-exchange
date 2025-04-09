import { useState } from "react"
import { Recipe } from "../api/models/types";
import { createRecipe } from "../api/service/recipes";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";

type FormData = {
    title: string,
    image: string,
    ingredients: string[],
    instructions: string,
}

export default function useCreateRecipeForm() {
    const userId = useUserStore(state => state.id)
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        title: '',
        image: '',
        ingredients: [],
        instructions: ""
    })
    const [rawIngredientsInput, setRawIngredientsInput] = useState('');
    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        const recipe: Recipe = {
            id: 0,
            title: formValues.title,
            image: formValues.image,
            ingredients: formValues.ingredients,
            instructions: formValues.instructions,
            createdBy: userId ? userId : 2,
            ratings: 2
        };
        createRecipe(recipe);
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
    return {
        formValues,
        handleFormInput,
        handleFormArrayInput,
        rawIngredientsInput,
        handleSubmit
    }
}
