import React from 'react';
import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function PatientFeedback() {
  const [muted1, setMuted1] = useState(true);
  const [muted2, setMuted2] = useState(true);
  const [playing1, setPlaying1] = useState(false);
  const [playing2, setPlaying2] = useState(false);
  
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const toggleMute1 = () => {
    if (video1Ref.current) {
      video1Ref.current.muted = !muted1;
      setMuted1(!muted1);
    }
  };

  const toggleMute2 = () => {
    if (video2Ref.current) {
      video2Ref.current.muted = !muted2;
      setMuted2(!muted2);
    }
  };

  const handlePlay1 = () => {
    setPlaying1(true);
  };

  const handlePlay2 = () => {
    setPlaying2(true);
  };

  return (
    <div 
      className=" flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#d4e5d4'
      }}
    >
      <div className=" w-full">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#147140]">
          Patient Feedback <span className="font-normal">& Results</span>
        </h1>

        {/* Video Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          {/* Video 1 */}
          <div className="relative w-full md:w-106 aspect-video  rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={video1Ref}
              className="w-full h-full object-cover"
              muted={muted1}
              controls
              playsInline
              onPlay={handlePlay1}
            >
              <source src="/testimonial1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
          
          </div>

          {/* Video 2 */}
          <div className="relative w-full md:w-106 aspect-video rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={video2Ref}
              className="w-full h-full object-cover"
              muted={muted2}
              controls
              playsInline
              onPlay={handlePlay2}
            >
              <source src="/testimonial2.mp4"  type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
           
          </div>
        </div>

        {/* Pagination Dots */}
      
      </div>
    </div>
  );
}