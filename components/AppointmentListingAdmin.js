import React, { useState, useEffect } from 'react';
import { deleteAdminApp, getAdminApp, getService } from '../services/api';
import EditAdminAppForm from '../components/EditAdminAppForm';
import styles from '../styles/ServiceListing.module.css';

const AppointmentListingAdmin = ({ appointments, fetchAppointments }) => {
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control the visibility of the edit form

  useEffect(() => {
    fetchDetails();
  }, [appointments]);

  const fetchDetails = async () => {
    const details = await Promise.all(appointments.map(async appointment => {
      const adminApp = await getAdminApp(appointment._id);
      const service = await getService(adminApp.adminApp.serviceType);
      return { ...adminApp, service };
    }));
    setAppointmentDetails(details);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdminApp(id);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingAppointmentId(id);
    setIsEditFormOpen(true); // Open the edit form
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false); // Close the edit form
    fetchAppointments(); // Fetch appointments after closing the form to reflect any changes
  };

  return (
    <div className={styles['service-listing-container']}>
      <h2>Existing Appointments</h2>
      <div className={styles['service-listing']}>
        {appointmentDetails.map(appointment => (
          <div key={appointment._id} className={styles['service-card']}>
            <div className={styles['appointment-info']}>
              <div className={styles['appointment-detail']}>
                <strong>Date:</strong> {appointment.adminApp.date}
              </div>
              <div className={styles['appointment-detail']}>
                <strong>Time:</strong> {appointment.adminApp.time}
              </div>
            </div>
            <div>
              <strong>Service:</strong> {appointment.service.title}
            </div>
            <div>
              <strong>Customer:</strong> {appointment.customer.user.email}
            </div>
            <div className={styles['button-container']}>
              <button onClick={() => handleEdit(appointment.adminApp._id)}>Edit Appointment</button>
              <button onClick={() => handleDelete(appointment.adminApp._id)}>Cancel Appointment</button>
            </div>
            {editingAppointmentId === appointment.adminApp._id && isEditFormOpen && (
              <EditAdminAppForm
                adminApp={appointment.adminApp}
                onUpdate={handleCloseEditForm}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentListingAdmin;
