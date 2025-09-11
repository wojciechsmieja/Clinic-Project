import { useState } from "react";
import axios from "../components/axiosInstance";
import '../components/navbar.css';
import './login.css';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Wysyłane dane: ",{username, password});
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      const { token, role, id_prac } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id",id_prac);
      onLogin(role); // np. 'LEKARZ'

    } catch (err) {
      setError("Błędne dane logowania.");
    }
  };

  return (
    <div>
      <h1>Przychodnia</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <p>Zaloguj się</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Zaloguj</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
