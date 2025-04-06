import { create } from "zustand";
import { Recipe, User } from "../api/models/types";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = Partial<User> & {
    setId: (_: User['id']) => void,
    setUsername: (_: User['username']) => void,
    setPassword: (_: User['password']) => void,
    setFavorites: (_: User['savedRecipes']) => void,
    addToFavorites: (_: Recipe['id']) => void,
}

const useUserStore = create<UserStore>()(persist((set) => ({
    id: undefined,
    username: undefined,
    password: undefined,
    savedRecipes: [],

    setId: (userId) => set({ id: userId }),
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setFavorites: (favorites) => set(({ savedRecipes: [...favorites] })),
    addToFavorites: (recipeId) => set((state) => ({ savedRecipes: state.savedRecipes ? [...state.savedRecipes, recipeId] : [recipeId] })),
}), {
    name: "recipe-platform-user",
    storage: createJSONStorage(() => localStorage)
}))

export { useUserStore }