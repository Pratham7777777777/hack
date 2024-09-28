import React, { useState } from 'react';

// Mock data for study materials
const mockMaterials = [
  { id: 1, title: 'Introduction to React', subject: 'Web Development', rating: 4.5, downloads: 1200, views: 5000 },
  { id: 2, title: 'Advanced Calculus', subject: 'Mathematics', rating: 4.2, downloads: 800, views: 3500 },
  { id: 3, title: 'World History: 20th Century', subject: 'History', rating: 4.7, downloads: 1500, views: 6000 },
  { id: 4, title: 'Organic Chemistry Basics', subject: 'Chemistry', rating: 4.0, downloads: 1000, views: 4200 },
  { id: 5, title: 'Introduction to Psychology', subject: 'Psychology', rating: 4.8, downloads: 2000, views: 7500 },
];

const MaterialCard = ({ material }) => (
  <div className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg">
    <div className="flex items-center mb-2">
      <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <h3 className="text-lg font-semibold">{material.title}</h3>
    </div>
    <p className="text-gray-600 mb-2">{material.subject}</p>
    <div className="flex items-center text-yellow-500 mb-2">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{material.rating.toFixed(1)}</span>
    </div>
    <div className="flex justify-between text-gray-500 text-sm">
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>{material.downloads}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{material.views}</span>
      </div>
    </div>
    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
      View Material
    </button>
  </div>
);

export default function ELibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState(['Web Development', 'Mathematics']);

  // Filter materials based on search term
  const filteredMaterials = mockMaterials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple recommendation system
  const recommendedMaterials = mockMaterials
    .filter(material => userPreferences.includes(material.subject))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const recentUploads = [...mockMaterials].sort((a, b) => b.id - a.id).slice(0, 3);
  const popularMaterials = [...mockMaterials].sort((a, b) => b.downloads - a.downloads).slice(0, 3);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">E-Library</h1>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors">Dashboard</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors">My Materials</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors">Favorites</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Search and Upload */}
          <div className="flex justify-between mb-8">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
              onClick={() => setUploadModalOpen(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Material
            </button>
          </div>

          {/* Recommended Materials */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </section>

          {/* Recent Uploads */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentUploads.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </section>

          {/* Popular Materials */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Popular Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Upload Material</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission here
              setUploadModalOpen(false);
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                  File
                </label>
                <input
                  type="file"
                  id="file"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
                  onClick={() => setUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}