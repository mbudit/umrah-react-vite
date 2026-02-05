import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CancellationReason } from "@/types";
import { CANCELLATION_REASONS } from "@/constants";

const CancellationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason | null>(CancellationReason.TOO_FAR);
  const [details, setDetails] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!selectedReason) {
      alert("Please select a reason for cancellation.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Cancellation submitted:", {
        reason: selectedReason,
        details,
      });
      setIsSubmitting(false);
      setIsCancelled(true);
    }, 1500);
  };

  const handleBack = () => {
    if (isCancelled) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  if (isCancelled) {
    return (
      <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-dark shadow-xl">
        <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <button onClick={handleBack} className="btn-icon">
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
          <h1 className="text-lg font-bold">Cancelled</h1>
          <div className="w-10" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <span className="material-symbols-outlined text-primary text-4xl">
              check_circle
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Cancelled</h2>
          <p className="text-gray-400">
            Your ride has been cancelled at no cost. We hope to serve you again
            soon!
          </p>
          <button
            onClick={handleBack}
            className="mt-8 px-8 py-3 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all active:scale-95"
          >
            Done
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-dark shadow-xl">
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button onClick={handleBack} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Select a Reason</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Status Banner */}
        <div className="mx-4 mt-4 p-4 bg-emerald-900/30 border border-emerald-700/50 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-400">
            info
          </span>
          <div>
            <p className="text-emerald-300 font-bold text-sm">
              Cancellation is FREE
            </p>
            <p className="text-emerald-400/70 text-xs">
              The Mutawif exceeded the estimated arrival time, so you won't be
              charged.
            </p>
          </div>
        </div>

        <h3 className="text-white tracking-tight text-xl font-bold leading-tight px-4 text-left pt-6 pb-4">
          Why are you cancelling?
        </h3>

        {/* Reason Options */}
        <div className="px-4 space-y-3">
          {Object.entries(CANCELLATION_REASONS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedReason(key as CancellationReason)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selectedReason === key
                  ? "border-primary bg-primary/10"
                  : "border-slate-800 bg-surface-dark hover:border-slate-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedReason === key
                    ? "border-primary bg-primary"
                    : "border-slate-600"
                }`}
              >
                {selectedReason === key && (
                  <span className="material-symbols-outlined text-black text-sm">
                    check
                  </span>
                )}
              </div>
              <span
                className={`font-medium ${selectedReason === key ? "text-white" : "text-slate-400"}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="px-4 pt-6">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Additional Details (Optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us more about your experience..."
            className="w-full bg-surface-dark border border-slate-800 rounded-xl p-4 min-h-[100px] text-sm focus:ring-primary focus:border-primary resize-none"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800">
        <button
          onClick={handleConfirm}
          disabled={!selectedReason || isSubmitting}
          className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined">cancel</span>
              Confirm Cancellation
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default CancellationPage;
