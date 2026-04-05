import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { userSignIn, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the sign-in process
    try {
      await userSignIn(formData.email, formData.password);
      navigate('/'); // Redirect to home page upon successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false); // Set loading to false after the sign-in process
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Set loading to true when starting the Google sign-in process
    try {
      const user = await signInWithGoogle();
      console.log(user);
       
      navigate('/'); // Redirect to home page upon successful Google login
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Failed to login with Google.');
    } finally {
      setLoading(false); // Set loading to false after the Google sign-in process
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true); // Set loading to true when starting the Facebook sign-in process
    try {
      const user = await signInWithFacebook();
      console.log(user);
      
      
      navigate('/'); // Redirect to home page upon successful Facebook login
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
      alert('Failed to login with Facebook.');
    } finally {
      setLoading(false); // Set loading to false after the Facebook sign-in process
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Login</h2>
        
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-700'} text-white py-2 rounded-md hover:bg-green-800 transition duration-300`}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>

          {/* Google and Facebook Sign-In Buttons */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading} // Disable button while loading
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-red-500'} text-white py-2 rounded-md hover:bg-red-600 transition duration-300`}
            >
              Sign in with Google
            </button>
            <button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={loading} // Disable button while loading
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-2`}
            >
              Sign in with Facebook
            </button>
          </div>

          {/* Sign-up Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-green-700 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
