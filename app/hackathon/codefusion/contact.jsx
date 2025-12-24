'use client';
import { Mail } from 'lucide-react';
import Sahith from './sahith.jpg';
import Pandu from './pandu.jpg';
import Manoj from './manoj.jpg';

const AcademicContactWithCoordinators = () => {
  const studentCoordinators = [
    {
      name: "Manoj",
      role: "Student Coordinator",
      phone: "9876543212",
      email: "manoj@university.edu",
      image: Manoj
    },
    {
      name: "Pandu",
      role: "Student Coordinator",
      phone: "9876543213",
      email: "pandu@university.edu",
      image: Pandu
    },
    {
      name: "Sahith",
      role: "Student Coordinator",
      phone: "9876543214",
      email: "sahith@university.edu",
      image: Sahith
    }
  ];

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center text-center space-y-3 animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-[rgba(0,33,71,0.1)] border-2 border-[rgba(0,33,71,0.3)] flex items-center justify-center overflow-hidden shadow-lg shadow-[rgba(0,33,71,0.1)] hover:border-[rgba(0,33,71,0.6)] hover:shadow-[rgba(0,33,71,0.3)] transition-all duration-300">
        {person.image ? (
          <img 
            src={person.image.src} 
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-[#002147] text-3xl font-bold" style={{ fontFamily: 'SUSE, sans-serif' }}>
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-[#002147] font-semibold text-sm" style={{ fontFamily: 'SUSE, sans-serif' }}>{person.name}</h3>
        <p className="text-[rgba(0,33,71,0.8)] text-xs" style={{ fontFamily: 'SUSE, sans-serif' }}>{person.role}</p>
        
        <div className="mt-3">
          <a 
            href={`tel:+91${person.phone}`}
            className="text-[#002147] hover:text-[#D97706] text-xs flex items-center justify-center gap-1 transition-colors duration-300"
            style={{ fontFamily: 'SUSE, sans-serif' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 {person.phone}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
      `}</style>
      
      <section className="w-full bg-[#FFFFFF] py-12 md:py-24 overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-6 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* LEFT COLUMN: Contact Information */}
            <div className="lg:col-span-5 flex flex-col justify-between animate-fade-in">
              <div className="space-y-6">
                <h2
                  className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#002147] leading-tight"
                  style={{ fontFamily: 'SUSE, sans-serif' }}
                >
                  Get in Touch
                </h2>
                
                <p
                  className="text-base md:text-lg lg:text-[18px] text-[#6B7280] max-w-[450px] leading-relaxed italic"
                  style={{ fontFamily: 'SUSE, sans-serif' }}
                >
                  Reach out for queries, academic collaborations, or event-related information.
                  Our team typically responds within two business days.
                </p>
                
                <div className="pt-4 space-y-4">
                  {/* Email Box */}
                  <div className="bg-white border-[1.5px] border-[rgba(0,33,71,0.3)] rounded-[8px] p-4 hover:border-[rgba(0,33,71,0.6)] hover:shadow-md hover:shadow-[rgba(0,33,71,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-[rgba(0,33,71,0.4)] flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-[#002147]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#002147] mb-1" style={{ fontFamily: 'SUSE, sans-serif' }}>Email</h3>
                        <a
                          href="mailto:contact@university.edu"
                          className="text-sm md:text-base text-[#6B7280] hover:text-[#002147] transition-colors break-all"
                          style={{ fontFamily: 'SUSE, sans-serif' }}
                        >
                          contact@university.edu
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Box */}
                  <div className="bg-white border-[1.5px] border-[rgba(0,33,71,0.3)] rounded-[8px] p-4 hover:border-[rgba(0,33,71,0.6)] hover:shadow-md hover:shadow-[rgba(0,33,71,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-[rgba(0,33,71,0.4)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#002147]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.308"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#002147] mb-1" style={{ fontFamily: 'SUSE, sans-serif' }}>WhatsApp</h3>
                        <a
                          href="https://chat.whatsapp.com/JgbMinWTnaRG30yGSJP5f0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base text-[#6B7280] hover:text-[#002147] transition-colors"
                          style={{ fontFamily: 'SUSE, sans-serif' }}
                        >
                          Join Group Chat
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Instagram Box */}
                  <div className="bg-white border-[1.5px] border-[rgba(0,33,71,0.3)] rounded-[8px] p-4 hover:border-[rgba(0,33,71,0.6)] hover:shadow-md hover:shadow-[rgba(0,33,71,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-[rgba(0,33,71,0.4)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#002147]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#002147] mb-1" style={{ fontFamily: 'SUSE, sans-serif' }}>Instagram</h3>
                        <a
                          href="https://www.instagram.com/rdconclave_2026"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base text-[#6B7280] hover:text-[#002147] transition-colors"
                          style={{ fontFamily: 'SUSE, sans-serif' }}
                        >
                          @rdconclave_2026
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Student Coordinators */}
            <div className="lg:col-span-7 animate-fade-in animate-delay-100">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#002147] mb-5 text-center" style={{ fontFamily: 'SUSE, sans-serif' }}>
                  Student Coordinators
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                  {studentCoordinators.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AcademicContactWithCoordinators;