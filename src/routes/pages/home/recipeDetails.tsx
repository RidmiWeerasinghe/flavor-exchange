import { useParams } from "react-router";
import { Recipe } from "../../../api/models/types";
import useFetch from "../../../hooks/usefetch";
import { getRecipeById } from "../../../api/service/recipes";
import Spinner from "../../../components/spinner";

export default function RecipeDetails() {
    const params = useParams();

    const { data, isLoading, error } = useFetch<Recipe>({ apiFunction: getRecipeById, args: params.recipeId })

    if (isLoading) {
        return <Spinner />
    } else if (error) {
        return <div>{JSON.stringify(error, null, 2)}</div>
    }

    return (
        <div>{JSON.stringify(error, null, 2)}</div>
    )


}
