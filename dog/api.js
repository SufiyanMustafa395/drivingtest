import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prj-666-server.vercel.app/' /* 'http://localhost:8080'*/,
});

// Function to create a new dog profile
export const createDogProfile = async (newDogProfileData) => {
  try {
    const response = await api.post('/dogprofile', newDogProfileData);
    return response.data; // Return the created dog profile object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to delete a dog profile by ID
export const deleteDogProfile = async (dogProfileId) => {
  try {
    await api.delete(`/dogprofile/${dogProfileId}`);
  } catch (error) {
    throw error;
  }
};

// Function to update a dog profile by ID
export const updateDogProfile = async (dogProfileId, updatedDogProfileData) => {
  try {
    const response = await api.put(`/dogprofile/${dogProfileId}`, updatedDogProfileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
