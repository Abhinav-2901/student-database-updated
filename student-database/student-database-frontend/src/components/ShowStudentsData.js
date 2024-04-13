import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const ShowStudentsData = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedStudentData, setUpdatedStudentData] = useState({
    enrollment_number: '',
    faculty_number: '',
    name: '',
    address: '',
    hall: '',
    course: '',
    branch: '',
    semester: ''
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the modal visibility

  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    // Check if token exists in session storage
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.log("Token empty");
      navigate('/'); // Redirect to '/' if token is empty
    } else {
      console.log("Token not empty");
      fetchStudents();
      loadBootstrapCSS();
    }
  }, [navigate]);


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

  const loadBootstrapCSS = () => {
    const link = document.createElement('link');
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setUpdatedStudentData(student);
    setShowUpdateModal(true); // Show the modal when "Update" is clicked
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false); // Close the modal
    setSelectedStudent(null);
    setUpdatedStudentData({
      enrollment_number: '',
      faculty_number: '',
      name: '',
      address: '',
      hall: '',
      course: '',
      branch: '',
      semester: ''
    });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudentData({
      ...updatedStudentData,
      [name]: value
    });
  };

  const handleUpdateSubmit = () => {
    // Send update request to backend API
    fetch(`http://localhost:5000/students/${selectedStudent.enrollment_number}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudentData)
    })
      .then(response => {
        if (response.ok) {
          console.log(`Student with enrollment number ${selectedStudent.enrollment_number} updated successfully.`);
          // Refresh the list of students after update
          fetchStudents();
          handleUpdateModalClose();
        } else {
          console.error('Failed to update student:', response.statusText);
        }
      })
      .catch(error => console.error('Error updating student:', error));
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
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
                  <th>Action</th> {/* Add a new column for Update button */}
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
                      <DeleteButton onClick={() => handleDelete(student.enrollment_number)} className="btn btn-danger" />
                    </td>
                    <td> {/* Column for Update button */}
                      <button onClick={() => handleUpdate(student)} className="btn btn-primary">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Modal for update */}
            {showUpdateModal && (
              <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update Student Record</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleUpdateModalClose}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="enrollment_number">Enrollment Number</label>
                          <input type="text" className="form-control" id="enrollment_number" name="enrollment_number" value={updatedStudentData.enrollment_number} disabled />
                        </div>
                        <div className="form-group">
                          <label htmlFor="faculty_number">Faculty Number</label>
                          <input type="text" className="form-control" id="faculty_number" name="faculty_number" value={updatedStudentData.faculty_number} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input type="text" className="form-control" id="name" name="name" value={updatedStudentData.name} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input type="text" className="form-control" id="address" name="address" value={updatedStudentData.address} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="hall">Hall</label>
                          <input type="text" className="form-control" id="hall" name="hall" value={updatedStudentData.hall} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="course">Course</label>
                          <input type="text" className="form-control" id="course" name="course" value={updatedStudentData.course} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="branch">Branch</label>
                          <input type="text" className="form-control" id="branch" name="branch" value={updatedStudentData.branch} onChange={handleUpdateInputChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="semester">Semester</label>
                          <input type="text" className="form-control" id="semester" name="semester" value={updatedStudentData.semester} onChange={handleUpdateInputChange} />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>Update</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleUpdateModalClose}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowStudentsData;
