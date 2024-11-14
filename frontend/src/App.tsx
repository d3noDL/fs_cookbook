import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

class User {
  username: string = "";
  password: string = "";
}

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  function handleLogin(
    username: string | undefined,
    password: string | undefined
  ) {
    fetch("http://192.168.50.2:1234/users")
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
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            isLoggedIn={isLoggedIn}
            username={currentUser?.username}
          />
        }
      />
      <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
    </Routes>
  );
}
