import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { getActiveAnnouncements } from '../api/upload';

export default function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getActiveAnnouncements();
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };

    fetchAnnouncements();
    
    // Check localStorage for dismissed announcements
    const dismissed = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
    setDismissedAnnouncements(dismissed);
  }, []);

  const handleClose = () => {
    if (announcements[currentIndex]) {
      const newDismissed = [...dismissedAnnouncements, announcements[currentIndex]._id];
      setDismissedAnnouncements(newDismissed);
      localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissed));
    }
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentIndex < announcements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsVisible(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];
  
  // Skip if this announcement was dismissed
  if (dismissedAnnouncements.includes(currentAnnouncement._id)) {
    return null;
  }

  return (
    <div className="fixed top-32 right-4 md:w-96 w-80 bg-white shadow-lg rounded-lg z-50 border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">
            {currentAnnouncement.title}
            {currentAnnouncement.isImportant && (
              <span className="ml-2 text-red-500 text-sm">IMPORTANT</span>
            )}
          </h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>
        
        <p className="mb-4">{currentAnnouncement.description}</p>
        
        {currentAnnouncement.attachmentUrl && (
          <a 
            href={currentAnnouncement.attachmentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Attachment
          </a>
        )}
        
        <div className="flex justify-between mt-4">
          {currentIndex > 0 && (
            <button 
              onClick={handlePrev}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          
          <div className="flex-grow text-center">
            {currentIndex + 1} of {announcements.length}
          </div>
          
          <button 
            onClick={handleNext}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentIndex < announcements.length - 1 ? 'Next' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}