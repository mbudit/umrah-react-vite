import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/ui";
import { QUICK_ACTIONS } from "@/constants";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const stats = {
    todayEarnings: 450,
    weekEarnings: 2840,
    rating: 4.92,
    completedTrips: 156,
  };

  const upcomingJobs = [
    {
      id: "1",
      title: "Umrah Guidance - Full Day",
      time: "2:00 PM Today",
      location: "Abraj Al Bait Tower",
      pilgrims: 4,
      amount: 200,
    },
    {
      id: "2",
      title: "Masjid Visit - Half Day",
      time: "9:00 AM Tomorrow",
      location: "Hotel Fairmont",
      pilgrims: 2,
      amount: 120,
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-400 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-white">Ahmad Hafiz</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${
                isOnline
                  ? "bg-primary/20 text-primary"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isOnline ? "bg-primary animate-pulse" : "bg-slate-500"}`}
              />
              {isOnline ? "Online" : "Offline"}
            </button>
            <button className="btn-icon bg-surface-dark">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-gradient-to-br from-primary/20 to-emerald-500/10 rounded-3xl p-5 border border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                Today's Earnings
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                SAR {stats.todayEarnings}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                This Week
              </p>
              <p className="text-lg font-bold text-primary mt-1">
                SAR {stats.weekEarnings}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">
                star
              </span>
              <span className="text-white font-bold">{stats.rating}</span>
              <span className="text-slate-400 text-sm">Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>
              <span className="text-white font-bold">
                {stats.completedTrips}
              </span>
              <span className="text-slate-400 text-sm">Trips</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-3 bg-surface-dark rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center`}
              >
                <span className={`material-symbols-outlined ${action.color}`}>
                  {action.icon}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Jobs */}
      <div className="px-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            Upcoming Jobs
          </h2>
          <button
            onClick={() => navigate("/partner/jobs")}
            className="text-primary text-xs font-bold"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {upcomingJobs.map((job) => (
            <div
              key={job.id}
              className="bg-surface-dark rounded-2xl p-4 border border-slate-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{job.title}</h3>
                  <p className="text-sm text-primary font-medium">{job.time}</p>
                </div>
                <span className="text-lg font-bold text-white">
                  SAR {job.amount}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    group
                  </span>
                  {job.pilgrims} pilgrims
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav variant="partner" />
    </div>
  );
};

export default DashboardPage;
