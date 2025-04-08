import data from "../data/recipes.json"
import { dtoToRecipe } from "../dto/dto"
import { Recipe } from "../models/types"

const recipeDatabase = data;

const getAllRecipes = async (): Promise<Recipe[]> => {
    const data = recipeDatabase.map(dtoToRecipe)
    return new Promise<Recipe[]>(resolve => resolve(data))
}

const getRecipeById = async (id: Recipe['id']): Promise<Recipe> => {
    const rawData = recipeDatabase.find(data => data.id == id);
    const recipe = dtoToRecipe(rawData)
    return new Promise<Recipe>(resolve => resolve(recipe))
}

const getRecipes = async (ids: Recipe['id'][]): Promise<Recipe[]> => {
    const data = recipeDatabase.filter(r => ids.includes(r.id)).map(dtoToRecipe)
    return new Promise<Recipe[]>(resolve => resolve(data))
}

const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const newRecipe = { ...recipe }
    recipeDatabase.push(newRecipe)
    return new Promise<Recipe>(resole => resole(newRecipe))
}

export { getAllRecipes, getRecipes, getRecipeById, createRecipe }