import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mutawif } from "@/types";
import { MOCK_MUTAWIFS } from "@/constants";

const FindGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [graceTime, setGraceTime] = useState(105);
  const mutawif = MOCK_MUTAWIFS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setGraceTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="relative h-screen w-screen bg-background-dark overflow-hidden select-none">
      {/* Navigation Header */}
      <header className="relative z-20 flex items-center p-4 pb-2 justify-between pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="text-white flex size-12 items-center justify-center rounded-full bg-background-dark/40 backdrop-blur-md cursor-pointer pointer-events-auto active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Finding Guide
        </h2>
      </header>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAELl-CIvLgVV3PY-aR0Br33Xu_QIWueARldXeDPzQOcI0m8RjYQFs00nrKwfEiC3RLUyiHDNY-XUQDPVn943SkMKl60af_Qs6IPKabXFjVJqLrXEXYlUGuOrz8l3H_OgCngVIvwDF4Swrnpw_3_JoPq0YCG35G1bSvnD55FjADeiIfit9F9ZlSodJoU25PfF9hHml52MOlHNylunIaFP249_y6oKVlpfx4mtjE91D0EgNcu_m0yRj-48Fy2xUf7YZG-VcwZZwsxjUI')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark" />

        {/* Radar Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="absolute -inset-20 rounded-full border border-primary/20 animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute -inset-32 rounded-full border border-primary/10 animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute -inset-44 rounded-full border border-primary/5 animate-ping"
              style={{ animationDuration: "4s" }}
            />
            <div className="relative bg-primary/20 p-4 rounded-full">
              <span className="material-symbols-outlined text-primary text-3xl">
                radar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col w-full animate-in slide-in-from-bottom duration-500">
        {/* Notification Banner */}
        <div className="mx-4 mb-3 p-3 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary animate-pulse">
              location_on
            </span>
            <p className="text-sm font-medium text-white">
              Sharing live location with {mutawif.name.split(" ")[1]}
            </p>
          </div>
          <div className="flex gap-1">
            <span className="h-1 w-1 rounded-full bg-primary animate-bounce"></span>
            <span
              className="h-1 w-1 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="h-1 w-1 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
        </div>

        {/* Main Panel */}
        <div className="bg-background-dark border-t border-white/10 rounded-t-[2.5rem] px-6 pb-10 pt-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {/* Drag Handle */}
          <div className="flex w-full items-center justify-center mb-6">
            <div className="h-1.5 w-12 rounded-full bg-white/20"></div>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl h-20 w-20 ring-2 ring-primary/50"
                style={{ backgroundImage: `url('${mutawif.photoUrl}')` }}
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-background-dark">
                <span className="material-symbols-outlined text-[14px] font-bold">
                  check
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <h3 className="text-white text-xl font-bold leading-tight tracking-tight">
                {mutawif.name}
              </h3>
              <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                <span className="material-symbols-outlined text-yellow-500 text-[18px]">
                  star
                </span>
                <span className="font-semibold text-white">
                  {mutawif.rating}
                </span>
                <span>({mutawif.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {mutawif.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-slate-400 uppercase tracking-wider font-bold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 rounded-2xl p-4 bg-white/5 border border-white/5">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">
                  Estimated Arrival
                </p>
                <p className="text-white text-lg font-bold">
                  {mutawif.estimatedArrival}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl p-4 bg-white/5 border border-white/5">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">distance</span>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">
                  Distance
                </p>
                <p className="text-white text-lg font-bold">
                  {mutawif.distance}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => navigate("/tracking")}
              className="w-full flex items-center justify-center gap-3 h-16 bg-primary text-black rounded-2xl font-bold text-xl shadow-[0_4px_20px_rgba(13,242,128,0.3)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-2xl">
                chat_bubble
              </span>
              Chat with {mutawif.name.split(" ")[1]}
            </button>
          </div>

          {/* Progress and Cancel */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => navigate("/cancellation")}
              className="text-slate-500 text-sm font-medium hover:text-red-400 transition-colors py-2 active:scale-95"
            >
              Cancel Request
            </button>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(graceTime / 105) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">
              Grace period: {formatTime(graceTime)} remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindGuidePage;
