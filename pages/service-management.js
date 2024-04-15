//pages/service-management.js
import React, { useState, useEffect } from 'react';
import ServiceListingAdmin from '../components/ServiceListingAdmin';
import CreateServiceForm from '../components/CreateServiceForm'; // Import the CreateServiceForm component
import { deleteService } from '../services/api'; // Import your API functions
import { createService } from '../services/api'; // Adjust the path as needed
import api from '../services/api';

const ServiceManagementPage = () => {
  const [services, setServices] = useState([]);

  // Function to fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Fetch existing services from the backend when the page loads
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to handle service deletion
  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId);
      // Refetch services after deletion
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Function to handle creation of a new service
  const handleCreateService = async (formData) => {
    try {
      // Perform API call to create a new service
      const newService = await createService(formData);
      // Refetch services after creation
      fetchServices();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      <h1>Service Management</h1>
      {/* Render the CreateServiceForm component */}
      <CreateServiceForm onCreate={handleCreateService} />
      {/* Pass fetchServices as a prop to ServiceListingAdmin */}
      <ServiceListingAdmin
        services={services}
        onDelete={handleDeleteService}
        fetchServices={fetchServices}
      />
    </div>
  );
};

export default ServiceManagementPage;
