import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import UpdateModal from './UpdateModal';
import Navbar from './Navbar';

const ShowStudentsData = () => {
  const [students, setStudents] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updateSuccessModalOpen, setUpdateSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    loadBootstrapCSS();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the received data
        setStudents(data);
      })
      .catch(error => console.error('Error fetching students:', error));
  };

  const handleDelete = (enrollment_number) => {
    console.log(enrollment_number)
    fetch(`http://localhost:5000/students/${enrollment_number}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Student with enrollment number ${enrollment_number} deleted successfully.`);
          // Refresh the list of students after deletion
          fetchStudents();
        } else {
          console.error('Failed to delete student:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setUpdateModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateModalOpen(false);
    setUpdateSuccessModalOpen(true);
    fetchStudents(); // Refresh the list of students after successful update
  };

  const handleCloseUpdateSuccessModal = () => {
    setUpdateSuccessModalOpen(false);
  };

  const loadBootstrapCSS = () => {
    const link = document.createElement('link');
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  return (
    <>
      <Navbar />
      <div style={{ background: 'linear-gradient(to right, #4a148c, #ff6f00)', minHeight: '100vh' }}>
        <div className="container py-5">
          <div className="container bg-white p-5 rounded shadow">
            <h2>Show Students Data</h2>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Enrollment Number</th>
                  <th>Faculty Number</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Hall</th>
                  <th>Course</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.enrollment_number}>
                    <td>{student.enrollment_number}</td>
                    <td>{student.faculty_number}</td>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                    <td>{student.hall}</td>
                    <td>{student.course}</td>
                    <td>{student.branch}</td>
                    <td>{student.semester}</td>
                    <td>
                      <button onClick={() => handleUpdate(student)} className="btn btn-info me-2">Update</button>
                      <DeleteButton onClick={() => handleDelete(student.enrollment_number)} className="btn btn-danger" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {updateModalOpen && <UpdateModal student={selectedStudent} onSuccess={handleUpdateSuccess} />}
      {updateSuccessModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Success</h5>
                <button type="button" className="close" onClick={handleCloseUpdateSuccessModal}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Student record updated successfully.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCloseUpdateSuccessModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowStudentsData;
