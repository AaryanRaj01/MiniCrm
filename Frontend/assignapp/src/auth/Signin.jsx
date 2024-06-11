import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Adjust the import path as needed

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      console.log('User signed in with Google');
      navigate('/CampaignList'); // Redirect to CampaignList page after successful sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:shadow-2xl">
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/free-photo/customer-relationship-management-concept_23-2150038409.jpg?size=626&ext=jpg&ga=GA1.1.882129131.1713783869&semt=sph" // Replace with your own CRM logo
            alt="CRM Logo"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-600 mt-2">Sign in to access your CRM account</p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            className="h-6 w-6 mr-3"
          />
          Sign in with Google
        </button>
      </div>
      <p className="text-white mt-8">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  );
};

export default SignIn;
