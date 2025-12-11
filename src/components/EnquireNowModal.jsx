import React, { useState } from 'react';
import { X } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/contacts';

export default function EnquireNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    new_patient: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.new_patient || !formData.country) {
      setSubmitStatus('error');
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('new_patient', formData.new_patient);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('current_case_no', '');

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          new_patient: '',
          country: ''
        });
        setTimeout(() => {
          setSubmitStatus(null);
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>

      <div  
  className="fixed inset-0 bg-gray-500/75 transition-opacity z-[100]"
  onClick={onClose}
>
  <div 
    className="fixed right-0 top-1/2 -translate-y-1/2 w-72 bg-white shadow-2xl z-50 rounded-l-xl"
    onClick={(e) => e.stopPropagation()}
  >

        <div className="flex flex-col">
          {/* Header - Emerald/Teal Green */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-tl-xl flex items-center justify-between">
            <h2 className="text-sm font-bold">ENQUIRE NOW</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-3 max-h-96 overflow-y-auto">
            <p className="text-xs text-gray-600 mb-3">Fill in the details</p>

            <div className="space-y-2">
              {/* Name and Email - Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    New Patient
                  </label>
                  <input
                    type="text"
                    name="new_patient"
                    value={formData.new_patient}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Yes/No"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Query
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                  placeholder="Your query"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="text-xs text-green-600 bg-green-50 p-1.5 rounded">
                  ✓ Submitted!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-xs text-red-600 bg-red-50 p-1.5 rounded">
                  ✗ Fill all fields
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-1.5 rounded font-semibold text-xs hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
       
      
      
    </>
  );
}