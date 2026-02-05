import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";

const RoleSelector: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* Logo/Branding */}
        <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom duration-700">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 mx-auto animate-pulse-glow">
            <span className="material-symbols-outlined text-primary text-4xl">
              mosque
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Umrah Guide</h1>
          <p className="text-slate-400 text-sm max-w-xs">
            Your spiritual companion for a blessed pilgrimage journey
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="w-full max-w-sm space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          {/* Pilgrim Card */}
          <Card
            hoverable
            onClick={() => navigate("/find-guide")}
            className="!bg-gradient-to-br from-surface-dark to-accent-dark border-primary/20 hover:border-primary/50"
            padding="lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  person
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  I'm a Pilgrim
                </h3>
                <p className="text-slate-400 text-sm">
                  Find guides, book services, track your journey
                </p>
              </div>
              <span className="material-symbols-outlined text-primary">
                arrow_forward
              </span>
            </div>
          </Card>

          {/* Partner/Guide Card */}
          <Card
            hoverable
            onClick={() => navigate("/partner/dashboard")}
            className="!bg-gradient-to-br from-surface-dark to-accent-dark border-emerald-500/20 hover:border-emerald-500/50"
            padding="lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">
                  badge
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  I'm a Guide/Driver
                </h3>
                <p className="text-slate-400 text-sm">
                  Manage bookings, earnings, and availability
                </p>
              </div>
              <span className="material-symbols-outlined text-emerald-400">
                arrow_forward
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 pb-10">
        <div className="max-w-sm mx-auto">
          <p className="text-center text-slate-500 text-xs mb-4">
            Quick access
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => navigate("/refund-policy")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent-dark/50 hover:bg-accent-dark transition-colors"
            >
              <span className="material-symbols-outlined text-slate-400 text-xl">
                policy
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Policies
              </span>
            </button>
            <button
              onClick={() => navigate("/booking-care")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent-dark/50 hover:bg-accent-dark transition-colors"
            >
              <span className="material-symbols-outlined text-slate-400 text-xl">
                support_agent
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Support
              </span>
            </button>
            <button
              onClick={() => navigate("/preferences")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent-dark/50 hover:bg-accent-dark transition-colors"
            >
              <span className="material-symbols-outlined text-slate-400 text-xl">
                settings
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Preferences
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full" />
    </div>
  );
};

export default RoleSelector;
