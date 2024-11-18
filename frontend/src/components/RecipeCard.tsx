import { Recipe } from "../App";

interface Props {
  recipe: Recipe;
  isLoggedIn: boolean | undefined;
}

export default function RecipeCard({ recipe, isLoggedIn }: Props) {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>{recipe.subtitle}</h3>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>;
        })}
      </ul>
      <ol>
        {recipe.steps.map((step, index) => {
          return <li key={index}>{step}</li>;
        })}
      </ol>
      {isLoggedIn && (
        <>
          <button>edit</button>
          <button>remove</button>
        </>
      )}
    </div>
  );
}
