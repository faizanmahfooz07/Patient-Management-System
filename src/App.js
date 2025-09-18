import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/patients/");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing patient
        await axios.put(`http://localhost:8000/patients/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add new patient
        await axios.post("http://localhost:8000/patients/", formData);
      }
      fetchPatients();
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
      });
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = async (id) => {
    const patientToEdit = patients.find((p) => p.id === id);
    if (patientToEdit) {
      setFormData({
        first_name: patientToEdit.first_name,
        last_name: patientToEdit.last_name,
        email: patientToEdit.email,
        phone: patientToEdit.phone,
        dob: patientToEdit.dob || "",
      });
      setEditingId(id);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="container cool-container">
      <h1 className="page-title">Patient Manager</h1>
      <form onSubmit={handleSubmit} className="cool-form">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control cool-input"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control cool-input"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control cool-input"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control cool-input"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control cool-input"
            value={formData.dob}
            onChange={(e) =>
              setFormData({ ...formData, dob: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary cool-button">
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary cool-button ms-2"
            onClick={() => {
              setEditingId(null);
              setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                dob: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="table-responsive cool-table">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>
                  {patient.first_name} {patient.last_name}
                </td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm cool-button me-2"
                    onClick={() => handleEdit(patient.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm cool-button"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
