import React, { useState } from 'react';
import { FiUpload, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { createAnnouncement } from '../../api/upload';
import Navbar from '../Navbar';

export default function AnnouncementForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isImportant: false,
    expiryDate: ''
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('isImportant', formData.isImportant);
    data.append('expiryDate', formData.expiryDate);
    if (file) data.append('attachment', file);

    try {
      setIsSubmitting(true);
      await createAnnouncement(data);
      toast.success('Announcement created successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        isImportant: false,
        expiryDate: ''
      });
      setFile(null);
    } catch (error) {
      toast.error(error.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Announcement</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isImportant"
            checked={formData.isImportant}
            onChange={handleChange}
            id="important"
            className="mr-2"
          />
          <label htmlFor="important" className="font-medium">
            Mark as important
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Attachment</label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
              <FiUpload className="mr-2" />
              {file ? file.name : 'Choose File'}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">↻</span>
              Publishing...
            </>
          ) : (
            <>
              <FiSave className="mr-2" />
              Publish Announcement
            </>
          )}
        </button>
      </form>
    </div>
  );
}