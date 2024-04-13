import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe123');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation (e.g., update data in backend)
    // For simplicity, we'll just toggle the editing state
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        {isEditing ? (
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        ) : (
          <p className="form-control-plaintext">{name}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        {isEditing ? (
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        ) : (
          <p className="form-control-plaintext">{username}</p>
        )}
      </div>
      <div className="mb-3">
        {isEditing ? (
          <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        ) : (
          <button className="btn btn-secondary me-2" onClick={handleEdit}>Edit</button>
        )}
        <button className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
