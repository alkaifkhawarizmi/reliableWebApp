import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
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
        `${import.meta.env.VITE_BASE_GET_RESULT}${rollNumber}`,
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch result");
      }

      const studentData = response.data.student;

      // Ensure subjects have proper structure
      const processedData = {
        ...studentData,
        subjects:
          studentData.subjects?.map((subject) => ({
            ...subject,
            annualExam: subject.annualExam?.obtained || subject.annualExam || 0,
            maxMarks: subject.annualExam?.total || subject.maxMarks || 100,
          })) || [],
      };

      if (!processedData.feesPaid) {
        setError("Fees not paid. Please submit your fees to view the result.");
      } else {
        setResult(processedData);
        console.log(result);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "No result found for this roll number"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("result-card");
    const options = {
      width: 800,
      scale: 2,
      useCORS: true,
    };

    try {
      const { default: html2canvas } = await import("html2canvas");
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
      setError("Failed to download result. Please try again.");
    }
  };

  const calculateAggregate = () => {
    if (!result?.subjects?.length)
      return { obtained: 0, max: 0, percentage: 0, grade: "N/A" };

    let totalObtained = 0;
    let totalMax = 0;

    result.subjects.forEach((subject) => {
      const maxMarks =
        subject.maxMarks ||
        (subject.name.toLowerCase().includes("hindi") ? 200 : 100);
      const obtainedMarks = parseFloat(subject.annualExam) || 0;

      totalObtained += obtainedMarks;
      totalMax += maxMarks;
    });

    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    const grade = calculateGrade(percentage);

    return {
      obtained: totalObtained,
      max: totalMax,
      percentage: percentage.toFixed(2),
      grade: grade,
    };
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 86) return "A";
    if (percentage >= 71) return "B";
    if (percentage >= 51) return "C";
    if (percentage >= 31) return "D";
    if (percentage >= 0) return "E";
    return "X";
  };

  const getMaxMarks = (subject) => {
    return (
      subject.maxMarks ||
      (subject.name.toLowerCase().includes("hindi") ? 200 : 100)
    );
  };

  const getSubjectGrade = (subject) => {
    if (subject.grade) return subject.grade;

    const maxMarks = getMaxMarks(subject);
    const obtainedMarks = parseFloat(subject.annualExam) || 0;
    const percentage = maxMarks > 0 ? (obtainedMarks / maxMarks) * 100 : 0;
    return calculateGrade(percentage);
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
              Reliable Public School, Opp.ward. no. 10 Opp. Hp Gas agency
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
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
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
              style={{ width: "800px" }}
            >
              <div className="flex justify-between mt-4 mx-4 text-xs md:text-sm mb-2">
                <p className="text-left">Registration No. 20/2006</p>
                <p className="text-right">Affiliation No. 529/2011</p>
              </div>

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
                  Ward no. 10, Opp. HP Gas agency office, Kota road, Suket
                </p>
                <p className="text-xs md:text-sm">
                  Ph: +91 93512-39366 , +91 74592-99224
                </p>
                <p className="text-xs md:text-sm">email: rpssuket@gmail.com</p>
                <h2 className="text-lg md:text-xl font-semibold mt-2">
                  Annual Report Card: {result.className} Class (2024-25)
                </h2>
              </div>

              <div className="p-4 border-b border-gray-300">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Student's Name</td>
                          <td className="py-1">: {result.name}</td>
                          <td className="py-1 font-medium">Roll No.</td>
                          <td className="py-1">: {result.rollNo}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Mother's Name</td>
                          <td className="py-1">
                            : {result.motherName || "N/A"}
                          </td>
                          <td className="py-1 font-medium">Admission No.</td>
                          <td className="py-1">
                            : {result.addmissionNo || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Father's Name</td>
                          <td className="py-1">
                            : {result.fatherName || "N/A"}
                          </td>
                          <td className="py-1 font-medium">Date of Birth</td>
                          <td className="py-1">
                            :{" "}
                            {result.dob
                              ? new Date(result.dob).toLocaleDateString("en-GB")
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

              <div className="p-4 border-b border-gray-300">
                <h3 className="font-bold mb-2">ATTENDANCE</h3>
                <p className="text-center font-medium">
                  Total No. of Present Days : {result.totalPresentDays || 0}/{result.totalSchoolDays || "N/A"}
                </p>
              </div>

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
                            {subject.annualExam || "-"} / {getMaxMarks(subject)}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {getSubjectGrade(subject)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 border-b border-gray-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">
                      Total Obtained Marks: {calculateAggregate().obtained} /{" "}
                      {calculateAggregate().max}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      Percentage: {calculateAggregate().percentage}%
                    </h3>
                  </div>
                </div>
                <h3 className="font-bold">
                  Grade: {calculateAggregate().grade}
                </h3>
              </div>

              {result.coScholasticAreas?.length > 0 && (
                <div className="p-4 border-b border-gray-300 overflow-x-auto">
                  <h3 className="font-bold mb-2">Co-Scholastic Areas</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-1">
                          Area
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.coScholasticAreas.map((area, index) => (
                        <tr key={index}>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {area.name || area.area || "N/A"}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {area.grade || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="p-4 border-b border-gray-300">
                <p className="mt-2 font-medium">
                  PROMOTED TO:{" "}
                  {result.promotedToNextClass
                    ? result.className.replace(/\d+/, (n) =>
                        String(parseInt(n) + 1)
                      )
                    : "Same Class"}
                </p>
              </div>

              <div className="p-4 overflow-x-auto">
                <h3 className="font-bold mb-2">GRADING SYSTEM (SCHOLASTIC)</h3>
                <div className="min-w-[300px]">
                  <table className="w-full border-collapse text-center">
                    <tbody>
                      <tr>
                        {[
                          "86-100",
                          "71-85",
                          "51-70",
                          "31-50",
                          "0-30",
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
                        {["A", "B", "C", "D", "E"].map((grade) => (
                          <td
                            key={grade}
                            className="border border-gray-300 px-2 py-1 text-xs md:text-sm"
                          >
                            {grade}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-gray-100 flex justify-between">
                <div>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>Result Declaration Date: {new Date(result.resultDeclarationDate).toLocaleDateString("en-GB")}</p>
                </div>
                
                <div className="text-center">
                  <p>Principal : Zarif Ahmed</p>
                </div>
              </div>

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
