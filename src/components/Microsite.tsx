import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, MapPin, Clock, Phone, Star, ExternalLink } from 'lucide-react';

const Microsite = () => {
  const { username } = useParams();
  
  // Demo data - in real app, this would come from database
  const demoData = {
    name: "Siti Nur Ahmad",
    role: "Student Photographer",
    city: "Penang",
    availability: "Evenings & weekends",
    whatsapp: "+60-XXX-XXX-XXXX",
    bio: "Creative student photographer capturing vibrant events in Penang. Specializing in memorable moments with artistic flair.",
    services: ["Event Photography", "Portrait Sessions", "Photo Editing"],
    rating: 4.9,
    completedProjects: 47,
    photos: [
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">{username}.agentos.my.id</h1>
            <p className="text-sm text-gray-600">Professional Microsite</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-green-600">● Online</div>
              <div className="text-xs text-gray-500">Powered by OFTN</div>
            </div>
            <a 
              href="https://bolt.new/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/black_circle_360x360.png" 
                alt="Powered by Bolt" 
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-orange-500 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="absolute -top-16 left-8">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {demoData.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
            
            <div className="pt-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{demoData.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{demoData.role}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {demoData.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {demoData.availability}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {demoData.rating} ({demoData.completedProjects} projects)
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${demoData.whatsapp.replace(/[^0-9]/g, '')}`}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${demoData.whatsapp}`}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{demoData.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
              <div className="space-y-3">
                {demoData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{demoData.rating}/5.0</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-semibold">{demoData.completedProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold text-green-600">{"< 2 hours"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Portfolio Gallery</h2>
                <span className="text-sm text-gray-500">{demoData.photos.length} photos</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {demoData.photos.map((photo, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-lg">
                    <img
                      src={photo}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Features Preview */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upgrade to Pro</h3>
                  <p className="text-sm text-gray-600 mb-4">Add video introductions, unlimited photos, and custom branding</p>
                </div>
                <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Upgrade for $4.99/month
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-lg opacity-90 mb-6">Contact {demoData.name} directly via WhatsApp for inquiries and bookings</p>
          <a
            href={`https://wa.me/${demoData.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${demoData.name.split(' ')[0]},%20I%20saw%20your%20profile%20on%20AgentOS%20and%20I'm%20interested%20in%20your%20services.`}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Send WhatsApp Message
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p className="text-sm">
            Powered by <span className="font-semibold text-blue-600">OFTN: AgentOS</span> • 
            Professional identity cards and galleries for the WhatsApp generation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Microsite;