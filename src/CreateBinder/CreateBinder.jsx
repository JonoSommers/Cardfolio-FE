import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CreateBinder.css";

function CreateBinder({ userData, setUserData }) {
  const [binderName, setBinderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function sendBinder() {
    if (!binderName.trim()) {
      setErrorMessage("Please enter a binder name.");
      return;
    }

    fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        binder_name: binderName
      }),
    })
      .then((response) =>
        response.json().then((data) => ({ status: response.ok, data }))
      )
      .then(({ status, data }) => {
        if (status) {
          setErrorMessage("");
          fetchUser();
          navigate(`/${userData.attributes.username}`);
        } else {
          setErrorMessage(data.error || "Error creating binder.");
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred. Please try again later.");
      });
  }

  function fetchUser() {
    fetch(`http://localhost:3000/api/v1/users/${userData.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    sendBinder();
  };

  return (
    <div className="createBinder-container">
      <div className="createBinder-form">
        <form onSubmit={handleSubmission}>
          <label className="newName">Binder Name</label>
          <input
            type="text"
            name="createBinderName"
            placeholder="Enter Binder Name"
            value={binderName}
            onChange={(event) => setBinderName(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CreateBinder;
