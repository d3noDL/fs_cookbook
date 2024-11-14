interface Props {
  step: string;
}

export default function RecipeStep({ step }: Props) {
  return <li typeof="number">{step}</li>;
}
