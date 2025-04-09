import data from "../data/recipes.json"
import { dtoToRecipe } from "../dto/dto"
import { Recipe } from "../models/types"

const recipeDatabase = data;

const getAllRecipes = async (): Promise<Recipe[]> => {
    const data = recipeDatabase.map(dtoToRecipe)
    return Promise.resolve(data);
}

const getRecipeById = async (id: Recipe['id']): Promise<Recipe> => {
    const rawData = recipeDatabase.find(data => data.id == id);
    const recipe = dtoToRecipe(rawData)
    return new Promise<Recipe>(resolve => resolve(recipe))
}

//get all user favorite recipes -> arg : array of userFavorite recipe ids from local storage
const getRecipes = async (ids: Recipe['id'][]): Promise<Recipe[]> => {
    const data = recipeDatabase.filter(r => ids.includes(r.id)).map(dtoToRecipe)
    return new Promise<Recipe[]>(resolve => resolve(data))
}

//get all recipes by current user id 
const getRecipesByCreatedById = async (id: Recipe['createdBy']): Promise<Recipe[]> => {
    const data = recipeDatabase
        .filter(r => r.createdBy === id)     // Filter recipes by creator ID
        .map(dtoToRecipe);
    return new Promise<Recipe[]>(resolve => resolve(data))
}

const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const lastRecipeId = recipeDatabase.length
    const newRecipe = { ...recipe, id: lastRecipeId + 1 }
    console.log("newRecipe", newRecipe)
    recipeDatabase.push(newRecipe)
    return new Promise<Recipe>(resole => resole(newRecipe))
}

const updateRecipe = async (recipe: Recipe): Promise<Recipe | null> => {
    const recipeIndex = recipeDatabase.findIndex(data => data.id === recipe.id);

    if (recipeIndex === -1) {
        console.error("Recipe not found");
        return null;
    }
    recipeDatabase[recipeIndex] = { ...recipe };
    return new Promise<Recipe>(resolve => resolve(recipeDatabase[recipeIndex]));
}


const deleteRecipe = async (id: Recipe['id']): Promise<Recipe | null> => {
    const recipeIndex = recipeDatabase.findIndex(data => data.id === id);
    if (recipeIndex === -1) {
        console.error("Recipe not found");
        return null;
    }
    const recipe = dtoToRecipe(recipeDatabase[recipeIndex]);
    recipeDatabase.splice(recipeIndex, 1);
    return new Promise<Recipe>(resolve => resolve(recipe));
}


export { getAllRecipes, getRecipes, getRecipeById, createRecipe, getRecipesByCreatedById, deleteRecipe, updateRecipe }