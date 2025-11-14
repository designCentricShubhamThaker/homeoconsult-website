import React, { useState } from 'react';
import { Menu, X, Phone, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    'About Us',
    'About Homeopathy',
    'Ailments & Treatments',
    'Services',
    'Cured Cases',
    'Testimonials',
    'FAQs',
    'Contact Us'
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Layout */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/homeo_consult_logo.jpg"
              alt="Homeo Consult Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-col items-end space-y-3">
            {/* Contact & Login Row */}
            <div className="flex items-center space-x-4 text-sm">
              <a
                href="tel:+1-838-440-3676"
                className="flex items-center text-black font-bold hover:text-green-700 transition-colors"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-green-700 rounded-full mr-1.5">
                  <Phone className="w-3 h-3 text-white" />
                </span>
                USA-Canada: +1-838-440-3676
              </a>

              <a
                href="tel:+918826180203"
                className="flex items-center text-black font-bold hover:text-green-700 transition-colors"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-green-700 rounded-full mr-1.5">
                  <Phone className="w-3 h-3 text-white" />
                </span>
                India: +91-8826180203
              </a>

              <button className="flex items-center bg-[#98d1ac] text-black px-5 py-1.5 rounded-full text-sm transition-all space-x-2 font-semibold tracking-wide uppercase border-2 border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 hover:shadow-md">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-green-700 text-sm font-medium transition-colors relative group"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-gray-100">
            {/* Mobile Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+1-838-440-3676"
                className="flex items-center text-black font-semibold hover:text-green-700 transition-colors text-sm"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-green-700 rounded-full mr-2">
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">USA-Canada</span>
                  <span>+1-838-440-3676</span>
                </div>
              </a>

              <a
                href="tel:+918826180203"
                className="flex items-center text-black font-semibold hover:text-green-700 transition-colors text-sm"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-green-700 rounded-full mr-2">
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">India</span>
                  <span>+91-8826180203</span>
                </div>
              </a>

              <button className="w-full flex items-center justify-center bg-[#98d1ac] text-black px-5 py-3 rounded-full text-sm transition-all space-x-2 font-semibold tracking-wide uppercase border-2 border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 shadow-sm">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-700 hover:bg-green-50 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}