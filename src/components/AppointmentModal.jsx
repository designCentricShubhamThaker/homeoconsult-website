import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, X } from 'lucide-react';

const DISEASES = [
  "ACNE", "Adenoids", "ADHD", "Alopecia areata", "Ankylosing Spondilitis",
  "Arthritis", "Asthma", "Autism", "Calcaneal Spur", "Cervical Spondylosis",
  "Chalazion & Stys", "Depression", "Dystonia", "ECZEMA", "Emotions & Stress",
  "Fibroadenoma", "Fibroids", "Fissure In Ano", "Ganglion (Cyst)", "Hair Fall",
  "Hemorrhoids (Piles)", "Herpes Zoster (Shingles)", "Infertility",
  "Insomnia/Sleep Disorder", "Irritable Bowel Syndrome", "Kidney Stone",
  "Lichen Planus", "Lipoma", "Migraine Headaches", "Molluscum contagiosum",
  "Nasal Allergy", "PCOS or PCOD", "Perimenopause & Menopause",
  "Prostatic Hyperplasia (BPH)", "Psoriasis", "Sciatica", "Sinusitis",
  "Skin Allergies", "Tinnitus & Meniere's Disease", "Tonsillitis",
  "Trigeminal Neuralgia", "Ulcerative Colitis/Crohns", "Urticaria/Hives",
  "Vasculitis", "Vitiligo", "Vocal Cord Nodule", "Warts / Corns", "Not Listed"
];

