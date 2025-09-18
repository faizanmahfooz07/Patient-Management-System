import React, { useState, useEffect } from "react";

function PatientForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate phone number format
      const phoneRegex = /^\+?[0-9]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert("Please enter a valid phone number");
        return;
      }

      await onSubmit(formData);
      // Clear form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="tel"
          className="form-control"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          className="form-control"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
}

export default PatientForm;
