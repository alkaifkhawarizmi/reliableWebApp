import React, { useState } from "react";
import axios from "axios";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { uploadStudentResult } from "../../api/upload.js";

const AddResult = () => {
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    fatherName: "",
    motherName: "",
    dob: "",
    totalPresentDays: "",
    promotedToNextClass: false,
    feesPaid: false,
    subjects: [
      {
        name: "English",
        annualExam: { obtained: "", total: "" },
        grade: ""
      },
      {
        name: "Hindi",
        annualExam: { obtained: "", total: "" },
        grade: ""
      },
    ],
    coScholasticAreas: [],
    photo: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentStudent((prevStudent) => ({
      ...prevStudent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubjectChange = (index, field, subfield, value) => {
    const newSubjects = [...currentStudent.subjects];
    if (subfield) {
      newSubjects[index][field][subfield] = value;
    } else {
      newSubjects[index][field] = value;
    }

    if (field === "annualExam" && subfield === "obtained") {
      newSubjects[index].grade = calculateGrade(value);
    }

    setCurrentStudent({ ...currentStudent, subjects: newSubjects });
  };

  const handleCoScholasticChange = (index, field, value) => {
    const newAreas = [...currentStudent.coScholasticAreas];
    if (!newAreas[index]) {
      newAreas[index] = { name: "", grade: "" };
    }
    newAreas[index][field] = value;
    setCurrentStudent({ ...currentStudent, coScholasticAreas: newAreas });
  };

  const calculateGrade = (marks) => {
    const mark = parseFloat(marks);
    if (mark >= 91) return "A+";
    if (mark >= 81) return "A";
    if (mark >= 71) return "B";
    if (mark >= 61) return "C";
    if (mark >= 51) return "D";
    if (mark >= 41) return "E";
    if (mark >= 33) return "F";
    return "X";
  };

  const addSubject = () => {
    setCurrentStudent((prevStudent) => ({
      ...prevStudent,
      subjects: [
        ...prevStudent.subjects,
        { name: "", annualExam: { obtained: "", total: "" }, grade: "" },
      ],
    }));
  };

  const addCoScholasticArea = () => {
    setCurrentStudent((prevStudent) => ({
      ...prevStudent,
      coScholasticAreas: [...prevStudent.coScholasticAreas, { name: "", grade: "" }],
    }));
  };

  const removeSubject = (index) => {
    const updatedSubjects = [...currentStudent.subjects];
    updatedSubjects.splice(index, 1);
    setCurrentStudent({ ...currentStudent, subjects: updatedSubjects });
  };

  const removeCoScholasticArea = (index) => {
    const updatedAreas = [...currentStudent.coScholasticAreas];
    updatedAreas.splice(index, 1);
    setCurrentStudent({ ...currentStudent, coScholasticAreas: updatedAreas });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentStudent({ ...currentStudent, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const saveStudent = async () => {
    try {
      const formData = new FormData();
      
      // Append student data
      formData.append("name", currentStudent.name);
      formData.append("rollNo", currentStudent.rollNo);
      formData.append("className", currentStudent.className);
      formData.append("section", currentStudent.section);
      formData.append("fatherName", currentStudent.fatherName);
      formData.append("motherName", currentStudent.motherName);
      formData.append("dob", currentStudent.dob);
      formData.append("totalPresentDays", currentStudent.totalPresentDays);
      formData.append("promotedToNextClass", currentStudent.promotedToNextClass);
      formData.append("feesPaid", currentStudent.feesPaid);
      
      // Append subjects
      formData.append("subjects", JSON.stringify(currentStudent.subjects.map(sub => ({
        name: sub.name,
        annualExam: {
          obtained: isNaN(parseFloat(sub.annualExam.obtained)) ? 0 : parseFloat(sub.annualExam.obtained),
          total: isNaN(parseFloat(sub.annualExam.total)) ? 0 : parseFloat(sub.annualExam.total),
        },
        grade: sub.grade
      }))));
      
      // Append co-scholastic areas
      formData.append("coScholasticAreas", JSON.stringify(currentStudent.coScholasticAreas));
      
      // Append photo if exists
      if (currentStudent.photo) {
        formData.append("photo", currentStudent.photo);
      }

      const response = await uploadStudentResult(currentStudent);
      console.log("Student saved:", response);
      alert("Student result saved successfully!");
      
      // Reset form
      setCurrentStudent({
        name: "",
        rollNo: "",
        className: "",
        section: "",
        fatherName: "",
        motherName: "",
        dob: "",
        totalPresentDays: "",
        promotedToNextClass: false,
        feesPaid: false,
        subjects: [
          {
            name: "English",
            annualExam: { obtained: "", total: "" },
            grade: ""
          },
          {
            name: "Hindi",
            annualExam: { obtained: "", total: "" },
            grade: ""
          },
        ],
        coScholasticAreas: [],
        photo: null
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Error saving student.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Student Result</h2>
      
      {/* Student Basic Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              name="name"
              value={currentStudent.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={currentStudent.rollNo}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <input
              type="text"
              name="className"
              value={currentStudent.className}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <input
              type="text"
              name="section"
              value={currentStudent.section}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={currentStudent.fatherName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={currentStudent.motherName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={currentStudent.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Present Days</label>
            <input
              type="number"
              name="totalPresentDays"
              value={currentStudent.totalPresentDays}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="promotedToNextClass"
              checked={currentStudent.promotedToNextClass}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Promoted to Next Class</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="feesPaid"
              checked={currentStudent.feesPaid}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Fees Paid</label>
          </div>
        </div>
      </div>
      
      {/* Student Photo Upload */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Student Photo</h3>
        <div className="flex items-center">
          <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md tracking-wide border border-blue cursor-pointer hover:bg-blue-50">
            <FiUpload className="text-blue-500 text-2xl mb-2" />
            <span className="text-sm text-gray-700">Choose a photo</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          {previewImage && (
            <div className="ml-4">
              <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
            </div>
          )}
        </div>
      </div>
      
      {/* Subjects */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Subjects</h3>
        <table className="w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Annual Exam - Marks</th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Grade</th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudent.subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(index, "name", null, e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className="space-y-2">
                    <input
                      type="number"
                      value={subject.annualExam.obtained}
                      onChange={(e) => handleSubjectChange(index, "annualExam", "obtained", e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Obtained"
                    />
                    <input
                      type="number"
                      value={subject.annualExam.total}
                      onChange={(e) => handleSubjectChange(index, "annualExam", "total", e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Total"
                    />
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={subject.grade}
                    className="w-full p-2 border rounded-md bg-gray-50"
                    readOnly
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addSubject}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Subject
        </button>
      </div>
      
      {/* Co-Scholastic Areas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Co-Scholastic Areas</h3>
        <table className="w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Area</th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Grade</th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudent.coScholasticAreas.map((area, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={area.name || ""}
                    onChange={(e) => handleCoScholasticChange(index, "name", e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Area name"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={area.grade || ""}
                    onChange={(e) => handleCoScholasticChange(index, "grade", e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Grade"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => removeCoScholasticArea(index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {currentStudent.coScholasticAreas.length === 0 && (
              <tr>
                <td colSpan="3" className="border px-4 py-2 text-center text-gray-500">
                  No co-scholastic areas added
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={addCoScholasticArea}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Co-Scholastic Area
        </button>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveStudent}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Save Result
        </button>
      </div>
    </div>
  );
};

export default AddResult;
