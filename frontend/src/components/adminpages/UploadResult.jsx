import React, { useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { uploadStudentResult } from "../../api/upload";

const AddResult = () => {
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    rollNumber: "",
    class: "",
    section: "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
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

  const calculateGrade = (marks) => {
    const mark = parseFloat(marks);
    if (mark >= 91) return "A1";
    if (mark >= 81) return "A2";
    if (mark >= 71) return "B1";
    if (mark >= 61) return "B2";
    if (mark >= 51) return "C1";
    if (mark >= 41) return "C2";
    if (mark >= 33) return "D";
    return "E";
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

  const removeSubject = (index) => {
    const updatedSubjects = [...currentStudent.subjects];
    updatedSubjects.splice(index, 1);
    setCurrentStudent({ ...currentStudent, subjects: updatedSubjects });
  };

  const saveStudent = async () => {
    try {
      const payload = { ...currentStudent };
      payload.subjects = payload.subjects.map((sub) => ({
        ...sub,
        annualExam: {
          obtained: isNaN(parseFloat(sub.annualExam.obtained)) ? 0 : parseFloat(sub.annualExam.obtained),
          total: isNaN(parseFloat(sub.annualExam.total)) ? 0 : parseFloat(sub.annualExam.total),
        },
      }));

      const response = await uploadStudentResult(payload)
      console.log("Student saved:", response);
      alert("Student result saved successfully!");
      setCurrentStudent({
        name: "",
        rollNumber: "",
        class: "",
        section: "",
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
      });
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Error saving student.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Student Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={currentStudent.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="rollNumber"
          value={currentStudent.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="class"
          value={currentStudent.class}
          onChange={handleChange}
          placeholder="Class"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="section"
          value={currentStudent.section}
          onChange={handleChange}
          placeholder="Section"
          className="p-2 border rounded-md"
        />
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Subjects</h3>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Subject</th>
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Subject
        </button>
      </div>
      <button
        onClick={saveStudent}
        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Save Result
      </button>
    </div>
  );
};

export default AddResult;
