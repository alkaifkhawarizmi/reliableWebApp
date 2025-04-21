import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { submitApplication } from '../api/applicationApi';
import { getVacancyById } from '../api/upload';

export default function ApplyNowPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [vacancy, setVacancy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch vacancy details
  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await getVacancyById(id);
        setVacancy(response.data);
      } catch (error) {
        toast.error('Failed to load vacancy details');
      }
    };
    fetchVacancy();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Validate file type (PDF or DOC)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(e.target.files[0].type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      // Validate file size (5MB max)
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      toast.error('Please fill all required fields');
      return;
    }

    const data = new FormData();
    data.append('vacancyId', id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('coverLetter', formData.coverLetter);
    data.append('resume', formData.resume);

    try {
      setIsSubmitting(true);
      await submitApplication(data);
      toast.success('Application submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
      });
    } catch (error) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vacancy) return <div className="text-center py-8">Loading vacancy details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Apply for: {vacancy.position}</h2>
      <p className="text-gray-600 mb-6">{vacancy.department} • {vacancy.location}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Resume* (PDF/DOC)</label>
            <div className="flex items-center">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                <FiUpload className="mr-2" />
                {formData.resume ? formData.resume.name : 'Upload Resume'}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </label>
              {formData.resume && (
                <span className="ml-2 text-sm">{formData.resume.name}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={6}
            className="w-full p-2 border rounded"
            placeholder="Tell us why you'd be a good fit for this position..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}