import { useEffect, useState } from "react";
import { FaSchool, FaCamera, FaSearch, FaHeart, FaShare } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Gallery({ mediaData = [] }) {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false since we have initial data
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize gallery data directly from props
  useEffect(() => {
    if (mediaData && mediaData.length > 0) {
      const galleryItems = mediaData.filter((item) => item.mediaType === "gallery");
      setFilteredData(galleryItems);
    }
  }, [mediaData]);

  // Handle search functionality
  useEffect(() => {
    if (!mediaData || mediaData.length === 0) return;

    if (searchTerm.trim() === "") {
      const galleryItems = mediaData.filter((item) => item.mediaType === "gallery");
      setFilteredData(galleryItems);
    } else {
      const filtered = mediaData.filter(item =>
        item.mediaType === "gallery" && (
          (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.uploadedAt && item.uploadedAt.toLowerCase().includes(searchTerm.toLowerCase()))
      ))
      setFilteredData(filtered);
    }
  }, [searchTerm, mediaData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-xl text-gray-700">Loading school memories...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <section className="py-16 pt-28 px-4 md:px-8">
        {/* Decorative elements */}
        <FaSchool className="absolute top-20 left-10 text-blue-200 text-4xl opacity-30" />
        <FaCamera className="absolute bottom-20 right-10 text-yellow-200 text-5xl opacity-30" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <FaCamera className="mr-3 text-blue-500" /> 
              School <span className="text-blue-600 ml-2">Gallery</span>
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore moments of learning, achievements, and celebrations from our school community.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gallery..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Showing {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div 
                  key={item.id || item._id}  // Use _id if id doesn't exist
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Gallery image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg">{item.title || "Untitled"}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{item.description || ""}</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.uploadedAt || "No date"}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-red-500 transition-colors">
                        <FaHeart />
                      </button>
                      <span className="text-sm">{item.likes || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">
                  {mediaData.length === 0 ? "No gallery items available" : "No images found matching your search."}
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")} 
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button 
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-blue-300 transition-colors"
            >
              &times;
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || "Gallery image"}
                className="w-full max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
                }}
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedImage.title || "Untitled"}</h3>
                    <p className="text-gray-500">{selectedImage.uploadedAt || "No date"}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-700 hover:text-blue-500 transition-colors">
                      <FaHeart className="mr-1" /> {selectedImage.likes || 0}
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-blue-500 transition-colors">
                      <FaShare className="mr-1" /> Share
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700">{selectedImage.description || ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}