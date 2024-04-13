// src/components/SearchForm.js

import React, { Component } from 'react';

class SearchForm extends Component {
  state = {
    searchTerm: ''
  };

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    // Make API call to search for students
    fetch(`http://localhost:5000/students?searchTerm=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        // Handle search results, e.g., update state with search results
        console.log('Search results:', data);
      })
      .catch(error => console.error('Error searching for students:', error));
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <h2>Search Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search Term:
            <input type="text" value={searchTerm} onChange={this.handleChange} />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
