import React, { useState } from 'react';
import { User, Globe, MessageSquare, FileText, Send, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import Layout from '../Layout/Layout';
import { MapPin, Phone, Mail } from 'lucide-react';
import AppointmentModal from '../components/AppointmentModal';
const API_BASE_URL = 'http://localhost:8000/contacts';

export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    new_patient: '',
    current_case_no: '',
    country: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countries = [
    'United States', 'United Kingdom', 'India', 'Canada', 'Australia',
    'Germany', 'France', 'Japan', 'China', 'Brazil', 'South Africa'
  ];

  const indiaLocations = [
    {
      title: "Homeoconsult R&D",
      subtitle: "G/5 (Eversidly)",
      address: "Jain Chambers, SV Road, Bandra (W), Mumbai - 400050",
      email: "ask@homeoconsult.com",
      phone: "+91 9820180203",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.206911277345!2d72.83544387425121!3d19.054638252644637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93ce89a9cd5%3A0x28ad20c7364398de!2sDr.%20Anish%20Vaknalli%20%7C%20HomeoConsult%20R%26D%20%7C%20Chronic%20Diseases%2C%20Autism%2C%20ADHD!5e0!3m2!1sen!2sin!4v1764656258272!5m2!1sen!2sin"
    },
    {
      title: "Homeoconsult R&D",
      subtitle: "7BB, Somalya Chambers",
      address: "SV Road, Malad (W), Mumbai - 400064, India",
      email: "ask@homeoconsult.com",
      phone: "+91 9820180203",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2069525075217!2d72.8422839715275!3d19.18616120883797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b955555555%3A0x214b77e13eb1d758!2sDr.%20Anish%20Vaknalli%20-%20HomeoConsult%20R%26D!5e0!3m2!1sen!2sin!4v1764656094597!5m2!1sen!2sin"
    }
  ];

  const usaLocation = {
    title: "Homeoconsult R&D",
    subtitle: "c/o Dr. Parag A. Shah (MD)",
    address: "953 Flintridge Avenue, La Canada, Flintridge, CA, USA 91011",
    email: "usa@homeoconsult.com",
    tollFree: "1-888-371-3575",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13200.88969386223!2d-118.198175!3d34.191793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c21b33725e77%3A0xeb4e9eacfb17f029!2s953%20Flintridge%20Ave%2C%20La%20Ca%C3%B1ada%20Flintridge%2C%20CA%2091011!5e0!3m2!1sen!2sus!4v1764656460060!5m2!1sen!2sus"
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.new_patient) newErrors.new_patient = 'Please select an option';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!termsAccepted) newErrors.terms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('new_patient', formData.new_patient);
      formDataToSend.append('current_case_no', formData.current_case_no || '');
      formDataToSend.append('country', formData.country);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();

        // Backend already broadcasts via WebSocket, no need to manually send
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          new_patient: '',
          current_case_no: '',
          country: '',
          phone: '',
          message: ''
        });
        setTermsAccepted(false);

        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/contact.jpg')`
        }}
      >
        <div className="relative z-10  mx-auto ">
          <div className=" bg-[#7FB19C] w-full p-4 mb-8">
            <h2 className="text-3x ml-5  md:text-4xl  text-white">
              Contact US
            </h2>
          </div>
          <div className=" mx-auto px-4 py-6  max-w-4xl">
            <h2 className="text-2xl font-bold   text-[#207755]">Ask Dr. Vaknalli</h2>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              Please restrict your queries to the scope of Homeopathy in relation to specific ailments.
              We do not make remedy suggestions without our detailed case analysis procedure for which
              you need to choose a 'Treatment Plan'. Please fill in your contact details as well as the
              question you wish to ask Dr. Vaknalli.
            </p>


            {submitStatus === 'success' && (
              <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-green-900">Thank you for contacting us!</h3>
                  <p className="text-sm text-green-700">We've received your message and will get back to you soon.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-red-900">Submission failed</h3>
                  <p className="text-sm text-red-700">Please try again or contact us directly.</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className=" mt-6 space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: New Patient and Current Case No */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Patient <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <select
                      name="new_patient"
                      value={formData.new_patient}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border ${errors.new_patient ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">-Select-</option>
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>
                  {errors.new_patient && <p className="mt-1 text-xs text-red-600">{errors.new_patient}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Case No
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <input
                      type="text"
                      name="current_case_no"
                      value={formData.current_case_no}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter case number (if applicable)"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Country and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-teal-500" size={18} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full pl-11 pr-4 py-3 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none`}
                    placeholder="Please describe your query in detail..."
                  ></textarea>
                </div>
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              {/* Captcha placeholder */}
              <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-center gap-3 text-sm font-mono text-gray-700">
                  <div className="bg-white px-6 py-2 rounded border border-gray-300 tracking-wider">
                    rTTlVlh
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    I have read, understood & accepted the{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold underline">
                      Disclaimer
                    </a>{' '}
                    provided on this site.
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-emerald-700 focus:ring-4 focus:ring-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full bg-gradient-to-br from-teal-50 via-white to-green-50 py-12 px-4">
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-800">
              Find Us At
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* INDIA HEADER - spans 2 columns */}
              <div className="md:col-span-2 lg:col-span-2 col-span-1">
                <h2 className="text-2xl font-bold text-[#207755] mb-4 border-b-2 border-[#207755] pb-2">
                  India
                </h2>
              </div>

              {/* USA/CANADA HEADER - positioned in third column */}
              <div className="col-span-1 lg:block hidden">
                <h2 className="text-2xl font-bold text-[#207755] mb-4 border-b-2 border-[#207755] pb-2">
                  USA/Canada
                </h2>
              </div>

              {/* INDIA LOCATION CARDS */}
              {indiaLocations.slice(0, 2).map((location, index) => (
                <div key={index} className="flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#207755] mb-1">{location.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{location.subtitle}</p>

                    <div className="space-y-1">
                      <p className="text-xs text-[#207755]"><b>Address:</b> {location.address}</p>
                      <p className="text-xs text-[#207755]">
                        <b>Email:</b> <a href={`mailto:${location.email}`} className="text-green-700 underline">{location.email}</a>
                      </p>
                      <p className="text-xs text-[#207755]">
                        <b>Call Us:</b> {location.phone}
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-60 flex-shrink-0">
                    <iframe src={location.mapUrl} width="100%" height="100%" style={{ border: 0 }} />
                  </div>
                </div>
              ))}

              {/* USA/CANADA HEADER for mobile/tablet */}
              <div className="col-span-1 lg:hidden">
                <h2 className="text-2xl font-bold text-[#207755] mb-4 border-b-2 border-[#207755] pb-2">
                  USA/Canada
                </h2>
              </div>

              {/* USA CARD */}
              <div className="flex flex-col h-full lg:col-start-3 lg:row-start-2">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#207755] mb-1">{usaLocation.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{usaLocation.subtitle}</p>

                  <div className="space-y-1">
                    <p className="text-xs text-[#207755]"><b>Address:</b> {usaLocation.address}</p>
                    <p className="text-xs text-[#207755]">
                      <b>Email:</b> <a href={`mailto:${usaLocation.email}`} className="text-green-700 underline">{usaLocation.email}</a>
                    </p>
                    <p className="text-xs text-[#207755]">
                      <b>USA/Canada Tollfree:</b> {usaLocation.tollFree}
                    </p>
                  </div>
                </div>

                <div className="w-full h-60 flex-shrink-0">
                  <iframe src={usaLocation.mapUrl} width="100%" height="100%" style={{ border: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0d6e4f] text-white px-4 py-8 rounded-l-lg shadow-lg hover:bg-[#0a5940] transition-colors flex flex-col items-center gap-2"
          >
            <Calendar className="w-5 h-5 rotate-90" />
            <span className="text-sm font-semibold whitespace-nowrap transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Book an Appointment
            </span>
          </button>
        </div>

        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div >

    </Layout >

  );
}