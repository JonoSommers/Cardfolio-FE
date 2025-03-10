import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login({setUserData}) {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://cardfolio-be.onrender.com/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        setMessage("Error loading users.")
      })
  }, [message])

  function fetchUser() {
    const foundUser = users.find((user) => user.attributes.username === username)
    if (!foundUser) {
      setMessage(`User ${username} not found`)
    }
    else {
      fetch(`https://cardfolio-be.onrender.com/api/v1/users/${foundUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.data)
          navigate(`/${foundUser.attributes.username}`)
        })
        .catch((error) => console.log(error))
    }
  }
  
  function createUser() {
    if (username.trim()) {
        fetch("https://cardfolio-be.onrender.com/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data && data.data.attributes) {
            setUsers(data.data)
            setMessage(`The account with the username ${data.data.attributes.username} has been created`); 
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
    event.preventDefault()
    if (event.nativeEvent.submitter.name === "login") {
      fetchUser()
    } else if (event.nativeEvent.submitter.name === "create") {
      createUser()
    }
  }

  return (
    <main className="Snorlax">
      <header>
        <h1 className="cardfolio">Cardfolio</h1>
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
          <button className="submit_button" type="submit" name="create" disabled={!username.trim()}>
            Create Account
          </button>
            <button className="login_button" type="submit" name="login" disabled={!username.trim()}>
                Login
            </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}


export default Login;
