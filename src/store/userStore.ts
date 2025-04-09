import { create } from "zustand";
import { Recipe, User } from "../api/models/types";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
    id?: User['id']
    username?: User['username']
    password?: User['password']
    savedRecipes: User['savedRecipes']
    isAuthenticated: boolean

    setId: (id?: User['id']) => void,
    setUsername: (username?: User['username']) => void,
    setPassword: (password?: User['password']) => void,
    setFavorites: (favorites?: User['savedRecipes']) => void,
    setAuthenticated: (value: boolean) => void,

    addToFavorites: (_: Recipe['id']) => void,
    removeFromFavorites: (_: Recipe['id']) => void,
}

const useUserStore = create<UserStore>()(persist((set) => ({
    id: undefined,
    username: undefined,
    password: undefined,
    savedRecipes: [],
    isAuthenticated: false,

    setId: (userId) => set({ id: userId }),
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setFavorites: (favorites = []) => set({ savedRecipes: [...favorites] }),
    setAuthenticated: (value) => set({ isAuthenticated: value }),

    addToFavorites: (recipeId) => set((state) => ({ savedRecipes: state.savedRecipes ? [...state.savedRecipes, recipeId] : [recipeId] })),
    removeFromFavorites: (recipeId) => set((state) => ({ savedRecipes: state.savedRecipes.filter(r => r !== recipeId) })),
}), {
    name: "recipe-platform-user",
    storage: createJSONStorage(() => localStorage)
}))

export { useUserStore }