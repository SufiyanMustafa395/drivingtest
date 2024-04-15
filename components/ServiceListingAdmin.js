import React, { useState } from 'react';
import EditServiceForm from './EditServiceForm';
import { deleteService } from '../services/api';
import styles from '../styles/ServiceListing.module.css';

const ServiceListingAdmin = ({ services, fetchServices }) => {
  const [editingServiceId, setEditingServiceId] = useState(null);

  const handleEditClick = (serviceId) => {
    setEditingServiceId(serviceId);
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className={styles['service-listing-container']}>
      <h2>Existing Services</h2>
      <div className={styles['service-listing']}>
        {services.map(service => (
          <div key={service._id} className={styles['service-card']}>
            <div>
              <strong>Title:</strong> {service.title}
            </div>
            <div>
              <strong>Price:</strong> {service.price}
            </div>
            <div>
              <strong>Description:</strong> {service.description}
            </div>
            <div className={styles['button-container']}>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
              {!editingServiceId && (
                <button onClick={() => handleEditClick(service._id)}>Edit</button>
              )}
            </div>
            {editingServiceId === service._id && (
              <EditServiceForm
                service={service}
                onUpdate={() => {
                  handleCancelEdit();
                  fetchServices();
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListingAdmin;
