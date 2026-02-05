import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DriverPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const currentJob = {
    pilgrimName: "Ahmad Abdullah",
    pickupLocation: "Abraj Al Bait Clock Tower, Gate 3",
    time: "2:00 PM",
    pilgrims: 3,
    distance: "2.4 km",
    eta: "8 mins",
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button
          onClick={() => navigate("/partner/dashboard")}
          className="btn-icon"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Driver Portal</h1>
        <button className="btn-icon">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Arrival Warning */}
      {showWarning && (
        <div className="mx-4 mt-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500/30 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-400">
                warning
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-amber-300">
                Arrival Deadline Approaching
              </p>
              <p className="text-amber-200/70 text-sm mt-1">
                You need to arrive at the pickup point within{" "}
                {formatTime(countdown)} to avoid penalties.
              </p>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-amber-400/50 hover:text-amber-400"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-amber-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${(countdown / 300) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Current Job Card */}
      <div className="p-4">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
          Current Assignment
        </h2>
        <div className="bg-surface-dark rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">
                person
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">
                {currentJob.pilgrimName}
              </h3>
              <p className="text-primary font-medium">
                {currentJob.time} • {currentJob.pilgrims} pilgrims
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">
                location_on
              </span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
                  Pickup Location
                </p>
                <p className="text-white font-medium">
                  {currentJob.pickupLocation}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                Distance
              </p>
              <p className="text-xl font-bold text-white mt-1">
                {currentJob.distance}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                ETA
              </p>
              <p className="text-xl font-bold text-primary mt-1">
                {currentJob.eta}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-surface-dark border border-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined">call</span>
              Call
            </button>
            <button className="flex-1 py-3 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all">
              <span className="material-symbols-outlined">navigation</span>
              Navigate
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tips */}
      <div className="px-4 mt-4">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
          Tips
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-surface-dark rounded-xl border border-slate-800">
            <span className="material-symbols-outlined text-sky-400">
              traffic
            </span>
            <p className="text-sm text-slate-300">
              Moderate traffic on the main route
            </p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface-dark rounded-xl border border-slate-800">
            <span className="material-symbols-outlined text-amber-400">
              local_parking
            </span>
            <p className="text-sm text-slate-300">
              Limited parking at Gate 3. Use S2 level.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="mt-auto p-4 border-t border-slate-800">
        <button
          onClick={() => navigate("/partner/dashboard")}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined">check_circle</span>
          Mark as Arrived
        </button>
      </footer>
    </div>
  );
};

export default DriverPortalPage;
