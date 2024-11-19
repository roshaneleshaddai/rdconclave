import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-black py-6">
      <div className="container mx-auto px-4">
        {/* Contact Information Section */}
        <div className="md:flex justify-around mb-8">
        <div className="">
          <h2 className="text-lg font-semibold mb-2 text-center">Our Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.869961897907!2d80.68879827438411!3d16.482120928253742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb3cd8a69f41%3A0x9a0e1b5a776b918!2sVelagapudi%20Ramakrishna%20Siddhartha%20Engineering%20College!5e0!3m2!1sen!2sin!4v1732018692842!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="College Location"
            ></iframe>
          </div>
        
          {/* Address Section */}
          <div className="flex-col justify-around p-2 md:p-20">
            <div className="md:flex gap-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">College Address</h2>
            <p>
              Velagapudi Ramakrishna Siddhartha Engineering College,<br />
              Chalasani Nagar,<br />
              Kanuru,<br />
              Vijayawada, Andhra Pradesh 520007
            </p>
          </div>

          {/* Phone Numbers Section */}
          <div className="mb-6 md:mb-0 flex-col">
            <h2 className="text-lg font-semibold mb-2">Contact Numbers</h2>
            <p>
              <FaPhoneAlt className="inline mr-2" /> Dr. Jaya Prakash S - 9848143200 <br />
              <FaPhoneAlt className="inline mr-2" /> Dr. Gargi M - 8886599444<br/>
              <FaPhoneAlt className="inline mr-2" /> M .Eleshaddai Roshan - 9618227549<br/>
              <FaPhoneAlt className="inline mr-2" /> G .Neeraja - 8341323299
            </p>
           
          </div>
          </div>
            {/* Social Media Links Section */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/research_conclave?igsh=djZhMmsydThidGZj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-gray-400" />
            </a>
            <a href="https://linkedin.com/company/vrsec" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-gray-400" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=principal@vrsiddhartha.ac.in&bcc=principal@vrsiddhartha.ac.in">
              <FaEnvelope className="text-2xl hover:text-gray-400" />
            </a>
            <a href="tel:+91 866 2582672">
              <FaPhoneAlt className="text-2xl hover:text-gray-400" />
            </a>
            <a href="https://www.facebook.com/vrsec/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
          </div>
        </div>

      

        {/* Footer Bottom Text */}
        <div className="mt-6 border-t border-gray-600 pt-2">
          <p className="text-center">
            © {new Date().getFullYear()} Velagapudi Ramakrishna Siddhartha Engineering College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
