import { useNavigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean | undefined;
  username: string | undefined;
}

export default function LandingPage({ isLoggedIn, username }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {isLoggedIn ? (
        <>
          <label>{"Hello " + username + "!"}</label>
          <hr></hr>
          <button onClick={() => navigate("/addrecipe")}>add recipe</button>
          <button onClick={() => navigate("/addrecipe")}>edit recipe</button>
          <button onClick={() => navigate("/addrecipe")}>remove recipe</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>login</button>
      )}
    </>
  );
}
