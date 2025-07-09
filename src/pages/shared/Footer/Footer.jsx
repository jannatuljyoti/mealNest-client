import React from 'react';
import MealNestLogo from '../mealnest/MealNestLogo';
import { FaEnvelope, FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
       <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
  <aside>
    
    <MealNestLogo></MealNestLogo>
    <p className="font-bold">
    University Hostel Management
      <br />
      Streamlining student life with efficient meal & review management. Built with MERN Stack.
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
     
     <a href="https://www.facebook.com/" target='_blank'><FaFacebook className='w-8 h-8'/></a>
     <a href="https://github.com/dashboard" target='_blank'><FaGithub className='w-8 h-8'/></a>
     <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jannatul15-2482@diu.edu.bd" target='_blank' rel="noopener noreferrer"><FaEnvelope className='w-8 h-8' /></a>
    </div>
  </nav>
</footer>
    );
};

export default Footer;