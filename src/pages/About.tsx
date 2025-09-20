import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About the Artist</h1>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to my artistic journey. I'm passionate about creating original paintings that 
                capture the beauty and emotion of life's precious moments. Each piece is carefully 
                crafted with love and attention to detail.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With over 15 years of experience in oil painting, I specialize in landscapes, portraits, 
                and abstract compositions. My work is inspired by nature, human connection, and the 
                interplay of light and shadow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  View My Work
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors">
                  Commission a Piece
                </button>
              </div>
            </div>
            
            {/* Artist Photo Placeholder */}
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Artist Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Artistic Journey</h2>
            <p className="text-lg text-gray-600">Milestones and achievements throughout my career</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Years Experience</div>
              <p className="text-gray-600">Dedicated to perfecting the craft of oil painting</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Paintings Created</div>
              <p className="text-gray-600">Each piece tells a unique story</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Happy Collectors</div>
              <p className="text-gray-600">Trusted by art enthusiasts worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Creative Process</h2>
            <p className="text-lg text-gray-600">From inspiration to finished masterpiece</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Inspiration", desc: "Finding beauty in everyday moments" },
              { step: "2", title: "Sketching", desc: "Capturing the initial vision on paper" },
              { step: "3", title: "Painting", desc: "Bringing the vision to life with oils" },
              { step: "4", title: "Finishing", desc: "Adding final details and varnishing" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-600">
                Interested in commissioning a piece or have questions about my work?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Mail className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">hello@artgallery.com</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Phone className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Studio</h3>
                <p className="text-gray-600">Artist Studio Address</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}