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
        "Hello " + username + "!"
      ) : (
        <button onClick={() => navigate("/login")}>login</button>
      )}
    </>
  );
}
