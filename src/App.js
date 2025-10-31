
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef();

  // Handle clicking outside modal to close it
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, [isModalOpen]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const { username, email, phone, dob } = formData;

  // Empty field validation
  if (!username || !email || !phone || !dob) {
    alert("All fields are required.");
    return;
  }

  // Email validation
  if (!email.includes("@")) {
    alert("Invalid email. Please check your email address.");
    return;
  }

  // Phone validation
  if (!/^\d{10}$/.test(phone)) {
    alert("Invalid phone number. Please enter a 10-digit phone number.");
    return;
  }

  // DOB validation
  const enteredDate = new Date(dob);
  const today = new Date();
  if (enteredDate > today) {
    alert("Invalid date of birth. Please select a valid date.");
    return;
  }

  // Success
  alert("Form submitted successfully!");
  setIsModalOpen(false);
  setFormData({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
};


  return (
    <div className="App">
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
























/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/