import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, ExternalLink, Upload, X } from 'lucide-react';

interface FormData {
  name: string;
  role: string;
  city: string;
  availability: string;
  whatsapp: string;
  bio: string;
  services: string;
  photos: File[];
}

const CardGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    city: '',
    availability: '',
    whatsapp: '',
    bio: '',
    services: '',
    photos: []
  });
  const [showCard, setShowCard] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...files].slice(0, 3) 
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...files].slice(0, 3) 
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const generateCard = () => {
    setShowCard(true);
  };

  const generateCardText = () => {
    const username = formData.name.toLowerCase().replace(/\s+/g, '');
    const servicesList = formData.services.split(',').map(s => s.trim()).filter(s => s);
    
    return `🌟 **OFTN: AgentOS Card** 🌟
**${formData.name}**
**Role**: ${formData.role}
📍 **${formData.city}**
🕒 **Availability**: ${formData.availability}
📞 **WhatsApp**: ${formData.whatsapp}
📝 ${formData.bio}
💼 **Services**: ${servicesList.join(', ')}
✅ Visit ${username}.agentos.my.id (Gallery!)`;
  };

  const generateCondensedBio = () => {
    const username = formData.name.toLowerCase().replace(/\s+/g, '');
    const servicesList = formData.services.split(',').map(s => s.trim()).filter(s => s);
    
    return `${formData.name}, ${formData.role} 📍 ${formData.city} 🕒 ${formData.availability} 📞 ${formData.whatsapp} | ${servicesList.join(', ')} 🔗 See gallery at ${username}.agentos.my.id #AgentOSCard`;
  };

  const isFormValid = formData.name && formData.role && formData.city && formData.availability && formData.whatsapp && formData.bio && formData.services;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Create Professional Card</h1>
            <p className="text-sm text-gray-600">Generate your WhatsApp-ready identity card</p>
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showCard ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Siti Nur Ahmad"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role/Profession *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Student Photographer, Real Estate Agent"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City/Area *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Penang, Kuala Lumpur"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., Evenings, 9 AM–5 PM"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="e.g., +60-XXX-XXX-XXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio/Description *</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="2–3 sentences about yourself or your services"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services/Skills *</label>
                  <input
                    type="text"
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    placeholder="e.g., Event photography, Portraits, Editing"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple services with commas</p>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery Photos</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag & drop photos here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse (max 3 photos)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer inline-block"
                >
                  Choose Photos
                </label>
              </div>

              {/* Photo Previews */}
              {formData.photos.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Uploaded Photos ({formData.photos.length}/3)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={generateCard}
                  disabled={!isFormValid}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Generate Professional Card
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Generated Card Display */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Professional Card</h2>
                <p className="text-gray-600">Ready to share on WhatsApp</p>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                <div className="text-sm font-mono whitespace-pre-line text-gray-800 leading-relaxed">
                  {generateCardText()}
                </div>
                <div className="text-xs text-gray-500 mt-4 text-right">
                  {generateCardText().length} characters • WhatsApp optimized
                </div>
              </div>

              {/* Condensed Bio */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-3">Condensed Bio for Social Sharing:</h4>
                <p className="text-sm text-yellow-700 font-mono leading-relaxed">
                  {generateCondensedBio()}
                </p>
                <div className="text-xs text-yellow-600 mt-2">
                  {generateCondensedBio().length} characters
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Save Card
                </button>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share WhatsApp
                </button>
                <Link
                  to={`/microsite/${formData.name.toLowerCase().replace(/\s+/g, '')}`}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Microsite
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCard(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Edit Information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGenerator;