export type Recipe = {
    id: number,
    title: string,
    image: string,
    ingredients: string[],
    instructions: string,
    //tags: string[]
    ratings: number,
    createdBy: User['id']
}

export type User = {
    id: number,
    username: string,
    password: string,
    savedRecipes: Recipe['id'][]
}