import React, { useState, useEffect } from 'react';
import { FiUser, FiBook, FiPlus, FiDownload, FiTrash2, FiSearch, FiSave, FiUpload, FiImage, FiEdit2, FiX, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

// API Service Functions
const resultService = {
  // Fetch all results with pagination and filtering
  getAllResults: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();

      const response = await fetch(import.meta.env.VITE_BASE_ALL_RESULT);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch results');
      }

      return {
        success: true,
        data: data.results,
        pagination: {
          page: data.page,
          limit: data.limit,
          total: data.total,
          pages: data.pages
        }
      };
    } catch (error) {
      console.error('Error fetching results:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Delete a result
  deleteResult: async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_ALL_RESULT}/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete result');
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error deleting result:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Update a result
  updateResult: async (id, updatedData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_UPDATE_RESULT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update result');
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error updating result:', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Export results
  exportResults: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${import.meta.env.VITE_BASE_ALL_RESULT}/export?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to export results');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'student_results.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return {
        success: true
      };
    } catch (error) {
      console.error('Error exporting results:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};

const SavedResultsSection = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [filters, setFilters] = useState({
    className: '',
    feesPaid: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [editingResult, setEditingResult] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    rollNo: '',
    className: '',
    section: '',
    fatherName: '',
    feesPaid: false,
    subjects: []
  });

  // Fetch results on component mount and when filters/page/search change
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const response = await resultService.getAllResults(
        pagination.page,
        pagination.limit,
        {
          ...filters,
          search: searchTerm
        }
      );
      
      if (response.success) {
        setResults(response.data);
        setPagination(response.pagination);
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [pagination.page, filters, searchTerm]);

  // Handle result deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      const response = await resultService.deleteResult(id);
      
      if (response.success) {
        toast.success('Result deleted successfully');
        // Refresh results after deletion
        setResults(prev => prev.filter(result => result._id !== id));
      } else {
        toast.error(response.message);
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (result) => {
    setEditingResult(result._id);
    setEditFormData({
      name: result.name,
      rollNo: result.rollNo,
      className: result.className,
      section: result.section,
      fatherName: result.fatherName,
      feesPaid: result.feesPaid,
      subjects: [...result.subjects]
    });
  };

  // Handle edit form input changes
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle subject field changes
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...editFormData.subjects];
    updatedSubjects[index][field] = field === 'marksObtained' || field === 'maxMarks' 
      ? parseInt(value) || 0 
      : value;
    
    // Calculate grade if marks are updated
    if (field === 'marksObtained' || field === 'maxMarks') {
      const percentage = (updatedSubjects[index].marksObtained / updatedSubjects[index].maxMarks) * 100;
      updatedSubjects[index].grade = calculateGrade(percentage);
    }

    setEditFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  // Simple grade calculation
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  // Handle edit form submission
  const handleEditSubmit = async (id) => {
    try {
      const response = await resultService.updateResult(id, editFormData);
      
      if (response.success) {
        toast.success('Result updated successfully');
        setResults(prev => prev.map(result => 
          result._id === id ? { ...result, ...editFormData } : result
        ));
        setEditingResult(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update result');
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingResult(null);
  };

  // Handle export
  const handleExport = async () => {
    const response = await resultService.exportResults({
      className: filters.className,
      search: searchTerm,
      feesPaid: filters.feesPaid
    });
    
    if (!response.success) {
      toast.error(response.message);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle sort
  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field ? 
        (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <FiUser className="mr-2" /> Saved Results
        </h2>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll no..."
            />
            <FiSearch className="absolute left-2 top-3 text-gray-400" />
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <FiDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>


      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fee Status</label>
          <select
            name="feesPaid"
            value={filters.feesPaid}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="true">Paid</option>
            <option value="false">Pending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiUser className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">No results found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Info
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => (
                  <React.Fragment key={result._id}>
                    {editingResult === result._id ? (
                      <tr className="bg-blue-50">
                        <td colSpan="5" className="px-4 py-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleEditFormChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                                <input
                                  type="text"
                                  name="rollNo"
                                  value={editFormData.rollNo}
                                  onChange={handleEditFormChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                <input
                                  type="text"
                                  name="className"
                                  value={editFormData.className}
                                  onChange={handleEditFormChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                                <input
                                  type="text"
                                  name="section"
                                  value={editFormData.section}
                                  onChange={handleEditFormChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                                <input
                                  type="text"
                                  name="fatherName"
                                  value={editFormData.fatherName}
                                  onChange={handleEditFormChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="feesPaid"
                                  name="feesPaid"
                                  checked={editFormData.feesPaid}
                                  onChange={handleEditFormChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="feesPaid" className="ml-2 block text-sm text-gray-700">
                                  Fees Paid
                                </label>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                              <div className="space-y-3">
                                {editFormData.subjects.map((subject, index) => (
                                  <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                                    <input
                                      type="text"
                                      value={subject.name}
                                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                      className="p-2 border rounded-md"
                                      placeholder="Subject name"
                                    />
                                    <input
                                      type="number"
                                      value={subject.marksObtained}
                                      onChange={(e) => handleSubjectChange(index, 'marksObtained', e.target.value)}
                                      className="p-2 border rounded-md"
                                      placeholder="Marks obtained"
                                    />
                                    <input
                                      type="number"
                                      value={subject.maxMarks}
                                      onChange={(e) => handleSubjectChange(index, 'maxMarks', e.target.value)}
                                      className="p-2 border rounded-md"
                                      placeholder="Max marks"
                                    />
                                    <input
                                      type="text"
                                      value={subject.grade}
                                      readOnly
                                      className="p-2 border rounded-md bg-gray-100"
                                      placeholder="Grade"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3 pt-2">
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
                              >
                                <FiX className="mr-1" /> Cancel
                              </button>
                              <button
                                onClick={() => handleEditSubmit(result._id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                              >
                                <FiCheck className="mr-1" /> Save Changes
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={result.photo?.url || 'https://via.placeholder.com/150'} 
                              alt="Student" 
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{result.name}</div>
                          <div className="text-sm text-gray-500">Roll No: {result.rollNo}</div>
                          <div className="text-sm text-gray-500">
                            {result.className} - {result.section}
                          </div>
                          <div className="text-sm text-gray-500">Father: {result.fatherName}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            {result.subjects.map((subject) => (
                              <div key={subject._id} className="flex justify-between text-sm">
                                <span className="font-medium">{subject.name}:</span>
                                <span>
                                  {subject.marksObtained}/{subject.maxMarks} ({subject.grade})
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${result.feesPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {result.feesPaid ? 'Fees Paid' : 'Fees Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(result)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <FiEdit2 className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(result._id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <FiTrash2 className="mr-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span> of{' '}
                <span className="font-medium">{pagination.total}</span> results
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                let pageNum;
                if (pagination.pages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.pages - 2) {
                  pageNum = pagination.pages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md text-sm ${pagination.page === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {pagination.pages > 5 && pagination.page < pagination.pages - 2 && (
                <span className="px-3 py-1">...</span>
              )}
              {pagination.pages > 5 && pagination.page < pagination.pages - 2 && (
                <button
                  onClick={() => handlePageChange(pagination.pages)}
                  className={`px-3 py-1 rounded-md text-sm ${pagination.page === pagination.pages ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {pagination.pages}
                </button>
              )}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page === pagination.pages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedResultsSection;