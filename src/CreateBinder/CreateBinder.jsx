import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CreateBinder.css";

function CreateBinder({ userData }) {
  const [binderName, setBinderName] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  function sendBinder() {
    if (!binderName) {
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
          console.log("Binder created", data);
          navigate(`/${userData.attributes.username}`);
        } else {
          console.error("Error creating binder:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      </div>
    </div>
  );
}

export default CreateBinder;
