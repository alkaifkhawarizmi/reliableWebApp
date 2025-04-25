import React, { useState } from "react";
import { FiUser, FiBook, FiPlus, FiTrash2, FiSave, FiUpload, FiImage, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { uploadStudentResult } from "../../api/upload";
import SavedResultsSection from "./SavedResult";

export default function StudentForm() {
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    fatherName: "",
    motherName: "",
    dob: "",
    admissionNo: "",
    photo: null,
    totalPresentDays: 0,
    promotedToNextClass: false,
    subjects: [
      { name: "English", halfYearly: "", annualExam: "", grade: "" },
      { name: "Hindi", halfYearly: "", annualExam: "", grade: "" },
    ],
    coScholasticAreas: [
      { area: "Work & Art Education", grade: "", remarks: "" },
      { area: "Health & Physical Education", grade: "", remarks: "" },
      { area: "Discipline", grade: "", remarks: "" },
    ],
    feesPaid: false,
  });

  const [isUploading, setIsUploading] = useState(false);

  const calculateGrade = (marks) => {
    const numericMarks = parseFloat(marks) || 0;
    if (numericMarks >= 91) return "A1";
    if (numericMarks >= 81) return "A2";
    if (numericMarks >= 71) return "B1";
    if (numericMarks >= 61) return "B2";
    if (numericMarks >= 51) return "C1";
    if (numericMarks >= 41) return "C2";
    if (numericMarks >= 33) return "D";
    return "E";
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
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
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...currentStudent.subjects];
    newSubjects[index][field] = value;

    if (field === "annualExam") {
      newSubjects[index].grade = calculateGrade(value);
    }

    setCurrentStudent({ ...currentStudent, subjects: newSubjects });
  };

  const handleCoScholasticChange = (index, field, value) => {
    const newCoScholasticAreas = [...currentStudent.coScholasticAreas];
    newCoScholasticAreas[index][field] = value;
    setCurrentStudent({
      ...currentStudent,
      coScholasticAreas: newCoScholasticAreas,
    });
  };

  const addSubject = () => {
    setCurrentStudent({
      ...currentStudent,
      subjects: [
        ...currentStudent.subjects,
        { name: "", halfYearly: "", annualExam: "", grade: "" },
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

  const togglePromotionStatus = () => {
    setCurrentStudent({
      ...currentStudent,
      promotedToNextClass: !currentStudent.promotedToNextClass,
    });
  };

  const saveStudent = async () => {
    try {
      if (!currentStudent.name || !currentStudent.rollNo || !currentStudent.className) {
        toast.error("Please fill all required fields");
        return;
      }

      for (const subject of currentStudent.subjects) {
        if (!subject.name || !subject.annualExam) {
          toast.error("Please fill all subject fields");
          return;
        }
      }

      setIsUploading(true);


      const res = await uploadStudentResult(currentStudent);
      if (!res.success) throw new Error(res.data?.msg || "Upload failed");

      toast.success("Result uploaded successfully!");
      setCurrentStudent({
        ...currentStudent,
        name: "",
        rollNo: "",
        className: "",
        subjects: currentStudent.subjects.map(sub => ({
          name: sub.name,
          halfYearly: "",
          annualExam: "",
          grade: ""
        })),
        feesPaid: false,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiUser className="mr-2" /> Student Information
        </h2>

        {/* Student Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Photo Upload */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1">Student Photo</label>
            <div className="flex items-center">
              <div className="relative w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden mr-4">
                {currentStudent.photo?.preview ? (
                  <img src={currentStudent.photo.preview} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FiImage className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                <FiUpload className="mr-2" />
                Upload Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Personal Info Fields */}
          {[
            { label: "Student Name*", name: "name", required: true },
            { label: "Father's Name*", name: "fatherName", required: true },
            { label: "Mother's Name", name: "motherName" },
            { label: "Roll Number*", name: "rollNo", required: true },
            { label: "Admission No.", name: "admissionNo" },
            { label: "Class/Grade*", name: "className", required: true },
            { label: "Section", name: "section" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={currentStudent[field.name]}
                onChange={handleStudentChange}
                className="w-full p-2 border rounded-md"
                placeholder={`Enter ${field.label.replace('*', '')}`}
                required={field.required}
              />
            </div>
          ))}

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <div className="relative">
              <input
                type="date"
                name="dob"
                value={currentStudent.dob}
                onChange={handleStudentChange}
                className="w-full p-2 border rounded-md pl-10"
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Present Days */}
          <div>
            <label className="block text-sm font-medium mb-1">Present Days</label>
            <input
              type="number"
              name="totalPresentDays"
              value={currentStudent.totalPresentDays}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              min="0"
              placeholder="Total present days"
            />
          </div>

          {/* Status Toggles */}
          <div className="flex items-end">
            <label className="block text-sm font-medium mb-1 mr-4">Fees Status</label>
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

          <div className="flex items-end">
            <label className="block text-sm font-medium mb-1 mr-4">Promotion Status</label>
            <button
              type="button"
              onClick={togglePromotionStatus}
              className={`px-4 py-2 rounded-md text-white ${
                currentStudent.promotedToNextClass ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {currentStudent.promotedToNextClass ? "Promoted" : "Not Promoted"}
            </button>
          </div>
        </div>

        {/* Scholastic Areas */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiBook className="mr-2" /> Scholastic Areas
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">Subject</th>
                <th className="border border-gray-300 px-3 py-2">Half Yearly</th>
                <th className="border border-gray-300 px-3 py-2">Annual Exam</th>
                <th className="border border-gray-300 px-3 py-2">Grade</th>
                <th className="border border-gray-300 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                      className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      value={subject.halfYearly}
                      onChange={(e) => handleSubjectChange(index, "halfYearly", e.target.value)}
                      className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      value={subject.annualExam}
                      onChange={(e) => handleSubjectChange(index, "annualExam", e.target.value)}
                      className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.01"
                      required
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2 bg-gray-50 text-center">
                    {subject.grade || "-"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      onClick={() => removeSubject(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Remove subject"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Co-Scholastic Areas */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiBook className="mr-2" /> Co-Scholastic Areas
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">Activity</th>
                <th className="border border-gray-300 px-3 py-2">Grade</th>
                <th className="border border-gray-300 px-3 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.coScholasticAreas.map((area, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={area.area}
                      onChange={(e) => handleCoScholasticChange(index, "area", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={area.grade}
                      onChange={(e) => handleCoScholasticChange(index, "grade", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={area.remarks}
                      onChange={(e) => handleCoScholasticChange(index, "remarks", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between">
          <button
            onClick={addSubject}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add Subject
          </button>

          <button
            onClick={saveStudent}
            disabled={isUploading}
            className={`flex items-center px-6 py-2 text-white rounded-md ${
              isUploading ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

      <SavedResultsSection />
    </div>
  );
}