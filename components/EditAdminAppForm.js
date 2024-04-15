import React, { useState } from 'react';
import { updateAdminApp } from '../services/api'; // Import the updateAdminApp function

const EditAdminAppForm = ({ adminApp, onUpdate }) => {

  console.log('Admin App object:', adminApp);

  const [formData, setFormData] = useState({
    id: adminApp._id, // Ensure the admin app ID is properly retrieved
    date: adminApp.date,
    time: adminApp.time,
  });
  
  // Log the value of the admin app ID
  console.log('Admin App ID:', adminApp._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update the admin app
      await updateAdminApp(formData.id, formData); // Pass the admin app ID and updated data
      onUpdate(); // Notify parent component that update is complete
    } catch (error) {
      console.error('Error updating admin app:', error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Admin App</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="text" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
};

export default EditAdminAppForm;
