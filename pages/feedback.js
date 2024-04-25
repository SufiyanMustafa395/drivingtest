// FeedbackPage.js
import React from 'react';
import { useRouter } from 'next/router';
import CreateFeedbackForm from '../components/CreateFeedBackForm';
import { createFeedback } from '../feedback/api';

const FeedbackPage = () => {
  const router = useRouter();

  // Function to handle creation of a new feedback entry
  const handleCreateFeedback = async (formData) => {
    try {
      // Perform API call to create a new feedback entry
      const newFeedback = await createFeedback(formData);
      // Redirect to the home page after successful submission
      router.push('/');
    } catch (error) {
      console.error('Error posting feedback:', error);
    }
  };

  return (
    <div>
      {/* Render the CreateFeedbackForm component */}
      <CreateFeedbackForm onCreate={handleCreateFeedback} />
    </div>
  );
};

export default FeedbackPage;
