import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-2 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition"
    >
      ⬅️ Go Back
    </button>
  );
};

export default BackButton;
