// src/components/StudentList.js

import React, { Component } from 'react';

class StudentList extends Component {
  state = {
    students: []
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => this.setState({ students: data }))
      .catch(error => console.log('Error fetching students:', error));
  };

  render() {
    const { students } = this.state;

    return (
      <div>
        <h2>Student List</h2>
        <ul>
          {students.map(student => (
            <li key={student.enrollmentNumber}>
              {student.name} - {student.semester}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StudentList;
