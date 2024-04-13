// src/components/InsertForm.js

import React, { Component } from 'react';

class InsertForm extends Component {
  state = {
    enrollmentNumber: '',
    facultyNumber: '',
    name: '',
    address: '',
    hall: '',
    course: '',
    branch: '',
    semester: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { enrollmentNumber, facultyNumber, name, address, hall, course, branch, semester } = this.state;
    // Make API call to insert student data
    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        enrollmentNumber,
        facultyNumber,
        name,
        address,
        hall,
        course,
        branch,
        semester
      })
    })
    .then(response => {
      if (response.ok) {
        // Reset form
        this.setState({
          enrollmentNumber: '',
          facultyNumber: '',
          name: '',
          address: '',
          hall: '',
          course: '',
          branch: '',
          semester: ''
        });
        // Optionally, display success message or update student list
      } else {
        console.log('Failed to insert student data');
      }
    })
    .catch(error => console.error('Error inserting student data:', error));
  };

  render() {
    const { enrollmentNumber, facultyNumber, name, address, hall, course, branch, semester } = this.state;

    return (
      <div>
        <h2>Insert Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enrollment Number:
            <input type="text" name="enrollmentNumber" value={enrollmentNumber} onChange={this.handleChange} />
          </label>
          {/* Add other input fields similarly */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default InsertForm;
