import React from 'react';

export default function Modal({ show, onClose, title, message, type }) {
  if (!show) {
    return null;
  }

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const textColor = isSuccess ? 'text-green-700' : 'text-red-700';
  const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
  const buttonColor = isSuccess ? 'bg-blue-500 hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700';

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`relative p-5 border ${borderColor} w-96 shadow-lg rounded-md bg-white transform transition-all duration-300 ease-out scale-100 opacity-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className={`text-lg leading-6 font-medium ${textColor}`}>{title}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className={`px-4 py-2 ${buttonColor} text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 ${isSuccess ? 'focus:ring-blue-500' : 'focus:ring-red-500'}`}
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}