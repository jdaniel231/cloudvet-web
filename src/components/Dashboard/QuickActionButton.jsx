import React from "react";

const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-4 ${color} rounded-lg hover:${color.replace("50", "100")} transition-colors`}
  >
    <Icon
      className={`h-8 w-8 mb-2 ${color.includes("blue") ? "text-blue-600" : color.includes("green") ? "text-green-600" : color.includes("purple") ? "text-purple-600" : "text-orange-600"}`}
    />
    <span
      className={`text-sm font-medium ${color.includes("blue") ? "text-blue-800" : color.includes("green") ? "text-green-800" : color.includes("purple") ? "text-purple-800" : "text-orange-800"}`}
    >
      {label}
    </span>
  </button>
);

export default QuickActionButton;
