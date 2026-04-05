import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const { createUser, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await createUser(formData.email, formData.password);
      navigate('/shop');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/shop');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate('/shop');
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-300"
          >
            Sign Up
          </button>

          {/* Google and Facebook Sign-In Buttons */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Sign up with Google
            </button>
            <button
              type="button"
              onClick={handleFacebookSignIn}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-2"
            >
              Sign up with Facebook
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-green-700 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
