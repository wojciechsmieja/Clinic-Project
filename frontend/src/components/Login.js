import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        // Przykład: zapisz token lub dane użytkownika do localStorage
        localStorage.setItem('user', JSON.stringify(data));
        // Przekieruj do odpowiedniego widoku
        navigate('/dashboard');
    } else {
        alert("Błędne dane logowania");
    }
    };

  return (
    <form onSubmit={handleLogin}>
      <label>Username: <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" /></label>
      <br /><br />
      <label>Password: <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></label>
      <br /><br />
      <button type="submit">Zaloguj się</button>
    </form>
  );
}

export default Login;