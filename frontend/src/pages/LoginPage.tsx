import { useState } from "react";

interface Props {
  handleLogin: (
    username: string | undefined,
    password: string | undefined
  ) => void;
}

export default function LoginPage({ handleLogin }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      <button onClick={() => handleLogin(username, password)}>login</button>
    </>
  );
}
