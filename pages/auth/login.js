// pages/auth/login.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';
import UserDisplay from '../../components/UserDisplay';
//import api from '../services/api';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // New state for user email

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Make a POST request to your login endpoint
      const response = await api.post('/auth/login', data);

      // Assuming the response includes a token and user details
      const { token, user } = response.data;

      // Store the token in a secure manner (localStorage, sessionStorage)
      localStorage.setItem('authToken', token);

      // Update state with user email upon successful login
      setUserEmail(user.email);

      // Redirect to home page after successful login
      router.push('/services'); // Redirect to the desired route
    } catch (error) {
      // Handle login error
      setError('apiError', {
        type: 'manual',
        message: 'Login failed. Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields go here, e.g., email, password, etc. */}
        <input {...register('email', { required: 'Email is required' })} />
        <input type="password" {...register('password', { required: 'Password is required' })} />

        <button type="submit" disabled={isLoading}>Login</button>

        {/* Display login error, if any */}
        {errors.apiError && <p>{errors.apiError.message}</p>}

        {/* Display user email if available */}
        <UserDisplay userEmail={userEmail} />
      </form>
    </div>
  );
};

export default Login;
