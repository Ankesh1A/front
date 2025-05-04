import React, { useEffect, useState } from 'react';
import axiosInstance from '../instant/axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  

    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile/getUser',{withCredentials:true});
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, []);


  const handleLogout = async () => {
    try {
       
        localStorage.removeItem('token');  
        window.location.href = '/';   
    } catch (error) {
        console.error('Logout Error:', error);
    }
};

 
/////   for  backend logout
// const handleLogout = async () => {
//     try {
//         await axiosInstance.post('/profile/logout', {}, { withCredentials: true });
//         localStorage.removeItem('token');  
//         window.location.href = '/';   
//     } catch (error) {
//         console.error('Logout Error:', error);
//     }
// };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <Link to="/" className="text-pink-600 font-semibold hover:underline ml-80">
                Back
              </Link>
              

        {user ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
            <p className="mb-4">Name: {user.fullname}</p>
            <p className="mb-4">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;



