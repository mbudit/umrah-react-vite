import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingCarePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const mockBookings = [
    {
      id: "BK001",
      guideName: "Mutawif Ahmad Hafiz",
      date: "Today, 2:00 PM",
      status: "confirmed",
      statusLabel: "Confirmed",
    },
    {
      id: "BK002",
      guideName: "Sheikh Abdullah",
      date: "Tomorrow, 9:00 AM",
      status: "pending",
      statusLabel: "Pending Confirmation",
    },
  ];

  const historyBookings = [
    {
      id: "BK000",
      guideName: "Ustaz Ibrahim",
      date: "Jan 15, 2025",
      status: "completed",
      statusLabel: "Completed",
      rating: 5,
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/20 text-emerald-400";
      case "pending":
        return "bg-amber-500/20 text-amber-400";
      case "completed":
        return "bg-slate-500/20 text-slate-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Booking Care</h1>
        <button className="btn-icon">
          <span className="material-symbols-outlined">support_agent</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "active"
              ? "bg-primary text-black"
              : "bg-surface-dark text-slate-400 hover:text-white"
          }`}
        >
          Active Bookings
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "history"
              ? "bg-primary text-black"
              : "bg-surface-dark text-slate-400 hover:text-white"
          }`}
        >
          History
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === "active" ? (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-surface-dark rounded-2xl p-4 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-mono">
                    {booking.id}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-lg ${getStatusStyle(booking.status)}`}
                  >
                    {booking.statusLabel}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">
                  {booking.guideName}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{booking.date}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/tracking")}
                    className="flex-1 py-2 bg-primary/20 text-primary font-bold text-sm rounded-xl"
                  >
                    Track
                  </button>
                  <button
                    onClick={() => navigate("/cancellation")}
                    className="flex-1 py-2 bg-surface-dark border border-slate-700 text-white font-bold text-sm rounded-xl"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/refund-policy")}
                  className="flex flex-col items-center gap-2 p-4 bg-surface-dark rounded-xl border border-slate-800"
                >
                  <span className="material-symbols-outlined text-primary">
                    policy
                  </span>
                  <span className="text-sm text-white font-medium">
                    Refund Policy
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-surface-dark rounded-xl border border-slate-800">
                  <span className="material-symbols-outlined text-primary">
                    chat
                  </span>
                  <span className="text-sm text-white font-medium">
                    Live Support
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {historyBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-surface-dark rounded-2xl p-4 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-mono">
                    {booking.id}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-lg ${getStatusStyle(booking.status)}`}
                  >
                    {booking.statusLabel}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">
                  {booking.guideName}
                </h3>
                <p className="text-sm text-slate-400 mb-2">{booking.date}</p>
                {booking.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(booking.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-yellow-500 text-sm"
                      >
                        star
                      </span>
                    ))}
                    <span className="text-sm text-slate-400 ml-1">
                      Your rating
                    </span>
                  </div>
                )}
              </div>
            ))}

            {historyBookings.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-slate-600 text-5xl mb-4">
                  history
                </span>
                <p className="text-slate-400">No booking history yet</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingCarePage;
