import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AddRecipePage from "./pages/AddRecipePage";

const API_HEADERS = {
  Authorization: "supersecretapikey",
};
const BACKEND_ADDRESS = "http://192.168.50.2:1234";

export class User {
  username: string = "";
  password: string = "";
}

export class Recipe {
  title: string = "";
  subtitle: string = "";
  description: string = "";
  ingredients: string[] = [];
  steps: string[] = [];
  constructor(
    title: string,
    subtitle: string,
    description: string,
    ingredients: string[],
    steps: string[]
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/recipes`, { headers: API_HEADERS })
      .then((response) => response.json())
      .then((result) => setRecipes(result as Recipe[]));
  });

  function handleLogin(
    username: string | undefined,
    password: string | undefined
  ) {
    fetch(`${BACKEND_ADDRESS}/users`, { headers: API_HEADERS })
      .then((response) => response.json())
      .then((users) => {
        for (const user of users as User[]) {
          if (username === user.username) {
            if (password === user.password) {
              setCurrentUser(user);
              setIsLoggedIn(true);
              navigate("/");
              return;
            } else {
              alert("Incorrect password!");
              return;
            }
          } else {
            alert("User does not exist!");
            return;
          }
        }
      });
  }

  function addRecipe(recipe: Recipe) {
    fetch(`${BACKEND_ADDRESS}/addrecipe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "supersecretapikey",
      },
      body: JSON.stringify(recipe),
    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            isLoggedIn={isLoggedIn}
            username={currentUser?.username}
            recipes={recipes}
          />
        }
      />
      <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
      <Route
        path="/addrecipe"
        element={<AddRecipePage addRecipe={addRecipe} />}
      />
    </Routes>
  );
}
