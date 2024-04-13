import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const SearchStudentRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
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
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchSearchOptions();
    }
  }, [navigate]);

  useEffect(() => {
    // Add Bootstrap CSS link to the document's head
    const link = document.createElement('link');
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    fetchSearchOptions();

    // Cleanup function to remove the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const fetchSearchOptions = () => {
    fetch('http://localhost:5000/students/search-options')
      .then(response => response.json())
      .then(data => {
        setSearchOptions(data);
      })
      .catch(error => console.error('Error fetching search options:', error));
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchValue(''); // Reset search value when search term changes
  };

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send search request to backend API
    fetch(`http://localhost:5000/students/search?searchTerm=${searchTerm}&searchValue=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => console.error('Error searching students:', error));
  };

  const handleDelete = (enrollment_number) => {
    console.log(enrollment_number);
    fetch(`http://localhost:5000/students/${enrollment_number}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Student with enrollment number ${enrollment_number} deleted successfully.`);
          // Refresh the list of students after deletion
          fetchSearchResults();
        } else {
          console.error('Failed to delete student:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting student:', error));
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
      .then((response) => {
        if (response.ok) {
          console.log(`Student with enrollment number ${selectedStudent.enrollment_number} updated successfully.`);
          // Refresh the list of students after update
          fetchSearchResults();
          handleUpdateModalClose();
        } else {
          console.error('Failed to update student:', response.statusText);
        }
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  const fetchSearchResults = () => {
    fetch(`http://localhost:5000/students/search?searchTerm=${searchTerm}&searchValue=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => console.error('Error searching students:', error));
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div className="container-fluid py-5" style={{ background: 'linear-gradient(to right, #4a148c, #ff6f00)', minHeight: '100vh' }}>
        <div className="container bg-white p-5 rounded shadow">
          <h2 className="mb-4 text-center">Search Student Record</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Search Term:</label>
              <select className="form-select" value={searchTerm} onChange={handleChange}>
                <option value="">Select...</option>
                {searchOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            {searchTerm && (
              <div className="mb-3">
                <label className="form-label">Enter Search Value:</label>
                <input type="text" className="form-control" value={searchValue} onChange={handleValueChange} />
              </div>
            )}
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          {searchResults.length > 0 && (
            <table className="table table-bordered table-striped mt-4">
              <thead className="thead-light">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(student => (
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
                      <button onClick={() => handleUpdate(student)} className="btn btn-primary">Update</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(student.enrollment_number)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
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
    </>
  );
};

export default SearchStudentRecord;
