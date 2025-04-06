import { Recipe, User } from "../models/types"

const dtoToRecipe = (data: any): Recipe => {
    return {
        id: data['idMeal'],
        title: data['strMeal'] || '',
        image: data['strMealThumb'] || '',
        tags: data['tags'] || [],
        ingredients: data['strIngredients'] || [],
        instructions: data['strInstructions'] || [],
        ratings: data['ratings'] || [],
        createdBy: data['createdBy'],
    }
}

const dtoToUser = (data: any): User => {
    return {
        id: data['id'],
        username: data['username'],
        password: data['password'],
        savedRecipes: data['savedRecipes'] || [],
    }
}

export { dtoToRecipe, dtoToUser }