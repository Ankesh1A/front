import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaUser } from 'react-icons/fa';


const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowHeader(currentScroll < scrollTop || currentScroll < 10);
      setScrollTop(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTop]);

  const isAtTop = scrollTop < 10;

  return (
    <header
      className={`z-50 fixed w-full py-2 transition-all duration-300 
      ${showHeader ? 'top-0' : '-top-[130px]'}
      ${isAtTop ? 'bg-transparent text-white' : 'bg-[#ebebeb] text-black'}`}
    >
      {/* Main Nav */}
      <div className='flex items-center justify-between flex-wrap md:flex-nowrap px-6 md:px-12 py-4 md:py-2 gap-4'>
        {/* Logo */}
        <img className='w-20' src="../src/assets/logo.png" alt="Logo" />

        {/* Desktop Nav */}
        <nav className='hidden md:flex bg-white text-lg py-3 w-auto px-5 text-black rounded-4xl justify-center gap-[3vw] items-center'>
          <Link to="/" className='hover:underline underline-offset-[4px] transition-all duration-300'>Launch</Link>
          <Link to="/storyline" className='hover:underline underline-offset-[4px] transition-all duration-300'>Insight</Link>
          <Link to="/plans" className='hover:underline underline-offset-[4px] transition-all duration-300'>Plans</Link>
          <Link to="/highlights" className='hover:underline underline-offset-[4px] transition-all duration-300'>Donate</Link>
        </nav>

        {/* Login Button */}
        <div className='hidden md:block'>



          <div className="flex gap-5 py-2.5 px-8 rounded-full">
            {isLoggedIn ? (
              <a href="/profile"><FaUser className="hover:text-[#335288]" /></a>
            ) : (
              <a href="/login"
                className={`relative overflow-hidden px-6 py-2 rounded-full transition duration-300
              ${isAtTop ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black' : 'bg-white text-black border border-white hover:bg-transparent hover:text-white'}`}
              >
                <span className='relative z-10 text-lg'>Login</span>
              </a>
              
            )}
          </div>




        </div>

        {/* Hamburger Menu */}
        <div className='md:hidden flex items-center'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-white text-center text-black flex flex-col gap-4 py-4 px-6 shadow-md md:hidden'>
          <Link to="/" onClick={() => setMenuOpen(false)} className='hover:underline underline-offset-[4px] transition-all duration-300'>Launch</Link>
          <Link to="/storyline" onClick={() => setMenuOpen(false)} className='hover:underline underline-offset-[4px] transition-all duration-300'>Insight</Link>
          <Link to="/plans" onClick={() => setMenuOpen(false)} className='hover:underline underline-offset-[4px] transition-all duration-300'>Plans</Link>
          <Link to="/highlights" onClick={() => setMenuOpen(false)} className='hover:underline underline-offset-[4px] transition-all duration-300'>Connect</Link>




          {/* ligin and  profile */}

          {isLoggedIn ? (
            <a href="/profile">
              <FaUser
                onClick={() => setMenuOpen(false)}
                className='relative overflow-hidden bg-black text-white px-4 py-1 rounded transition duration-300 hover:text-black
                after:content-[""] after:absolute after:top-full after:left-0 after:w-full after:h-full after:bg-white after:opacity-0
                hover:after:top-0 hover:after:opacity-100 after:transition-all after:duration-300'
              /></a>
          ) : (
            <a href="/login"
              onClick={() => setMenuOpen(false)}
              className='relative overflow-hidden bg-black text-white px-4 py-1 rounded transition duration-300 hover:text-black
                after:content-[""] after:absolute after:top-full after:left-0 after:w-full after:h-full after:bg-white after:opacity-0
                hover:after:top-0 hover:after:opacity-100 after:transition-all after:duration-300'
            >
              <span className='relative z-10'>Login</span>
            </a>
          )}




        </div>
      )}
    </header>
  );
};

export default Header;
