import { useState } from "react";

import { Recipe } from "../App";
import { useNavigate } from "react-router-dom";

interface Props {
  addRecipe: (recipe: Recipe) => void;
}

export default function AddRecipePage({ addRecipe }: Props) {
  const navigate = useNavigate();

  function addIngredientField(ingredient: string) {
    setIngredients((ingredients) => [...ingredients, ingredient]);
  }

  function addStepField(step: string) {
    setSteps((steps) => [...steps, step]);
  }

  function saveAndReturn() {
    addRecipe(new Recipe(title, subtitle, description, ingredients, steps));
    navigate("/");
  }

  function saveAndAddMore() {
    addRecipe(new Recipe(title, subtitle, description, ingredients, steps));
    clear();
  }

  function clear() {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setIngredient("");
    setStep("");
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
      <button
        onClick={() => {
          addIngredientField(ingredient);
          setIngredient("");
        }}
      >
        +
      </button>
      <br></br>
      <ul>
        {ingredients.map((value) => {
          return <li>{value}</li>;
        })}
      </ul>
      <br></br>
      <label>Steps </label>
      <input
        value={step}
        onChange={(e) => setStep(e.currentTarget.value)}
      ></input>
      <button
        onClick={() => {
          addStepField(step);
          setStep("");
        }}
      >
        +
      </button>
      <ol>
        {steps.map((value) => {
          return <li>{value}</li>;
        })}
      </ol>
      <hr></hr>
      <button onClick={saveAndReturn}>save & return</button>
      <button onClick={saveAndAddMore}>save & add more</button>
      <button onClick={clear}>clear</button>
    </>
  );
}
