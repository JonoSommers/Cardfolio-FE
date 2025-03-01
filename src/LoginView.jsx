import "./LoginView.css";
import { useState } from "react";
import SnorlaxFeet from "./SnorlaxFeet";

function LoginView() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  function createUser() {
    if (username.trim()) {
        fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data && data.data.attributes) {
            setMessage(data.data.attributes); 
          } else {
            setMessage("Error creating account.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage("Error creating account.");
        });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(); 
  };

  return (
    <main className="Snorlax">
      <header>
        <h1>Cardfolio</h1>
      </header>
      <div className="snorlax-belly">
        <form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>
          <label>
            Username
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <button className="submit_button" type="submit" disabled={!username.trim()}>
            Create Account
          </button>
        </form>
        {message && <p>{message}</p>} {/* Displays the backend message */}
        <SnorlaxFeet />
      </div>
    </main>
  );
}

export default LoginView;
