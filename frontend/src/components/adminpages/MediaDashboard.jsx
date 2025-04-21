import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../Navbar";
import { deleteMedia, uploadMedia } from "../../api/upload";
import { gettAllMedia } from '../../api/fetchData';

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gallery");
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("gallery");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  const filteredMedia = media.filter(item => 
    activeTab === "all" ? true : item.type === activeTab
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("principalAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else {
      // Simulate API call
      setTimeout(() => {
        const fetchMedia = async () => {
          const media = await gettAllMedia()
          console.log(media)
          setMedia(media.media)
        }
        fetchMedia() 
        setIsLoading(false);
      }, 1000);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("principalAuth");
    navigate("/admin/login");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !type || (!imageFile && !currentMedia?.imageUrl)) {
      alert("Please provide all required fields.");
      return;
    }

    try {
      setIsUploading(true);
      const response = await uploadMedia({
        mediaType: type,
        title: title,
        image: imageFile
      });
      
      if (response?.success) {
        setIsModalOpen(false);
        resetForm();
        // Refresh media list
        const updatedMedia = await gettAllMedia();
        setMedia(updatedMedia.media);
      } else {
        throw new Error(response?.message || "Upload failed");
      }
    } catch (error) {
      console.error(`Error ${currentMedia ? "updating" : "uploading"} media:`, error);
      alert(error.message || `An error occurred during ${currentMedia ? "update" : "upload"}.`);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setCurrentMedia(null);
    setTitle("");
    setType("gallery");
    setImageFile(null);
  };

  const handleEditMedia = (media) => {
    setCurrentMedia(media);
    setTitle(media.title);
    setType(media.type);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDeleteMedia = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        setIsDeleting(true);
        setDeletingId(id);
        
        await deleteMedia(id);
        
        // Refresh media list
        const updatedMedia = await gettAllMedia();
        setMedia(updatedMedia.media);
      } catch (error) {
        console.error("Error deleting media:", error);
        alert("An error occurred while deleting.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
      <Navbar />
        <div className="pt-20">
        {/* <button
            onClick={handleLogout}
            className="inline-flex absolute z-40 right-12 top-32 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button> */}
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Media Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage student gallery, banners, and other media
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All Media
                </button>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === "gallery"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Student Gallery
                </button>
                <button
                  onClick={() => setActiveTab("banner")}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === "banner"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Banners
                </button>
              </nav>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {activeTab === "all"
                    ? "All Media"
                    : activeTab === "gallery"
                    ? "Student Gallery"
                    : "Banners"}
                </h2>
                <button
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Media
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : media.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No media items found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {media.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
                    >
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.uploadedAt}
                        </p>
                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={() => handleEditMedia(item)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaEdit className="-ml-0.5 mr-2 h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMedia(item._id)}
                            disabled={isDeleting && deletingId === item._id}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-75"
                          >
                            {isDeleting && deletingId === item._id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FaTrash className="-ml-0.5 mr-2 h-4 w-4" />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {currentMedia ? "Edit Media" : "Add New Media"}
              </h3>
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Media Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="gallery">Student Gallery</option>
                    <option value="banner">Banner</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {currentMedia?.imageUrl && !imageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Current image:</p>
                      <img
                        src={currentMedia.imageUrl}
                        alt="Current"
                        className="h-20 object-contain mt-1"
                      />
                    </div>
                  )}
                  {imageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">New image:</p>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="h-20 object-contain mt-1"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 sm:col-start-2 sm:text-sm disabled:opacity-75"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {currentMedia ? "Updating..." : "Uploading..."}
                      </>
                    ) : (
                      currentMedia ? "Update" : "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isUploading}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-75"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalDashboard;