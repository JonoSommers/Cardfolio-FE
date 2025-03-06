import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CreateBinder.css";

function CreateBinder({ userData, setUserData }) {
  const [binderName, setBinderName] = useState("");
  const [errorMessage, setErrotMessage] = useState("")
  const navigate = useNavigate();

  function sendBinder() {
    if (!binderName.trim()) {
      console.error("Please enter a binder name");
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
          setErrotMessage("")
          fetchUser();
          navigate(`/${userData.attributes.username}`);
        } else {
          setErrotMessage(data.error || "Error Creating Binder")
        }
      })
      .catch((error) => {
        setErrotMessage("An error occured. Please Try Again Later")
      });
  }

  function fetchUser() {
		fetch(`http://localhost:3000/api/v1/users/${userData.id}`)
			.then((response) => response.json())
			.then((data) => {
				setUserData(data.data)
			})
			.catch((error) => console.log(error))
  }


  const handleSubmission = (event) => {
    event.preventDefault();
    sendBinder();
  };

  return (
    <div className="createBinder-container">
      <div className="createBinder-form">
        <form onSubmit={handleSubmission}>
          <label className="newName">Binder Name:</label>
          <input
            type="text"
            name="binderName"
            placeholder="Enter Binder Name"
            value={binderName}
            onChange={(event) => setBinderName(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <p classname="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CreateBinder;
