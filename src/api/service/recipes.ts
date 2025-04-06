import data from "../data/recipes.json"
import { dtoToRecipe } from "../dto/dto"
import { Recipe } from "../models/types"

const recipeDatabase = data;

const getAllRecipes = async (): Promise<Recipe[]> => {
    const data = recipeDatabase.map(dtoToRecipe)
    return new Promise<Recipe[]>(resolve => resolve(data))
}

const getRecipeById = async (id: Recipe['id']): Promise<Recipe> => {
    const rawData = recipeDatabase.find(data => data.id === id);
    const recipe = dtoToRecipe(rawData)
    return new Promise<Recipe>(resolve => resolve(recipe))
}

const createRecipe = async (recipe: Recipe) => {
    recipeDatabase.push({ ...recipe })
}

export { getAllRecipes, getRecipeById, createRecipe }