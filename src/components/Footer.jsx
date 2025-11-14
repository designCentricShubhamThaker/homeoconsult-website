import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#207755] text-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">

          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-start justify-start">
            <img
              src="/homeo_consult_logo.jpg"
              alt="Homeo Consult Logo"
              className="h-15 w-auto object-contain"
            />


            <div>
              <p className='font-medium mt-2 '>Follow Us</p>
              <div className="flex gap-3 mb-4 mt-2">
                <a href="#" className="text-white hover:text-green-200 transition"><Instagram size={18} /></a>
                <a href="#" className="text-white hover:text-green-200 transition"><Facebook size={18} /></a>
                <a href="#" className="text-white hover:text-green-200 transition"><Linkedin size={18} /></a>
              </div>
              <div className="text-xs text-green-100"> Razorpay</div>
            </div>


          </div>
          <div className="col-span-1">
            <h3 className="font-bold text-sm lg:text-base mb-3">Resources</h3>
            <ul className="space-y-2 text-xs lg:text-sm text-green-100">
              <li><a href="#" className="hover:text-white transition">Doctor Section</a></li>
              <li><a href="#" className="hover:text-white transition">Upcoming Health Talks</a></li>
              <li><a href="#" className="hover:text-white transition">Blogs</a></li>
              <li><a href="#" className="hover:text-white transition">Download Brochure</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-sm lg:text-base mb-3">Bandra</h3>
            <p className="text-xs lg:text-sm text-green-100 mb-3">
              HomeOconsult R&D<br />
              <span className="text-xs">(Opp Dr Vaidyaraj)</span><br />
              Jain Chambers, SV Road,<br />
              Bandra (W), Mumbai 400050, India
            </p>
            <p className="text-xs lg:text-sm text-green-100 font-semibold">
              Call Us: <a href="tel:+919820190203" className="hover:text-white transition">+91 9820190203</a>
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold text-sm lg:text-base mb-3">Malad</h3>
            <p className="text-xs lg:text-sm text-green-100 mb-3">
              HomeOconsult R&D<br />
              SV Road, Malad (W),<br />
              Mumbai - 400064, India
            </p>
            <p className="text-xs lg:text-sm text-green-100 font-semibold">
              Call Us: <a href="tel:+919820190203" className="hover:text-white transition">+91 9820190203</a>
            </p>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-sm lg:text-base mb-3">USA/Canada</h3>
            <p className="text-xs lg:text-sm text-green-100 mb-3">
              163 Tenace Ave,<br />
              LU, Canada
            </p>
            <div className="space-y-1 text-xs lg:text-sm text-green-100">
              <p><a href="mailto:usa@homeoconsult.com" className="hover:text-white transition">usa@homeoconsult.com</a></p>
              <p>Tel: <a href="tel:+1647440-3875" className="hover:text-white transition">+1 647-440-3875</a></p>
              <p><a href="mailto:ask@homeoconsult.com" className="hover:text-white transition">ask@homeoconsult.com</a></p>
              <p>Ph: <a href="tel:+919820190203" className="hover:text-white transition">+91 9820190203</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#207755] py-3 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto flex flex-col sm:flex-row items-center justify-between text-xs lg:text-sm text-green-100 gap-3">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 order-2 sm:order-1">
            <a href="#" className="hover:text-white transition">Disclaimer</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition">Cookies Policy</a>
          </div>
          <p className="order-1 sm:order-2">© Copyright 2025. HomeOconsult R&D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}