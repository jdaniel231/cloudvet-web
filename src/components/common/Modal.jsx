import React from 'react';

export default function Modal({ show, onClose, title, message, type, onConfirm, children }) {
  if (!show) {
    return null;
  }

  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isConfirmation = type === 'confirmation';

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-400',
          buttonColor: 'bg-blue-500 hover:bg-blue-700',
        };
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-400',
          buttonColor: 'bg-red-500 hover:bg-red-700',
        };
      case 'confirmation':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-400',
          buttonColor: 'bg-red-500 hover:bg-red-700',
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-400',
          buttonColor: 'bg-gray-500 hover:bg-gray-700',
        };
    }
  };

  const { bgColor, textColor, borderColor, buttonColor } = getColors();

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`relative p-5 border ${borderColor} w-auto shadow-lg rounded-md bg-white transform transition-all duration-300 ease-out scale-100 opacity-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children ? (
          <div className="max-h-[80vh] overflow-y-auto pt-5">
            {children}
          </div>
        ) : (
          <div className="text-center">
            <h3 className={`text-lg leading-6 font-medium ${textColor}`}>{title}</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
            {!isSuccess && (
              <div className="items-center px-4 py-3 flex justify-center space-x-4">
                {isConfirmation && (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={isConfirmation ? onConfirm : onClose}
                  className={`px-4 py-2 ${buttonColor} text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75`}
                >
                  {isConfirmation ? 'Confirmar' : 'OK'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
