import "./LoginView.css"
import { useState } from 'react'

function LoginView() {

    const [formType, setFormType] = useState("login"); 
    const [username, setUsername] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formType === "login") {
            // console.log("Logging in:", { username });
        } else {
            // console.log("Creating account:", { username });    
        }
        };

    return (
    <main className="Snorlax">
        <header>Cardfolio</header>
        <div>
            <button onClick={() => setFormType("login")}>Login</button>
            <button onClick={() => setFormType("signup")}>Create Account</button>

            <form onSubmit={handleSubmit}>
                <h2>{formType === "login" ? "Please Sign In" : "Create an Account"}</h2>
                <label>
                Username
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />
                </label>
                <button type="submit">
                {formType === "login" ? "Login" : "Sign Up"}
                </button>
            </form>
        </div>
    </main>
    );
}

export default LoginView;
