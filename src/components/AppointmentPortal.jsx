import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, Stethoscope, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Home } from 'lucide-react';

const AppointmentPortal = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    doctorName: '',
    location: '',
    patientName: '',
    email: '',
    mobile: '',
    appointmentDate: '',
    appointmentTime: '',
    message: '',
    isNewPatient: '',
    caseNumber: ''
  });

  const doctors = [
    'Dr. Navita Purohit Vyas',
    'Dr. Rajesh Kumar',
    'Dr. Priya Sharma',
    'Dr. Amit Patel'
  ];

  const locations = ['Bandra', 'Malad', 'USA/Canada'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage('thankyou');
  };

  const Breadcrumb = ({ items }) => (
    <div className="flex items-center gap-2 text-xs mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-gray-500 hover:text-teal-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? 'text-gray-700 font-medium' : 'text-gray-500'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const MiniDateTimePicker = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState({ hour: '09', minute: '00', period: 'AM' });
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = formData.appointmentDate === dateString;
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isPast && handleInputChange('appointmentDate', dateString)}
          disabled={isPast}
          className={`h-7 flex items-center justify-center text-xs font-medium transition-all ${
            isSelected 
              ? 'bg-teal-600 text-white rounded-md' 
              : isPast
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-teal-50 text-gray-700 rounded-md'
          }`}
        >
          {day}
        </button>
      );
    }

    const setTime = () => {
      const timeString = `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;
      handleInputChange('appointmentTime', timeString);
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-xs font-semibold text-gray-700">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {days}
          </div>
          {formData.appointmentDate && (
            <div className="mt-2 text-xs text-teal-600 font-medium">
              {new Date(formData.appointmentDate + 'T00:00:00').toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs font-medium text-gray-500 mb-2">Select Time</div>
          <div className="flex gap-1 items-center mb-2">
            <select
              value={selectedTime.hour}
              onChange={(e) => setSelectedTime({...selectedTime, hour: e.target.value})}
              className="px-2 py-1.5 text-xs border-0 bg-gray-50 rounded focus:bg-white focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            >
              {[...Array(12)].map((_, i) => {
                const hour = (i + 1).toString().padStart(2, '0');
                return <option key={hour} value={hour}>{hour}</option>;
              })}
            </select>
            <span className="text-sm font-medium text-gray-400">:</span>
            <select
              value={selectedTime.minute}
              onChange={(e) => setSelectedTime({...selectedTime, minute: e.target.value})}
              className="px-2 py-1.5 text-xs border-0 bg-gray-50 rounded focus:bg-white focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            >
              {['00', '15', '30', '45'].map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
            <select
              value={selectedTime.period}
              onChange={(e) => setSelectedTime({...selectedTime, period: e.target.value})}
              className="px-2 py-1.5 text-xs border-0 bg-gray-50 rounded focus:bg-white focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <button
            type="button"
            onClick={setTime}
            className="w-full px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
          >
            Set Time
          </button>
          {formData.appointmentTime && (
            <div className="mt-2 text-xs text-teal-600 font-medium">
              {formData.appointmentTime}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (currentPage === 'home') {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden">
        <div className=" px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-8">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Book Your<br/>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Appointment</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Schedule your consultation with expert doctors across Bandra, Malad, and international locations
          </p>
          <button
            onClick={() => setCurrentPage('booking')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'booking') {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden p-6">
        <div className=" w-full">
          <Breadcrumb 
            items={[
              { label: 'Home', onClick: () => setCurrentPage('home') },
              { label: 'Book Appointment' }
            ]}
          />

          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <select
                      value={formData.doctorName}
                      onChange={(e) => handleInputChange('doctorName', e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none"
                    >
                      <option value="">Select doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Location</div>
                    <div className="flex gap-2">
                      {locations.map(location => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => handleInputChange('location', location)}
                          className={`flex-1 py-2.5 px-3 text-xs font-medium rounded-lg transition-all ${
                            formData.location === location
                              ? 'bg-teal-600 text-white shadow-md'
                              : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Patient Status</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('isNewPatient', 'yes')}
                    className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
                      formData.isNewPatient === 'yes'
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                    }`}
                  >
                    New Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('isNewPatient', 'no')}
                    className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
                      formData.isNewPatient === 'no'
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                    }`}
                  >
                    Existing
                  </button>
                </div>
              </div>

              {formData.isNewPatient === 'no' && (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange('caseNumber', e.target.value)}
                    placeholder="Case Number"
                    className="w-full px-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Info</h2>
              
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    required
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    required
                    placeholder="Mobile Number"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  />
                </div>

                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Additional notes (optional)"
                  rows="4"
                  className="w-full px-4 py-3 text-sm bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule</h2>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <MiniDateTimePicker />
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden p-6">
      <div className="max-w-2xl w-full">
        <Breadcrumb 
          items={[
            { label: 'Home', onClick: () => setCurrentPage('home') },
            { label: 'Book Appointment', onClick: () => setCurrentPage('booking') },
            { label: 'Confirmed' }
          ]}
        />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            All Set!
          </h1>
          
          <p className="text-base text-gray-600 max-w-md mx-auto">
            Your appointment request has been received. We'll confirm shortly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 col-span-2">
              <span className="text-gray-500">Doctor</span>
              <span className="font-semibold text-gray-900">{formData.doctorName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Location</span>
              <span className="font-semibold text-gray-900">{formData.location}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Patient</span>
              <span className="font-semibold text-gray-900">{formData.patientName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(formData.appointmentDate + 'T00:00:00').toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Time</span>
              <span className="font-semibold text-gray-900">{formData.appointmentTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 rounded-xl p-4 mb-6 border border-teal-100">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Urgent?</span> Call <span className="font-semibold text-teal-700">+91-22-4269-9999</span> • Add info@kdahmails.com to your contacts
          </p>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              setCurrentPage('home');
              setFormData({
                doctorName: '',
                location: '',
                patientName: '',
                email: '',
                mobile: '',
                appointmentDate: '',
                appointmentTime: '',
                message: '',
                isNewPatient: '',
                caseNumber: ''
              });
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPortal;