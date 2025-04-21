import React, { useState } from "react";
import {
  FiUser,
  FiBook,
  FiPlus,
  FiDownload,
  FiTrash2,
  FiSearch,
  FiSave,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { uploadStudentResult } from "../../api/upload";
import SavedResultsSection from "./SavedResult";

export default function StudentForm() {
  const [result, setResult] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    fatherName: "",
    photo: null, // Added photo field
    subjects: [
      { name: "Mathematics", maxMarks: 100, marksObtained: "", grade: "" },
      { name: "Science", maxMarks: 100, marksObtained: "", grade: "" },
      { name: "English", maxMarks: 100, marksObtained: "", grade: "" },
    ],
    feesPaid: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Loading state

  const calculateGrade = (marks, maxMarks) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentStudent({
          ...currentStudent,
          photo: {
            file,
            preview: event.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const newSubjects = [...currentStudent.subjects];
    newSubjects[index][name] = value;

    if (name === "marksObtained") {
      const marks = parseInt(value) || 0;
      const maxMarks = parseInt(newSubjects[index].maxMarks) || 100;
      if (marks > maxMarks) {
        toast.error("Marks obtained cannot be greater than maximum marks");
        return;
      }
      newSubjects[index].grade = calculateGrade(marks, maxMarks);
    }

    setCurrentStudent({ ...currentStudent, subjects: newSubjects });
  };

  const addSubject = () => {
    setCurrentStudent({
      ...currentStudent,
      subjects: [
        ...currentStudent.subjects,
        { name: "", maxMarks: 100, marksObtained: "", grade: "" },
      ],
    });
  };

  const removeSubject = (index) => {
    if (currentStudent.subjects.length <= 1) {
      toast.error("At least one subject is required");
      return;
    }
    const newSubjects = [...currentStudent.subjects];
    newSubjects.splice(index, 1);
    setCurrentStudent({ ...currentStudent, subjects: newSubjects });
  };

  const toggleFeesStatus = () => {
    setCurrentStudent({
      ...currentStudent,
      feesPaid: !currentStudent.feesPaid,
    });
  };

  const saveStudent = async () => {
    try {
      // Validate required fields
      if (
        !currentStudent.name ||
        !currentStudent.rollNo ||
        !currentStudent.className
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate subjects
      for (const subject of currentStudent.subjects) {
        if (!subject.name || !subject.marksObtained) {
          toast.error("Please fill all subject fields");
          return;
        }
      }

      setIsUploading(true); // Start loading

      // Call the API function
      const res = await uploadStudentResult(currentStudent);

      console.log(res);

      if (!res.success) {
        toast.error(res.data.msg);
        return;
      }

      // Reset form and update state
      setResult([...result, currentStudent]);
      toast.success("Result uploaded successfully!");

      // Reset form
      setCurrentStudent({
        name: "",
        rollNo: "",
        className: "",
        section: "",
        fatherName: "",
        photo: null,
        subjects: [
          { name: "Mathematics", maxMarks: 100, marksObtained: "", grade: "" },
          { name: "Science", maxMarks: 100, marksObtained: "", grade: "" },
          { name: "English", maxMarks: 100, marksObtained: "", grade: "" },
        ],
        feesPaid: false,
      });
    } catch (error) {
      console.error("Error in saveStudent:", error);
      toast.error(error.response?.data?.msg || "Failed to upload result");
    } finally {
      setIsUploading(false); // Stop loading regardless of success/failure
    }
  };
  

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiUser className="mr-2" /> Student Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Student Photo Upload */}
          <div className="form-group col-span-1 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1">
              Student Photo
            </label>
            <div className="flex items-center">
              <div className="relative w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden mr-4">
                {currentStudent.photo?.preview ? (
                  <img
                    src={currentStudent.photo.preview}
                    alt="Student preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FiImage className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                <FiUpload className="mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Student Name*
            </label>
            <input
              type="text"
              name="name"
              value={currentStudent.name}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Father Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={currentStudent.fatherName}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Father name"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Roll Number*
            </label>
            <input
              type="text"
              name="rollNo"
              value={currentStudent.rollNo}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter roll number"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Class/Grade*
            </label>
            <input
              type="text"
              name="className"
              value={currentStudent.className}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter class/grade"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Section</label>
            <input
              type="text"
              name="section"
              value={currentStudent.section}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter section (optional)"
            />
          </div>

          <div className="form-group flex items-end">
            <label className="block text-sm font-medium mb-1 mr-4">
              Fees Status
            </label>
            <button
              type="button"
              onClick={toggleFeesStatus}
              className={`px-4 py-2 rounded-md text-white ${
                currentStudent.feesPaid ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {currentStudent.feesPaid ? "Paid" : "Unpaid"}
            </button>
          </div>
        </div>

        {/* Rest of your form remains the same */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiBook className="mr-2" /> Subjects & Marks
        </h2>

        {currentStudent.subjects.map((subject, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Subject Name*
              </label>
              <input
                type="text"
                name="name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Subject name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Max Marks
              </label>
              <input
                type="number"
                name="maxMarks"
                value={subject.maxMarks}
                onChange={(e) => handleSubjectChange(index, e)}
                className="w-full p-2 border rounded-md"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Marks Obtained*
              </label>
              <input
                type="number"
                name="marksObtained"
                value={subject.marksObtained}
                onChange={(e) => handleSubjectChange(index, e)}
                className="w-full p-2 border rounded-md"
                min="0"
                max={subject.maxMarks}
                placeholder={`0-${subject.maxMarks}`}
                required
              />
            </div>

            <div className="flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Grade</label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {subject.grade || "-"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addSubject}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add Subject
          </button>

          <button
            type="button"
            onClick={saveStudent}
            disabled={isUploading}
            className={`flex items-center px-6 py-2 text-white rounded-md ${
              isUploading
                ? "bg-green-700 opacity-75"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                Upload Result
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result List */}
      <SavedResultsSection />
    </div>
  );
}