// Modal Component
function AppointmentModal({ isOpen, onClose }) {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [caseId, setCaseId] = useState('');
  const [primaryDisease, setPrimaryDisease] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('initial');
  const [bookedByPatient, setBookedByPatient] = useState(true);
  const [notes, setNotes] = useState('');
  const [patientId, setPatientId] = useState('');
  const [isNewPatient, setIsNewPatient] = useState('yes');
  const [addOnDiseases, setAddOnDiseases] = useState([]);
  const [addOnCaseIds, setAddOnCaseIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);


  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const addAdditionalDisease = (disease) => {
    if (!addOnDiseases.includes(disease) && disease !== primaryDisease) {
      setAddOnDiseases([...addOnDiseases, disease]);
    }
  };

  const removeAdditionalDisease = (diseaseToRemove) => {
    setAddOnDiseases(addOnDiseases.filter(d => d !== diseaseToRemove));
  };

  const filteredDiseases = DISEASES.filter(d =>
    d !== primaryDisease && !addOnDiseases.includes(d)
  );

  const validateForm = () => {
    if (!patientName || !contact || !primaryDisease || !appointmentDate || !appointmentTime) {
      alert('Please fill all required fields');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setPatientName('');
    setEmail('');
    setContact('');
    setCaseId('');
    setPrimaryDisease('');
    setAppointmentDate('');
    setAppointmentTime('');
    setAppointmentType('initial');
    setNotes('');
    setPatientId('');
    setIsNewPatient('yes');
    setAddOnDiseases([]);
    setAddOnCaseIds('');
  };

  const handleSubmit = async () => {
  if (!validateForm()) return;

  setLoading(true);
  setSubmitStatus(null);

  const appointmentData = {
    // Only include patient_id if it's actually provided by user
    // For new website customers, this will be undefined/not included
    ...(patientId && { patient_id: patientId }),
    patientName,
    contact,
    caseId,
    primaryDisease,
    addOnDiseases: addOnDiseases.length > 0 ? addOnDiseases : null,
    addOnCaseIds: addOnCaseIds || null,
    appointmentDate: appointmentDate,  
    appointmentTime: appointmentTime,  
    appointmentType,
    bookedByPatient,
    notes: notes || null,
    status: bookedByPatient ? 'pending_approval' : 'scheduled'
  };

  try {
    const response = await fetch('http://localhost:8000/appointments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to book appointment');
    }

    const result = await response.json();

    setSubmitStatus({
      type: 'success',
      message: bookedByPatient
        ? `Appointment request submitted! ID: ${result.id}. Pending approval.`
        : `Appointment scheduled! ID: ${result.id}`
    });

    setTimeout(() => {
      resetForm();
      onClose();
    }, 3000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: `Failed: ${error.message}`
    });
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#207755] text-white p-4 flex items-center justify-between rounded-t-lg flex-shrink-0">
          <div className="flex-1 pr-2">
            <h2 className="text-xl font-bold">Request An Appointment</h2>
            <p className="text-xs text-white/80 mt-1">
              This appointment request is for regular consultation with the Doctor at HomeoConsult
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {submitStatus && (
            <div className={`mb-4 p-3 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`text-xs ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {submitStatus.message}
              </p>
            </div>
          )}

          <form className="space-y-4">
            {/* First Row - Patient Information & Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Information */}
              <div>
                <h3 className="text-xs font-semibold text-[#207755] mb-2 pb-1 border-b border-gray-200">
                  Patient Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      placeholder="Rohit Volaknalli"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Email Id
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      placeholder="drnavitavaknali@hotmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      placeholder="9820190203"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Patient Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={isNewPatient}
                        onChange={(e) => setIsNewPatient(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      >
                        <option value="yes">New</option>
                        <option value="no">Existing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Patient ID
                      </label>
                      <input
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                        placeholder="UHID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Country
                      </label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none">
                        <option>India</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Case ID
                      </label>
                      <input
                        type="text"
                        value={caseId}
                        onChange={(e) => setCaseId(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                        placeholder="CASE001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-xs font-semibold text-[#207755] mb-2 pb-1 border-b border-gray-200">
                  Appointment Details
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Primary Disease <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={primaryDisease}
                      onChange={(e) => setPrimaryDisease(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                    >
                      <option value="">Select disease</option>
                      {DISEASES.map(disease => (
                        <option key={disease} value={disease}>{disease}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Appointment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                    >
                      <option value="initial">Initial</option>
                      <option value="follow_up">Follow-up</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        min={getMinDate()}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Additional Diseases & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
              {/* Additional Diseases */}
              <div>
                <h3 className="text-xs font-semibold text-[#207755] mb-2 pb-1 border-b border-gray-200">
                  Additional Diseases <span className="text-[10px] font-normal text-gray-500">(optional)</span>
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Add Secondary Condition
                    </label>
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          addAdditionalDisease(e.target.value);
                        }
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                    >
                      <option value="">Select condition</option>
                      {filteredDiseases.map(disease => (
                        <option key={disease} value={disease}>{disease}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Additional Case IDs
                    </label>
                    <input
                      type="text"
                      value={addOnCaseIds}
                      onChange={(e) => setAddOnCaseIds(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      placeholder="Additional Case IDs"
                    />
                  </div>

                  {addOnDiseases.length > 0 && (
                    <div className="space-y-1.5">
                      {addOnDiseases.map((disease, index) => (
                        <div key={index} className="bg-gray-50 rounded p-2 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#207755]">{disease}</span>
                            <button
                              type="button"
                              onClick={() => removeAdditionalDisease(disease)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-xs font-semibold text-[#207755] mb-2 pb-1 border-b border-gray-200">
                  Additional Notes
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Special Requirements
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none resize-none"
                      rows={6}
                      placeholder="Any special requirements or additional information..."
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookedByPatient}
                        onChange={(e) => setBookedByPatient(e.target.checked)}
                        className="w-3 h-3 text-[#207755] border-gray-300 rounded"
                      />
                      <span className="text-[11px] text-gray-700 font-medium">
                        Patient-booked (requires approval)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Buttons */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg flex-shrink-0">
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#207755] hover:bg-[#1a6245] text-white font-semibold py-2 px-8 rounded-lg transition-colors flex items-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  SUBMITTING...
                </>
              ) : (
                'SUBMIT DETAILS'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;