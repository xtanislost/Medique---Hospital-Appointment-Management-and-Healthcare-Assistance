import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: adds a smooth scrolling animation
    });
  };

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Medique Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Medique is dedicated to making healthcare accessible and efficient. Our platform connects you with experienced doctors, simplifies appointment scheduling, and offers valuable health insights.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop} className="hover:text-blue-500">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-blue-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-blue-500">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 6390842071</li>
            <li>medique.med@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ Medique.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;