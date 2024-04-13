import React from 'react';

const DeleteButton = ({ onClick }) => {
  const buttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = '#c82333';
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = '#dc3545';
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
