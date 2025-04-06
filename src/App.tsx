import { useEffect, useState } from 'react'
import './App.css'
import { Recipe } from './api/models/types'
import { createRecipe, getAllRecipes } from './api/service/recipes'

function App() {

  const [data, setData] = useState<Recipe[]>([])

  const handleCreate = async () => {
    const newRecipe = await createRecipe({
      id: 12,
      title: "test",
      createdBy: 2,
      image: "",
      ingredients: ["testIng"],
      instructions: "gfy",
      ratings: 4,
      tags: ["n", "x"]
    })
    setData(prev => [...prev, newRecipe])
  }

  useEffect(() => {
    const asyncBootstrap = async () => {
      const recipes = (await getAllRecipes()).reverse()
      setData(recipes)
    }
    asyncBootstrap()
  }, [])

  return (
    <div>
      <button onClick={handleCreate}>create</button>
      {JSON.stringify(data)}
    </div>
  )
}

export default App
