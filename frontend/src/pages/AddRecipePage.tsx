import { useState } from "react";
import RecipeIngredient from "../components/RecipeIngredient";
import RecipeStep from "../components/RecipeStep";
import { Recipe } from "../App";

interface Props {
  addRecipe: (recipe: Recipe) => void;
}

export default function AddRecipePage({ addRecipe }: Props) {
  function addIngredientField(ingredient: string) {
    setIngredients((ingredients) => [...ingredients, ingredient]);
  }

  function addStepField(step: string) {
    setSteps((steps) => [...steps, step]);
  }

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);

  return (
    <>
      <label>Title </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      ></input>
      <br></br>
      <label>Subtitle </label>
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.currentTarget.value)}
      ></input>
      <br></br>
      <label>Description </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <br></br>
      <label>Ingredients </label>
      <input
        value={ingredient}
        onChange={(e) => setIngredient(e.currentTarget.value)}
      ></input>
      <button onClick={() => addIngredientField(ingredient)}>+</button>
      <br></br>
      <ul>
        {ingredients.map((value) => {
          return <RecipeIngredient ingredient={value} />;
        })}
      </ul>
      <br></br>
      <label>Steps </label>
      <input
        value={step}
        onChange={(e) => setStep(e.currentTarget.value)}
      ></input>
      <button onClick={() => addStepField(step)}>+</button>
      <ol>
        {steps.map((value) => {
          return <RecipeStep step={value} />;
        })}
      </ol>
      <hr></hr>
      <button
        onClick={() =>
          addRecipe(
            new Recipe(title, subtitle, description, ingredients, steps)
          )
        }
      >
        add
      </button>
    </>
  );
}
