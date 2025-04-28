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
    sessionYear: "",
    totalPresentDays: 0,
    attendanceRemarks: "",
    promotedToNextClass: false,
    resultStatus: "",
    subjects: [
      {
        name: "English",
        halfYearly: { obtained: "", total: "" },
        annualExam: { obtained: "", total: "" },
        grade: ""
      },
      {
        name: "Hindi",
        halfYearly: { obtained: "", total: "" },
        annualExam: { obtained: "", total: "" },
        grade: ""
      },
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
    const newCoScholasticAreas = [...currentStudent.coScholasticAreas];
    newCoScholasticAreas[index][field] = value;
    setCurrentStudent({ ...currentStudent, coScholasticAreas: newCoScholasticAreas });
  };

  const addSubject = () => {
    setCurrentStudent({
      ...currentStudent,
      subjects: [
        ...currentStudent.subjects,
        {
          name: "",
          halfYearly: { obtained: "", total: "" },
          annualExam: { obtained: "", total: "" },
          grade: "",
        },
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
    if (!currentStudent.name || !currentStudent.rollNo || !currentStudent.className || !currentStudent.sessionYear) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsUploading(true);

    const payload = { ...currentStudent };
    payload.subjects = payload.subjects.map(sub => ({
      ...sub,
      halfYearly: {
        obtained: isNaN(parseFloat(sub.halfYearly.obtained)) ? 0 : parseFloat(sub.halfYearly.obtained),
        total: isNaN(parseFloat(sub.halfYearly.total)) ? 0 : parseFloat(sub.halfYearly.total),
      },
      annualExam: {
        obtained: isNaN(parseFloat(sub.annualExam.obtained)) ? 0 : parseFloat(sub.annualExam.obtained),
        total: isNaN(parseFloat(sub.annualExam.total)) ? 0 : parseFloat(sub.annualExam.total),
      },
    }));

    const res = await uploadStudentResult(payload);
    if (!res.success) throw new Error(res.data?.msg || "Upload failed");

    toast.success("Result uploaded successfully!");
    
    setCurrentStudent({
      ...currentStudent,
      name: "",
      rollNo: "",
      className: "",
      sessionYear: "",
      subjects: currentStudent.subjects.map(sub => ({
        name: sub.name,
        halfYearly: { obtained: "", total: "" },
        annualExam: { obtained: "", total: "" },
        grade: "",
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
            { label: "Session Year*", name: "sessionYear", required: true },
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
            <label className="block text-sm font-medium mb-1">Total Present Days</label>
            <input
              type="number"
              name="totalPresentDays"
              value={currentStudent.totalPresentDays}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
              min="0"
            />
          </div>

          {/* Attendance Remarks */}
          <div>
            <label className="block text-sm font-medium mb-1">Attendance Remarks</label>
            <input
              type="text"
              name="attendanceRemarks"
              value={currentStudent.attendanceRemarks}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Result Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Result Status</label>
            <input
              type="text"
              name="resultStatus"
              value={currentStudent.resultStatus}
              onChange={handleStudentChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Subjects Table */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Subjects</h3>
          <table className="min-w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Half Yearly - Marks</th>
                <th className="border px-4 py-2">Annual Exam - Marks</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Action</th>
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
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={subject.halfYearly.obtained}
                      onChange={(e) => handleSubjectChange(index, "halfYearly", "obtained", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Obtained"
                    />
                    <input
                      type="number"
                      value={subject.halfYearly.total}
                      onChange={(e) => handleSubjectChange(index, "halfYearly", "total", e.target.value)}
                      className="w-full p-2 border rounded-md mt-2"
                      placeholder="Total"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={subject.annualExam.obtained}
                      onChange={(e) => handleSubjectChange(index, "annualExam", "obtained", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Obtained"
                    />
                    <input
                      type="number"
                      value={subject.annualExam.total}
                      onChange={(e) => handleSubjectChange(index, "annualExam", "total", e.target.value)}
                      className="w-full p-2 border rounded-md mt-2"
                      placeholder="Total"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={subject.grade}
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => removeSubject(index)}
                      className="text-red-500 hover:text-red-700"
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700"
          >
            <FiPlus className="mr-2" />
            Add Subject
          </button>
        </div>

        {/* Co-Scholastic Areas */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Co-Scholastic Areas</h3>
          <div className="mt-4">
            {currentStudent.coScholasticAreas.map((area, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Area</label>
                  <input
                    type="text"
                    value={area.area}
                    onChange={(e) => handleCoScholasticChange(index, "area", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Grade</label>
                  <input
                    type="text"
                    value={area.grade}
                    onChange={(e) => handleCoScholasticChange(index, "grade", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Remarks</label>
                  <input
                    type="text"
                    value={area.remarks}
                    onChange={(e) => handleCoScholasticChange(index, "remarks", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveStudent}
            disabled={isUploading}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            <FiSave className="mr-2" />
            {isUploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
             }
