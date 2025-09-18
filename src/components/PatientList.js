import React from "react";

function PatientList({ patients, setEditingPatient, deletePatient }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.first_name} {p.last_name}</td>
            <td>{p.email}</td>
            <td>{p.phone}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2"
                onClick={() => setEditingPatient(p)}>Edit</button>
              <button className="btn btn-sm btn-danger"
                onClick={() => deletePatient(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientList;
