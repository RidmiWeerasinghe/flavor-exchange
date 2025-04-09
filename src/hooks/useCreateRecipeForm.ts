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
    tags: string[]
}

export default function useCreateRecipeForm() {
    const userId = useUserStore(state => state.id)!
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        title: '',
        image: '',
        ingredients: [],
        instructions: "",
        tags: []
    })
    const [rawIngredientsInput, setRawIngredientsInput] = useState('');
    const [rawTagsInput, setRawTagsInput] = useState('');
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
            createdBy: userId,
            ratings: 2,
            tags: formValues.tags
        };
        createRecipe(recipe);
        navigate("/my-recipes");
    }

    const handleFormIngredientsArrayInput = (value: string) => {
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
    const handleFormTagsArrayInput = (value: string) => {
        setRawTagsInput(value)
        const updatedArray = value
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')

        setFormValues(prev => ({
            ...prev,
            tags: updatedArray,
        }))
    }
    return {
        formValues,
        handleFormInput,
        handleFormIngredientsArrayInput,
        handleFormTagsArrayInput,
        rawIngredientsInput,
        rawTagsInput,
        handleSubmit
    }
}
