import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CreateBinder.css";

function CreateBinder(userData) {
const [binderName, setBinderName] = useState("")
const [userID, setUserID] = useState('')

console.log(userData)

useEffect(() => {
    if (userData?.id > 0) {
        setUserID(String(userData.id));
    }
}, [userData])

function sendBinder() {
    if (binderName) {
    fetch(`http://localhost:3000/api/v1/users/${userID}/binders`, { 
        method: "POST", 
        headers: {
      "Content-Type": "application/json"
        },
        body: JSON.stringify({binderName: binderName}) 
    })
    .catch((error) => {
        console.error("Error:", error)
    })
}}

const handlesubmission = (event) => {
    event.preventDefault()
    sendBinder()
}


  return (
    <div className="createBinder-container">
      <div className="createBinder-form">
        <form onSubmit={handlesubmission}>
          <label className="newName">Binder Name:</label>
          <input 
            type="text" 
            name="binderName"
             placeholder="Enter Binder Name"
             value={binderName}
             onChange={(event) => setBinderName(event.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBinder;