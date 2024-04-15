import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prj-666-server.vercel.app/' /* 'http://localhost:8080'*/,
});

// Function to create a new feedback entry
export const createFeedback = async (newFeedbackData) => {
  try {
    const response = await api.post('/feedback', newFeedbackData);
    return response.data; // Return the created feedback entry object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to delete a feedback entry by ID
export const deleteFeedback = async (feedbackId) => {
  try {
    await api.delete(`/feedback/${feedbackId}`);
  } catch (error) {
    throw error;
  }
};

// Function to update a feedback entry by ID

export default api;
