import { useNavigate } from "react-router-dom";
import { Recipe } from "../App";
import RecipeCard from "../components/RecipeCard";

interface Props {
  isLoggedIn: boolean | undefined;
  username: string | undefined;
  recipes: Recipe[];
}

export default function LandingPage({ isLoggedIn, username, recipes }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {isLoggedIn ? (
        <>
          <label>{"Hello " + username + "!"}</label>
          <hr></hr>
          <button onClick={() => navigate("/addrecipe")}>add recipe</button>
          <button onClick={() => navigate("/editrecipe")}>edit recipe</button>
          <button onClick={() => navigate("/removerecipe")}>
            remove recipe
          </button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>login</button>
      )}
      {recipes.map((recipe, index) => {
        return (
          <RecipeCard
            key={index}
            recipe={recipe}
            isLoggedIn={isLoggedIn}
          ></RecipeCard>
        );
      })}
    </>
  );
}
