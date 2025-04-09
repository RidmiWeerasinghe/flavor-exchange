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
    tags: string[]
}

export default function useCreateRecipeForm() {
    const userId = useUserStore(state => state.id)!
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<FormData>({
        id: 0,
        title: '',
        image: '',
        ingredients: [],
        instructions: "",
        ratings: 0,
        tags: []
    })
    const [rawIngredientsInput, setRawIngredientsInput] = useState('');
    const [rawTagsInput, setRawTagsInput] = useState('');
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
            createdBy: userId,
            ratings: formValues.ratings,
            tags: formValues.tags
        };
        updateRecipe(recipe);
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
        console.log(value)
        const updatedArray = value
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')

        setFormValues(prev => ({
            ...prev,
            tags: updatedArray,
        }))
    }
    const initializeFormValues = (data: Recipe) => {
        setFormValues({
            id: data.id,
            title: data.title,
            image: data.image,
            ingredients: data.ingredients,
            instructions: data.instructions,
            ratings: data.ratings,
            tags: data.tags
        });
        setRawIngredientsInput(data.ingredients.join(', '));
        setRawTagsInput(data.tags.join(', '))
    };

    return {
        formValues,
        handleFormInput,
        handleFormIngredientsArrayInput,
        handleFormTagsArrayInput,
        rawIngredientsInput,
        rawTagsInput,
        handleSubmit,
        initializeFormValues
    }
}
