import React from 'react';

export default function Contact() {
  return (
    <section 
      className="w-full min-h-screen py-20 px-4 flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("contact.png")', // Your main ocean image
        fontFamily: "'Montserrat', sans-serif" 
      }}
    >
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Line Texture Layer */}
        {/* Replace 'line-texture.png' with a transparent PNG of the wavy lines */}
        <div 
          className="absolute inset-0 opacity-[100] pointer-events-none" 
          style={{ 
            backgroundImage: 'url("/contacttexture.png")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
          
          {/* Logo */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="/SLCGicon.png" 
              alt="Sri Lanka Coast Guard" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-2/3">
            <h2 className="text-[#0B213E] text-3xl md:text-4xl font-bold mb-8">
              Have questions?<br />
              Let's connect.
            </h2>
            
            <form className="space-y-4">
              <input type="text" placeholder="Enter Your Name" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B213E] outline-none transition-all" />
              <input type="email" placeholder="Enter Your Email Address" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B213E] outline-none transition-all" />
              <textarea placeholder="Type Your Inquiry Or Feedback..." rows={4} className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B213E] outline-none transition-all"></textarea>
              <button type="submit" className="bg-[#0B213E] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#1a3a63] transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}