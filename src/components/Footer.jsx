import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#207755] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          {/* Logo + Social Icons */}
          <div className="flex items-center justify-between mb-6">
            <img
              src="/homeo_consult_logo.jpg"
              alt="Homeo Consult Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex gap-3">
              <Instagram size={18} />
              <Facebook size={18} />
              <Linkedin size={18} />
            </div>
          </div>

          {/* Locations Grid - 2 columns, equal height boxes */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Bandra */}
            <div className="bg-[#1a6548] p-3 rounded min-h-[100px] flex flex-col">
              <h3 className="font-bold text-xs mb-2">Bandra</h3>
              <p className="text-[10px]  leading-relaxed grow">
                Jain Chambers<br />
                SV Road<br />
                Bandra (W)<br />
                Mumbai 400050
              </p>
              <p className="text-[10px] font-semibold mt-2">+91 9820190203</p>
            </div>

            {/* Malad */}
            <div className="bg-[#1a6548] p-3 rounded min-h-[100px] flex flex-col">
              <h3 className="font-bold text-xs mb-2">Malad</h3>
              <p className="text-[10px]  leading-relaxed grow">
                SV Road<br />
                Malad (W)<br />
                Mumbai 400064
              </p>
              <p className="text-[10px] font-semibold mt-2">+91 9820190203</p>
            </div>

            {/* USA/Canada */}
            <div className="bg-[#1a6548] p-3 rounded min-h-[100px] flex flex-col">
              <h3 className="font-bold text-xs mb-2">USA/Canada</h3>
              <p className="text-[10px]  leading-relaxed grow">
                163 Tenace Ave<br />
                LU, Canada<br />
                <br />
                usa@homeoconsult.com
              </p>
              <p className="text-[10px] font-semibold mt-2">+1 647-440-3875</p>
            </div>

            {/* Resources */}
            <div className="bg-[#1a6548] p-3 rounded min-h-[100px] flex flex-col">
              <h3 className="font-bold text-xs mb-2">Resources</h3>
              <ul className="text-[10px]  leading-relaxed space-y-1 grow">
                <li>Doctor Section</li>
                <li>Health Talks</li>
                <li>Blogs</li>
                <li>Brochure</li>
              </ul>
            </div>
          </div>

          {/* Razorpay */}
          <div className="text-center">
            <p className="text-xs ">Razorpay</p>
          </div>
        </div>

        {/* DESKTOP original layout preserved completely */}
        <div className="hidden lg:grid grid-cols-5 gap-8">

          <div className="col-span-1 flex flex-col items-start justify-start">
            <img
              src="/homeo_consult_logo.jpg"
              alt="Homeo Consult Logo"
              className="h-15 w-auto object-contain"
            />
            <p className='font-medium mt-2'>Follow Us</p>
            <div className="flex gap-3 mb-4 mt-2">
              <Instagram size={18} />
              <Facebook size={18} />
              <Linkedin size={18} />
            </div>
            <div className="text-xs ">Razorpay</div>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-base mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>Doctor Section</li>
              <li>Upcoming Health Talks</li>
              <li>Blogs</li>
              <li>Download Brochure</li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-base mb-3">Bandra</h3>
            <p className="text-sm text-green-100 mb-3">
              HomeOconsult R&D <br />
              (Opp Dr Vaidyaraj) <br />
              Jain Chambers, SV Road, <br />
              Bandra (W), Mumbai 400050
            </p>
            <p className="text-sm text-green-100 font-semibold">
              Call Us: +91 9820190203
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-base mb-3">Malad</h3>
            <p className="text-sm text-green-100 mb-3">
              HomeOconsult R&D <br />
              SV Road, Malad (W), <br />
              Mumbai - 400064
            </p>
            <p className="text-sm font-semibold text-green-100">
              Call Us: +91 9820190203
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-base mb-3">USA/Canada</h3>
            <p className="text-sm text-green-100 mb-3">
              163 Tenace Ave, <br />
              LU, Canada
            </p>
            <p className="text-sm text-green-100">usa@homeoconsult.com</p>
            <p className="text-sm text-green-100">+1 647-440-3875</p>
            <p className="text-sm text-green-100">ask@homeoconsult.com</p>
            <p className="text-sm text-green-100">+91 9820190203</p>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#1c6a4c] py-3 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">

          {/* MOBILE */}
          <div className="flex flex-col items-center text-center gap-2 text-[11px] text-green-100 sm:hidden">
            <p>© 2025 HomeOconsult R&D. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Disclaimer</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Cookies Policy</a>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:flex items-center justify-between text-xs text-green-100">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Disclaimer</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Cookies Policy</a>
            </div>
            <p>© 2025 HomeOconsult R&D. All rights reserved.</p>
          </div>

        </div>
      </div>

    </footer>
  );
}