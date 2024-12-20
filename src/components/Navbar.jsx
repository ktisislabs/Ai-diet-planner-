import React, { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='w-full h-auto border p-4 flex items-center justify-between shadow-2xl'>
      {/* Logo */}
      <span className='font-poppins text-3xl font-bold flex items-center'>
        Kcal<p className='font-light'>Bot</p>
      </span>

      {/* Menu for larger screens */}
      <div className='hidden md:flex items-center gap-12'>
        <p className='text-xl font-medium font-poppins hover:text-gray-500 cursor-pointer'>About</p>
        <p className='text-xl font-medium font-poppins hover:text-gray-500 cursor-pointer'>Developer Github</p>
      </div>

      {/* Hamburger Menu (for small screens) */}
      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu} className='text-2xl'>
          {isMenuOpen ? (
            <span className='text-3xl'>&#10005;</span>  
          ) : (
            <span className='text-3xl'>&#9776;</span> 
          )}
        </button>
      </div>

      {/* Mobile menu items */}
      <div
        className={`md:hidden absolute top-16 right-0 w-full bg-white p-6 flex flex-col items-center gap-4 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <p className='text-xl font-medium font-poppins hover:text-gray-500 cursor-pointer'>About</p>
        <p className='text-xl font-medium font-poppins hover:text-gray-500 cursor-pointer'>Developer Github</p>
      </div>
    </nav>
  );
}

export default Navbar;
