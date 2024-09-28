import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-black py-3">
      <div className="container mx-auto px-4">
        {/* Contact Info Section */}
        <div className="md:flex justify-between">
          {/* Address Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">College Address</h2>
            <p>Velagapudi Ramakrishna Siddhartha Engineering College,<br></br> Chalasani Nagar,<br></br> Kanuru,<br></br> Vijayawada, Andhra Pradesh 520007</p>
          </div>

          {/* Phone Numbers */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Numbers</h2>
            <p><FaPhone className="inline mr-2" /> +91 866 2582334,2584930</p>
            <p><FaPhone className="inline mr-2" /> +91 866 2582672</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/explore/locations/923236832/velagapudi-ramakrishna-siddhartha-engineering-college/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-gray-400" />
              </a>
              <a href="https://linkedin.com/company/vrsec" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-gray-400" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=principal@vrsiddhartha.ac.in&bcc=principal@vrsiddhartha.ac.in">
                <FaEnvelope className="text-2xl hover:text-gray-400" />
              </a>
              <a href="tel:+91 866 2582672">
                <FaPhone className="text-2xl hover:text-gray-400" />
              </a>
              <a href="https://www.facebook.com/vrsec/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Text Section */}
        <div className="mt-2 border-t border-gray-600 pt-2">
          <p className="text-center">
            {/* You can dynamically add any custom text here */}
            © {new Date().getFullYear()} Velagapudi Ramakrishna Siddhartha Engineering College. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;