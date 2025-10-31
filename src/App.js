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

  // Close modal when clicking outside
useEffect(() => {
  const handleOutsideClick = (e) => {
    // Ensure modalRef exists and modal is open
    if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };
  document.addEventListener("click", handleOutsideClick, true);
  return () => document.removeEventListener("click", handleOutsideClick, true);
}, [isModalOpen]);


  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Form submission with Cypress-friendly validation
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Check email validity
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Check phone validity (10 digits only)
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Check DOB validity (cannot be in future)
    const enteredDate = new Date(dob);
    const today = new Date();
    if (enteredDate > today) {
      alert("Invalid date of birth. Please select a valid date.");
      return;
    }

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
    <div id="root">
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
                  type="text"
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
