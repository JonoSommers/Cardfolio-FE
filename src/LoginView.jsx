import "./LoginView.css"
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SnorlaxFeet from "./SnorlaxFeet";

function LoginView() {

    const [formType, setFormType] = useState(null); 
    const [username, setUsername] = useState("")
    const [user, setUser] = useState([])

    function createUser() {
        if (formType === "Sign Up") {
            fetch('/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log('error: ', error))
        }
    }

    useEffect(() => {
        createUser();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formType === "login") {
            // console.log("Logging in:", { username });
        } else {
            createUser()   
        }
        };

    return (
    <main className="Snorlax">
        <header>
            <h1>Cardfolio</h1>
        </header>
        <div class="snorlax-belly">
            {!formType && (
                <>
                    <button className="login_button" onClick={() => setFormType("login")}>Login</button>
                    <button className="create_button" onClick={() => setFormType("signup")}>Create Account</button>
                </>
            )}
            {formType && (
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
                    <Link to="/home">
                        <button className="submit_button" type="submit">
                        {formType === "login" ? "Login" : "Sign Up"}
                        </button>
                    </Link>
                </form>
                
            )}
            <SnorlaxFeet />
        </div>
    </main>
    
    );
}

export default LoginView;