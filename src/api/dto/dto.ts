import { Recipe, User } from "../models/types"

const dtoToRecipe = (data: any): Recipe => {
    return {
        id: data['id'],
        title: data['title'] || '',
        image: data['image'] || '',
        tags: data['tags'] || [],
        ingredients: data['ingredients'] || [],
        instructions: data['instructions'] || [],
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