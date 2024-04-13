import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const InsertStudentsRecord = () => {
  const [formData, setFormData] = useState({
    enrollmentNumber: '',
    facultyNumber: '',
    name: '',
    address: '',
    hall: '',
    course: '',
    branch: '',
    semester: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in session storage
    const tokenExists = sessionStorage.getItem('token');
    // Redirect to home page if token does not exist
    if (!tokenExists) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate name field to allow only alphabetic characters
    if (name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrorMessage('Name must contain only alphabetic characters');
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
        setErrorMessage('');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['enrollmentNumber', 'facultyNumber', 'name', 'branch', 'course', 'semester'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }
    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          setSuccessMessage('Student record added successfully');
          setErrorMessage('');
        } else if (response.status === 409) { // Check for conflict status (e.g., faculty number or enrollment number already exists)
          response.json().then(data => {
            setErrorMessage(data.message); // Display the error message received from the server
          });
        } else {
          setErrorMessage('Failed to add student record');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        console.error('Error adding student record:', error);
        setErrorMessage('Failed to add student record');
        setSuccessMessage('');
      });
  };

  const handleAddAnother = () => {
    setFormData({
      enrollmentNumber: '',
      facultyNumber: '',
      name: '',
      address: '',
      hall: '',
      course: '',
      branch: '',
      semester: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the landing page
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
    <div style={{ background: 'linear-gradient(to right, #4a148c, #ff6f00)', minHeight: '100vh', padding: '20px' }}>
      <div className="container">
        <h2 className="text-white">Insert Students Record</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Enrollment Number<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="text" className="form-control" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} required />
                    {errorMessage.includes("enrollment") && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Faculty Number<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="text" className="form-control" name="facultyNumber" value={formData.facultyNumber} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Name<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    {errorMessage.includes("name") && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Address:</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Hall:</label>
                    <input type="text" className="form-control" name="hall" value={formData.hall} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Course<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="text" className="form-control" name="course" value={formData.course} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Branch<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="text" className="form-control" name="branch" value={formData.branch} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>
                      Semester<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="number" className="form-control" name="semester" value={formData.semester} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          {(successMessage || errorMessage) && (
            <div className="card-footer">
              {successMessage && (
                <>
                  <p>{successMessage}</p>
                  <button className="btn btn-success me-2" onClick={handleAddAnother}>Add Another Record</button>
                  <button className="btn btn-info" onClick={handleGoHome}>Go to Home Page</button>
                </>
              )}
              {errorMessage && (
                <>
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                  <button className="btn btn-danger" onClick={handleSubmit}>Try Again</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default InsertStudentsRecord;
