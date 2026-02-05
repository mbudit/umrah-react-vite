import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/ui";

const JobManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "pending" | "active" | "completed"
  >("pending");

  const pendingJobs = [
    {
      id: "1",
      title: "Full Day Umrah Guidance",
      pilgrimName: "Mohammed Ali",
      time: "3:00 PM Today",
      pilgrims: 4,
      amount: 280,
      urgency: "high",
      expiresIn: "2 mins",
    },
    {
      id: "2",
      title: "Masjid Visit - Morning",
      pilgrimName: "Fatima Khan",
      time: "9:00 AM Tomorrow",
      pilgrims: 2,
      amount: 150,
      urgency: "normal",
      expiresIn: "15 mins",
    },
  ];

  const activeJobs = [
    {
      id: "3",
      title: "Umrah Guidance",
      pilgrimName: "Ahmad Abdullah",
      time: "In Progress",
      pilgrims: 3,
      status: "in_progress",
    },
  ];

  const completedJobs = [
    {
      id: "4",
      title: "Half Day Tour",
      pilgrimName: "Yusuf Ibrahim",
      date: "Yesterday",
      amount: 180,
      rating: 5,
    },
  ];

  const getUrgencyStyle = (urgency: string) => {
    return urgency === "high"
      ? "bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse"
      : "bg-amber-500/20 text-amber-400 border-amber-500/30";
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button
          onClick={() => navigate("/partner/dashboard")}
          className="btn-icon"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Job Management</h1>
        <button className="btn-icon relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-4">
        {(["pending", "active", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all relative ${
              activeTab === tab
                ? "bg-primary text-black"
                : "bg-surface-dark text-slate-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "pending" && pendingJobs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingJobs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === "pending" && (
          <div className="space-y-4">
            {pendingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface-dark rounded-2xl p-4 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${getUrgencyStyle(job.urgency)}`}
                  >
                    Expires in {job.expiresIn}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    SAR {job.amount}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{job.title}</h3>
                <p className="text-sm text-slate-400 mb-3">
                  {job.pilgrimName} • {job.pilgrims} pilgrims
                </p>
                <p className="text-primary font-medium text-sm mb-4">
                  {job.time}
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-surface-dark border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                    Decline
                  </button>
                  <button
                    onClick={() => navigate("/partner/driver")}
                    className="flex-1 py-3 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}

            {pendingJobs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-slate-600 text-5xl mb-4">
                  inbox
                </span>
                <p className="text-slate-400">No pending requests</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "active" && (
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface-dark rounded-2xl p-4 border border-primary/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-primary/20 text-primary">
                    In Progress
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{job.title}</h3>
                <p className="text-sm text-slate-400 mb-4">
                  {job.pilgrimName} • {job.pilgrims} pilgrims
                </p>

                <button
                  onClick={() => navigate("/partner/driver")}
                  className="w-full py-3 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">navigation</span>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface-dark rounded-2xl p-4 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500">{job.date}</span>
                  <span className="text-lg font-bold text-white">
                    SAR {job.amount}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{job.title}</h3>
                <p className="text-sm text-slate-400 mb-2">{job.pilgrimName}</p>
                <div className="flex items-center gap-1">
                  {[...Array(job.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-yellow-500 text-sm"
                    >
                      star
                    </span>
                  ))}
                  <span className="text-slate-400 text-sm ml-1">
                    Pilgrim rating
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav variant="partner" />
    </div>
  );
};

export default JobManagementPage;
