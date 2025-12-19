import React, { useState, useEffect } from "react";

export default function Modal({
  show,
  onClose,
  title,
  message,
  type,
  onConfirm,
  children,
}) {
  const [progress, setProgress] = useState(100);

  const isSuccess = type === "success";
  const isError = type === "error";
  const isConfirmation = type === "confirmation";

  // Progress bar animation for success modals
  useEffect(() => {
    if (show && isSuccess) {
      setProgress(100);
      const duration = 3000; // 3 seconds
      const interval = 30; // Update every 30ms
      const decrement = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [show, isSuccess]);

  if (!show) {
    return null;
  }

  const getIconAndColors = () => {
    switch (type) {
      case "success":
        return {
          iconBg: "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500",
          textColor: "text-slate-800",
          buttonGradient: "from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700",
          ringColor: "focus:ring-emerald-400",
          progressBar: "from-emerald-400 via-teal-400 to-cyan-500",
          icon: (
            <div className="relative">
              {/* Paw print icon for veterinary theme */}
              <svg className="w-20 h-20 text-white animate-scaleIn drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.172 2 10.5 2.672 10.5 3.5C10.5 4.328 11.172 5 12 5C12.828 5 13.5 4.328 13.5 3.5C13.5 2.672 12.828 2 12 2Z" />
                <path d="M8.5 3C7.672 3 7 3.672 7 4.5C7 5.328 7.672 6 8.5 6C9.328 6 10 5.328 10 4.5C10 3.672 9.328 3 8.5 3Z" />
                <path d="M15.5 3C14.672 3 14 3.672 14 4.5C14 5.328 14.672 6 15.5 6C16.328 6 17 5.328 17 4.5C17 3.672 16.328 3 15.5 3Z" />
                <path d="M6 6C5.172 6 4.5 6.672 4.5 7.5C4.5 8.328 5.172 9 6 9C6.828 9 7.5 8.328 7.5 7.5C7.5 6.672 6.828 6 6 6Z" />
                <path d="M18 6C17.172 6 16.5 6.672 16.5 7.5C16.5 8.328 17.172 9 18 9C18.828 9 19.5 8.328 19.5 7.5C19.5 6.672 18.828 6 18 6Z" />
                <path d="M12 8C9.5 8 7 9.5 7 12.5C7 15.5 9 18 12 18C15 18 17 15.5 17 12.5C17 9.5 14.5 8 12 8Z" />
                {/* Check mark overlay */}
                <path className="animate-scaleIn" style={{ animationDelay: '0.2s' }} d="M9 12.5L11 14.5L15 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          ),
        };
      case "error":
        return {
          iconBg: "bg-gradient-to-br from-rose-400 via-red-400 to-pink-500",
          textColor: "text-slate-800",
          buttonGradient: "from-rose-500 via-red-500 to-pink-600 hover:from-rose-600 hover:via-red-600 hover:to-pink-700",
          ringColor: "focus:ring-rose-400",
          progressBar: "",
          icon: (
            <div className="relative">
              {/* Medical cross with X for error */}
              <svg className="w-20 h-20 text-white animate-shake drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="5" width="6" height="14" rx="1" strokeWidth="0" fill="currentColor" opacity="0.3" />
                <rect x="5" y="9" width="14" height="6" rx="1" strokeWidth="0" fill="currentColor" opacity="0.3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 8L16 16M8 16L16 8" />
              </svg>
            </div>
          ),
        };
      case "confirmation":
        return {
          iconBg: "bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500",
          textColor: "text-slate-800",
          buttonGradient: "from-rose-500 via-red-500 to-pink-600 hover:from-rose-600 hover:via-red-600 hover:to-pink-700",
          ringColor: "focus:ring-amber-400",
          progressBar: "",
          icon: (
            <div className="relative">
              {/* Medical alert icon */}
              <svg className="w-20 h-20 text-white animate-bounce drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 20h20L12 2z" opacity="0.3" />
                <path d="M12 8v5M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          ),
        };
      default:
        return {
          iconBg: "bg-gradient-to-br from-slate-400 to-gray-500",
          textColor: "text-slate-800",
          buttonGradient: "from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700",
          ringColor: "focus:ring-slate-400",
          progressBar: "",
          icon: null,
        };
    }
  };

  const { iconBg, textColor, buttonGradient, ringColor, progressBar, icon } = getIconAndColors();

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-teal-900/70 backdrop-blur-premium overflow-y-auto h-full w-full flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 glass-effect shadow-2xl rounded-3xl overflow-hidden animate-slideUp border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Medical-themed header accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500"></div>

        {/* Progress bar for auto-close (success only) */}
        {isSuccess && (
          <div className="absolute top-1.5 left-0 right-0 h-1 bg-slate-200/30 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${progressBar} transition-all duration-100 ease-linear shadow-lg`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 focus:outline-none transition-all duration-200 hover:rotate-90 z-10 bg-white/50 hover:bg-white/80 rounded-full p-1.5"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children ? (
          <div className="max-h-[80vh] overflow-y-auto p-8">{children}</div>
        ) : (
          <div className="text-center p-10 pt-12">
            {/* Icon Container with medical theme */}
            {icon && (
              <div className="flex justify-center mb-8">
                <div className={`${iconBg} rounded-2xl p-6 shadow-2xl relative`}>
                  {/* Subtle pulse effect for medical feel */}
                  <div className={`absolute inset-0 ${iconBg} rounded-2xl animate-pulse opacity-50`}></div>
                  {icon}
                </div>
              </div>
            )}

            {/* Title with medical typography */}
            <h3 className={`text-3xl font-bold ${textColor} mb-4 tracking-tight`}>
              {title}
            </h3>

            {/* Message with clinical clarity */}
            <p className="text-slate-600 text-lg leading-relaxed mb-8 px-6 font-medium">
              {message}
            </p>

            {/* Buttons with medical theme */}
            <div className="flex justify-center gap-4 px-6">
              {isConfirmation && (
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-gradient-to-r from-slate-400 to-gray-500 hover:from-slate-500 hover:to-gray-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={isConfirmation ? onConfirm : onClose}
                className={`px-10 py-3.5 bg-gradient-to-r ${buttonGradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 ${ringColor} focus:ring-offset-2`}
              >
                {isConfirmation ? "Confirmar" : "OK"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
