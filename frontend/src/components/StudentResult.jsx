import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import schoollogo from "./assets/schoollogo.jpg";

function StudentResult() {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_GET_RESULT}${rollNumber}`
      );
      if (!response.data.success) {
        throw new Error("Failed to fetch result");
      }
      const studentData = response.data.student;
      if (!studentData.feesPaid) {
        setError("Fees not paid. Please submit your fees to view the result.");
      } else {
        setResult(studentData);
      }
    } catch (err) {
      setError(err.message || "No result found for this roll number");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("result-card");
    const options = {
      width: 800, // fixed width
      scale: 2, // higher quality
      useCORS: true, // for external images
    };

    try {
      const canvas = await html2canvas(element, options);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = `${result.name}_${result.className}_result.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading result:", error);
    }
  };

  // Calculate aggregate marks and grade
  const calculateAggregate = () => {
    if (!result?.subjects?.length) return { marks: 0, grade: "N/A" };

    const total = result.subjects.reduce((sum, subject) => {
      return sum + (parseFloat(subject.annualExam) || 0);
    }, 0);

    const average = total / result.subjects.length;

    const grade = calculateGrade(average);

    return {
      marks: average.toFixed(2),
      grade: grade,
    };
  };

  const calculateGrade = (marks) => {
    if (marks >= 91) return "A1";
    if (marks >= 81) return "A2";
    if (marks >= 71) return "B1";
    if (marks >= 61) return "B2";
    if (marks >= 51) return "C1";
    if (marks >= 41) return "C2";
    if (marks >= 33) return "D";
    return "E";
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-16 bg-gray-100 pb-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              Reliable Public School
            </h1>
            <p className="text-gray-600 mt-2">
              Reliable Public School, ward. no. 10 Opp. Hp Gas agency
              office, Kota road, suket
            </p>
            <p className="text-gray-600">Ph : +91 93512-39366</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="rollNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Roll Number
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 8A028"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                {loading ? "Searching..." : "View Result"}
              </button>
            </form>
            {error && (
              <div
                className={`mt-4 p-3 rounded-md text-sm ${
                  error.includes("Fees not paid")
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {error}
              </div>
            )}
          </div>

          {result && (
            <div
              id="result-card"
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 max-w-4xl mx-auto"
              style={{ width: "800px" }} // Fixed width for consistent rendering
            >
              {/* Added registration and affiliation numbers */}
              <div className="flex justify-between mt-4 mx-4 text-xs md:text-sm mb-2">
                  <p className="text-left">Registration No. 20/2006</p>
                  <p className="text-right">Affiliation No. 529/2011</p>
                </div>
              {/* Header */}
              <div className="flex justify-center mt-4">
                <img
                  className="h-16 w-auto"
                  src={schoollogo}
                  alt="school logo"
                />
              </div>
              <div className="text-center py-4 border-b border-gray-300 px-4">
                <h1 className="text-xl md:text-2xl font-bold">
                  Reliable Public School, Suket
                </h1>
                <p className="text-xs md:text-sm">
                  ward no. 10, Opp. HP Gas agency office, Kota road, Suket
                </p>
                <p className="text-xs md:text-sm">Ph: +91 93512-39366 , +91 74592-99224</p>

                <p className="text-xs md:text-sm">email: rpssuket@gmail.com</p>

                <h2 className="text-lg md:text-xl font-semibold mt-2">
                  Annual Report Card: {result.className} Class (2024-25)
                </h2>
              </div>
              {/* Student Profile */}
              <div className="p-4 border-b border-gray-300">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th
                            colSpan="4"
                            className="text-left font-bold py-2 bg-gray-100"
                          >
                            STUDENT PROFILE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Student's Name</td>
                          <td className="py-1">: {result.name}</td>
                          <td className="py-1 font-medium">Roll No.</td>
                          <td className="py-1">: {result.rollNo}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Mother's Name</td>
                          <td className="py-1">: {result.motherName}</td>
                          <td className="py-1 font-medium">Admission No.</td>
                          <td className="py-1">
                            : {result.admissionNo || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Father's Name</td>
                          <td className="py-1">: {result.fatherName}</td>
                          <td className="py-1 font-medium">Date of Birth</td>
                          <td className="py-1">
                            :{" "}
                            {result.dob
                              ? new Date(result.dob).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Class</td>
                          <td className="py-1">: {result.className}</td>
                          <td className="py-1"></td>
                          <td className="py-1"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 border border-gray-300 rounded overflow-hidden">
                      <img
                        src={result.photo?.url || "/default-student.png"}
                        alt="Student Photo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-student.png";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="p-4 border-b border-gray-300">
                <h3 className="font-bold mb-2">ATTENDANCE</h3>
                <p className="text-center font-medium">
                  Total No. of Present Days : {result.totalPresentDays || 0}
                </p>
              </div>

              {/* Scholastic Areas - Simplified */}
              <div className="p-4 border-b border-gray-300 overflow-x-auto">
                <h3 className="font-bold mb-2 text-center">SCHOLASTIC AREAS</h3>
                <div className="min-w-[300px]">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-1">
                          Subject
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Half Yearly
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Annual Exam
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-2 py-1">
                            {subject.name}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {subject.halfYearly || "-"}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {subject.annualExam || "-"}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {subject.grade ||
                              calculateGrade(subject.annualExam) ||
                              "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Aggregate Marks */}
              <div className="p-4 border-b border-gray-300">
                <h3 className="font-bold mb-2">
                  Aggregate Marks: {calculateAggregate().marks}
                </h3>
                <h3 className="font-bold mb-2">
                  Aggregate Grade: {calculateAggregate().grade}
                </h3>
              </div>

              {/* Co-Scholastic Areas */}
              <div className="p-4 border-b border-gray-300 overflow-x-auto">
                <h3 className="font-bold mb-2">Co-Scholastic Areas</h3>
                <div className="min-w-[300px]">
                  <table className="w-full border-collapse">
                    <tbody>
                      {result.coScholasticAreas.map((area, index) => (
                        <tr key={index}>
                          <td className="py-1">{area.area}</td>
                          <td className="py-1">Grade: {area.grade || "-"}</td>
                          <td className="py-1">
                            Remarks: {area.remarks || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Remarks */}
              <div className="p-4 border-b border-gray-300">
                <h3 className="font-bold mb-2">CLASS TEACHER'S REMARK</h3>
                <p className="border border-gray-300 p-2 rounded">Good</p>
                <p className="mt-2 font-medium">
                  PROMOTED TO:{" "}
                  {result.promotedToNextClass
                    ? result.className.replace(/\d+/, (n) =>
                        String(parseInt(n) + 1)
                      )
                    : "Same Class"}
                </p>
              </div>

              {/* Grading System */}
              <div className="p-4 overflow-x-auto">
                <h3 className="font-bold mb-2">GRADING SYSTEM (SCHOLASTIC)</h3>
                <div className="min-w-[300px]">
                  <table className="w-full border-collapse text-center">
                    <tbody>
                      <tr>
                        {[
                          "91-100",
                          "81-90",
                          "71-80",
                          "61-70",
                          "51-60",
                          "41-50",
                          "33-40",
                        ].map((range) => (
                          <td
                            key={range}
                            className="border border-gray-300 px-2 py-1 text-xs md:text-sm"
                          >
                            {range}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {["A1", "A2", "B1", "B2", "C1", "C2", "D"].map(
                          (grade) => (
                            <td
                              key={grade}
                              className="border border-gray-300 px-2 py-1 text-xs md:text-sm"
                            >
                              {grade}
                            </td>
                          )
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-100 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-2 md:mb-0">
                  <p>Date : {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-center md:text-right">
                  <p>Class Teacher</p>
                  <p>Principal's</p>
                </div>
              </div>

              {/* Download Button */}
              <div className="p-4 text-center">
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center mx-auto transition duration-300"
                >
                  <FaDownload className="mr-2" />
                  Download Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentResult;
