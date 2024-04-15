// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prj-666-server.vercel.app/' /* 'http://localhost:8080'*/,
});

// Function to create a new service
export const createService = async (newServiceData) => {
  try {
    const response = await api.post('/services', newServiceData);
    return response.data; // Return the created service object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to delete a service by ID
export const deleteService = async (serviceId) => {
  try {
    await api.delete(`/services/${serviceId}`);
  } catch (error) {
    throw error;
  }
};

// Function to update a service by ID
export const updateService = async (serviceId, updatedServiceData) => {
  try {
    const response = await api.put(`/services/${serviceId}`, updatedServiceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch details of a service by ID
export const getService = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    return response.data; // Return the service object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to create a new admin app
export const createAdminApp = async (newAdminAppData) => {
  try {
    const response = await api.post('/adminapp', newAdminAppData);
    return response.data; // Return the created admin app object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to delete an admin app by ID
export const deleteAdminApp = async (adminAppId) => {
  try {
    await api.delete(`/adminapp/${adminAppId}`);
  } catch (error) {
    throw error;
  }
};

// Function to update an admin app by ID
export const updateAdminApp = async (adminAppId, updatedAdminAppData) => {
  try {
    const response = await api.put(`/adminapp/${adminAppId}`, updatedAdminAppData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch details of an admin app by ID
export const getAdminApp = async (adminAppId) => {
  try {
    const response = await api.get(`/adminapp/${adminAppId}`);
    return response.data; // Return the admin app object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

// Function to fetch all admin apps
export const getAllAdminApps = async () => {
  try {
    const response = await api.get('/adminapp');
    return response.data; // Return an array of admin apps
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

export default api;
