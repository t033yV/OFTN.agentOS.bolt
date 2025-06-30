import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Camera, Building2, Smartphone, Globe, Star } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header with Bolt Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/black_circle_360x360.png" 
              alt="Powered by Bolt" 
              className="w-10 h-10"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Powered by Bolt</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 pt-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">WhatsApp Native Solution</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-orange-500 bg-clip-text text-transparent mb-6">
              OFTN: AgentOS
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform anonymous social media posts into <span className="font-semibold text-blue-600">professional identity cards</span> and <span className="font-semibold text-teal-600">stunning galleries</span> via WhatsApp
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/chat" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start WhatsApp Demo
            </Link>
            <Link 
              to="/card" 
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              Create Card Now
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Professional Cards Created</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">User Trust Increase</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">WhatsApp Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Perfect For Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Young Adults</h3>
              <p className="text-gray-600 mb-4">Students, freelancers, and emerging professionals building their personal brand on social media.</p>
              <div className="text-sm text-blue-600 font-semibold">• Event photographers • Tutors • Freelance designers</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Professional Workers</h3>
              <p className="text-gray-600 mb-4">Skilled professionals who need to showcase their expertise and build client trust.</p>
              <div className="text-sm text-teal-600 font-semibold">• Photographers • Real estate agents • Consultants</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Small Businesses</h3>
              <p className="text-gray-600 mb-4">Companies looking to enhance their social media presence with professional branding.</p>
              <div className="text-sm text-orange-600 font-semibold">• Local services • Retail stores • Car dealerships</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Smartphone className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">WhatsApp Native</h3>
              <p className="text-gray-600">Built specifically for WhatsApp sharing with optimal formatting and mobile experience.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">Multi-Language Support</h3>
              <p className="text-gray-600">Supports English, Malay, and Tagalog with automatic localization based on location.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Star className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">AI-Powered Refinement</h3>
              <p className="text-gray-600">Pica agents automatically improve vague descriptions into professional content.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Camera className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">Media Gallery</h3>
              <p className="text-gray-600">Upload up to 3 photos to create stunning portfolio galleries with microsite hosting.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <MessageCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">Instant Cards</h3>
              <p className="text-gray-600">Generate professional identity cards in under 500 characters, perfect for WhatsApp.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Building2 className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-lg font-bold mb-3 text-gray-800">Business Ready</h3>
              <p className="text-gray-600">Professional templates suitable for personal branding and business promotion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-teal-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Social Media Presence?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of professionals who've upgraded from anonymous posts to branded excellence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/chat" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try WhatsApp Demo
            </Link>
            <Link 
              to="/card" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Create Your Card
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold">OFTN: AgentOS</span>
          </div>
          <p className="text-gray-400 mb-6">Professional identity cards and galleries for the WhatsApp generation</p>
          <div className="text-sm text-gray-500">
            © 2025 OFTN: AgentOS. Powered by Twilio, Pica, Lingo, and Netlify.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;