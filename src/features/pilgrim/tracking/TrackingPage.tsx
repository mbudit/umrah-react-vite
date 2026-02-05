import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MUTAWIFS } from "@/constants";

const TrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const mutawif = MOCK_MUTAWIFS[0];
  const [delaySeconds, setDelaySeconds] = useState(720);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDelaySeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function formatDelay(seconds: number) {
    if (seconds <= 0) return "On time";
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hrs > 0) return `${hrs} hr${hrs > 1 ? "s" : ""} ${remMins} mins late`;
    return `${mins} mins late`;
  }

  return (
    <div className="relative h-screen w-full flex flex-col bg-background-dark">
      {/* Map Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAELl-CIvLgVV3PY-aR0Br33Xu_QIWueARldXeDPzQOcI0m8RjYQFs00nrKwfEiC3RLUyiHDNY-XUQDPVn943SkMKl60af_Qs6IPKabXFjVJqLrXEXYlUGuOrz8l3H_OgCngVIvwDF4Swrnpw_3_JoPq0YCG35G1bSvnD55FjADeiIfit9F9ZlSodJoU25PfF9hHml52MOlHNylunIaFP249_y6oKVlpfx4mtjE91D0EgNcu_m0yRj-48Fy2xUf7YZG-VcwZZwsxjUI')`,
        }}
      >
        <div className="absolute inset-0 bg-background-dark/60 mix-blend-overlay pointer-events-none"></div>

        {/* Route Line */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-80"
          style={{ zIndex: 1 }}
        >
          <path
            d="M140,280 Q220,350 320,450"
            fill="none"
            stroke="#0df280"
            strokeDasharray="10, 5"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </svg>

        {/* Mutawif Marker */}
        <div className="absolute top-[260px] left-[120px] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center size-12 bg-white rounded-full shadow-lg border-2 border-red-500">
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url('${mutawif.photoUrl}')` }}
            />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
              !
            </div>
          </div>
        </div>

        {/* User Marker */}
        <div className="absolute top-[450px] left-[320px] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative size-6 bg-black rounded-full border-4 border-white shadow-lg">
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex flex-col w-full pt-6 pb-2 px-4 bg-gradient-to-b from-background-dark/90 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-black/40 backdrop-blur-md size-10 flex items-center justify-center rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white">
              arrow_back_ios_new
            </span>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight">
            Tracking Mutawif
          </h2>
          <div className="size-10"></div>
        </div>
      </div>

      {/* Delay Alert Banner */}
      <div className="relative z-20 px-4 mt-2">
        <div className="flex items-start gap-3 rounded-xl bg-red-900/60 border border-red-800 p-4 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined text-red-400 shrink-0">
            warning
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-red-50 text-base font-bold leading-tight">
              Delay Alert
            </p>
            <p className="text-red-200 text-sm font-medium leading-normal">
              Mutawif is taking longer than expected due to heavy traffic.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Bottom Card */}
      <div className="relative z-30 bg-surface-dark w-full rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex flex-col">
        <div className="flex w-full justify-center pt-3 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-gray-700"></div>
        </div>
        <div className="px-5 pb-8 pt-2 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Estimated Arrival
              </span>
              <span className="text-2xl font-bold text-white transition-all duration-500">
                {formatDelay(delaySeconds)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-900/40 text-red-300 px-3 py-1.5 rounded-full text-sm font-medium animate-pulse">
              <span className="material-symbols-outlined text-[18px]">
                schedule
              </span>
              <span>Delayed</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div
                className="h-14 w-14 rounded-full bg-cover bg-center ring-2 ring-primary/20 transition-transform group-hover:scale-110"
                style={{ backgroundImage: `url('${mutawif.photoUrl}')` }}
              />
              <div className="absolute -bottom-1 -right-1 bg-surface-dark p-0.5 rounded-full">
                <div className="bg-primary text-black rounded-full p-1 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[12px]">
                    star
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-white text-lg font-bold">{mutawif.name}</p>
                <span className="text-xs font-bold bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                  #8291
                </span>
              </div>
              <p className="text-gray-400 text-sm font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-yellow-500">
                  star
                </span>
                {mutawif.rating} • Official Mutawif
              </p>
            </div>
            <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined">call</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <button
              onClick={() => navigate("/booking")}
              className="col-span-3 flex items-center justify-center gap-2 bg-primary hover:brightness-110 text-black rounded-xl h-12 font-bold shadow-sm shadow-primary/30 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Chat with Mutawif
            </button>
            <button
              onClick={() => navigate("/cancellation")}
              className="col-span-2 flex items-center justify-center bg-surface-dark border-2 border-red-900/50 text-red-400 rounded-xl h-12 font-bold hover:bg-red-900/20 active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
