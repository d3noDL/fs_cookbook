interface Props {
  ingredient: string;
}

export default function RecipeIngredient({ ingredient }: Props) {
  return (
    <>
      <li>{ingredient}</li>
    </>
  );
}
