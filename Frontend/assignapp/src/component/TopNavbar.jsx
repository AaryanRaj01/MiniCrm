import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Adjust the import path as needed

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      console.log('User signed in with Google');
      navigate('/CampaignList'); // Redirect to CampaignList page after successful sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      navigate('/'); // Redirect to SignIn page after successful sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-navBarcolor p-4 flex justify-between items-center">
      <div className="flex flex-1 justify-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink exact to="/CampaignList" activeClassName="text-yellow-300 font-semibold" className={`text-white font-medium px-3 py-2 rounded transition duration-300 ${location.pathname === '/CampaignList' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
              Campaign List
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-campaign" activeClassName="text-yellow-300 font-semibold" className={`text-white font-medium px-3 py-2 rounded transition duration-300 ${location.pathname === '/create-campaign' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
              Create Campaign
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="bg-CustomButtonCOlor flex items-center justify-center text-black font-bold py-2 px-4 rounded focus:outline-none transition duration-300"
                onClick={toggleDropdown}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Sign out</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="bg-CustomButtonCOlor hover:bg-overallBackground text-black font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
