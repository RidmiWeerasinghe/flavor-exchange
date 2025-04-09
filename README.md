# 🍲 Flavor Exchange

**Flavor Exchange** is a modern React-based mock recipe management app where users can register, log in, browse, search, create, edit, and delete recipes. Users can also favorite recipes they love — all powered by a mock API and client-side authentication.

---

## ✨ Features

- 🔐 **User Authentication**

  - Register & Login with client-side validation
  - User data is stored securely in **Local Storage**

- 📋 **Recipe Management**

  - View all recipes
  - Search recipes by keyword
  - Add, edit, and delete recipes
  - Favorite/unfavorite recipes

- 🧪 **Mock API Setup**
  - All recipe data is served from a **mock API layer**
  - Initial data loaded from a JSON file (`api/data/recipes.json`)
  - API requests simulated using delay and promise-based handlers

---

## 🧱 Tech Stack

- ⚛️ **React 19** + **TypeScript**
- 🎨 **MUI (Material UI)** for component styling
- 🧵 **Tailwind CSS** for custom utility styling
- 🧠 **Zustand** for global state management
- 🛠️ **Vite** for fast dev environment
- 🧼 **ESLint** + TypeScript config for clean code
- 🌐 **React Router** for navigation

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/flavor-exchange.git
cd flavor-exchange
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run the development server

```bash
npm run dev
```

## 📌 Notes

This app uses local storage to store user login info and favorite recipes.

There is no backend — all recipe CRUD operations are handled using a custom mock API layer.

For a real-world version, the mock API could be replaced with tools like json-server, Firebase, or a real backend.

## 🙌 Acknowledgments

[React](https://reactjs.org/)

[Material UI](https://mui.com/)

[Tailwind CSS](https://tailwindcss.com/)

[Zustand](https://github.com/pmndrs/zustand)

[Vite](https://vitejs.dev/)

## 📃 License

This project is licensed under the MIT License.

## 👤 Author

Ridmi Weerasinghe
An aspiring full-stack developer passionate about building clean and functional web apps.
