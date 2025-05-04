import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../instant/axios'; // Path sahi hona chahiye

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // 👈 Message store karne ke liye
  const [messageType, setMessageType] = useState(''); // success ya error ke liye

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset old message

    try {
      const response = await axiosInstance.post('/user/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        const { token } = response.data;

        if (token) {
          localStorage.setItem('token', token);
          setMessage('Login successful!');
          setMessageType('success');
          setTimeout(() => navigate('/'), 1500); // 1.5 sec baad redirect
        } else {
          setMessage('Login failed, no token received.');
          setMessageType('error');
        }
      } else {
        setMessage('Invalid credentials');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'Something went wrong!');
      setMessageType('error');
    }
  };

  return (
    <section className="font-['Roboto'] w-full h-screen flex flex-col items-center justify-center bg-white">
      <a href="#">
        <img
          src="../src/assets/logo.png"
          alt="Logo"
          className="mx-auto w-30 mt-10"
        />
      </a>

      <div className="flex flex-col md:flex-row justify-between mt-10 w-[0vw] md:w-[50vw] md:pl-[10%]">
        {/* Left Section */}
        <div
          className="w-full md:w-[58vw] h-[50vh] md:h-[50vh] bg-cover bg-center relative"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="absolute inset-[3%] border-2 border-white"></div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[88vw] h-[30vh] md:h-[50vh] bg-white shadow-md flex items-center justify-center text-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-[#335288] mb-6">Welcome Back 👋</h2>

            {/* Message box */}
            {message && (
              <div className={`mb-4 text-sm font-semibold p-2 rounded 
              ${messageType === 'success' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#335288]"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#335288]"
                />
              </div>

              {/* Forgot password link */}
              <Link to="/forgot-password" className="text-[#335288] font-semibold hover:underline">
                Forgot password?
              </Link>

              <button
                type="submit"
                className="w-full bg-[#335288] text-white font-semibold py-2 hover:bg-transparent hover:text-[#335288] border-1 border-[#335288] transition duration-300"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#335288] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-black">
          Do You Want To Go <span className="font-bold">Back</span>
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
