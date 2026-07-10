import React from 'react';

export default function About() {
  return (
    <section 
      className="relative w-full bg-white overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Desktop Background & Fade Overlay
        Hidden on mobile. Displays the image on the right with a soft white gradient fade from the left.
      */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {/* Background Image - Replace '/about-bg.jpg' with your actual image path */}
        <div 
          className="absolute inset-0 bg-cover bg-center lg:bg-right" 
          style={{ backgroundImage: 'url("/about.jpg")' }}
        ></div>
        {/* The Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-[75%] lg:w-[90%]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto">
        
        {/* Text Area - Displays on top for mobile, left side for desktop */}
        <div className="w-full md:w-[65%] lg:w-[55%] px-6 py-12 md:px-16 md:py-32">
          <h2 className="text-[#0B213E] text-3xl md:text-5xl font-bold mb-8 md:mb-10 tracking-wide">
            About US
          </h2>
          
          {/* Paragraphs precisely matching the capitalization and weight of the reference image */}
          <div className="space-y-6 text-[#1A2E4B] text-sm md:text-base font-bold leading-relaxed">
            <p>
              The Whale Watching Monitoring & Management System Is A Comprehensive Digital Platform Developed To Enhance The Safety, Efficiency, And Operational Management Of Whale-Watching Activities. Designed To Support Authorities, Operators, Crew Members, And Passengers, The System Streamlines Trip Management, Passenger Monitoring, And Communication Through A Centralized Platform.
            </p>
            <p>
              By Combining A Mobile Application With A Web Portal, The System Enables Users To Securely Access Essential Services, Manage Operational Activities, And Stay Connected From Anywhere. It Promotes Better Coordination, Improves Situational Awareness, And Provides Timely Access To Important Information Throughout Every Stage Of A Trip.
            </p>
            <p>
              With A Strong Focus On Safety, Transparency, And Digital Transformation, The Platform Helps Modernize Whale-Watching Operations While Supporting Regulatory Compliance And Delivering A More Reliable Experience For Everyone Involved.
            </p>
          </div>
        </div>

        {/* Mobile Image Area 
          Hidden on desktop. Displays below the text on mobile with padding and rounded edges.
        */}
        <div className="w-full px-6 pb-12 md:hidden">
          {/* Padding wrapper for the image */}
          <div className="w-full p-2 bg-white rounded-3xl">
            <div 
              className="w-full h-[300px] sm:h-[400px] rounded-3xl bg-cover bg-center shadow-lg"
              style={{ backgroundImage: 'url("/about.jpg")' }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
}