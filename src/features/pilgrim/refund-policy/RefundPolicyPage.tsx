import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PolicyStep } from "@/types";

const RefundPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"scheduled" | "now">("scheduled");

  const scheduledPolicies: PolicyStep[] = [
    {
      id: "1",
      title: "Free Cancellation",
      badge: "100% REFUND",
      badgeType: "success",
      subtitle: "Up to 24 hours before",
      description:
        "Cancel anytime before 24 hours of your scheduled service for a full refund.",
      icon: "check_circle",
      colorClass: "text-emerald-400",
    },
    {
      id: "2",
      title: "Partial Refund",
      badge: "50% REFUND",
      badgeType: "warning",
      subtitle: "24 to 6 hours before",
      description:
        "Cancellations made within this window will receive half of the booking amount.",
      icon: "schedule",
      colorClass: "text-amber-400",
    },
    {
      id: "3",
      title: "No Refund",
      badge: "NO REFUND",
      badgeType: "error",
      subtitle: "Less than 6 hours",
      description:
        "Cancellations within 6 hours of the scheduled time are non-refundable.",
      icon: "cancel",
      colorClass: "text-rose-400",
    },
  ];

  const nowPolicies: PolicyStep[] = [
    {
      id: "1",
      title: "Grace Period",
      badge: "100% REFUND",
      badgeType: "success",
      subtitle: "First 2 minutes",
      description:
        "Cancel within 2 minutes of booking for a full refund, no questions asked.",
      icon: "timer",
      colorClass: "text-emerald-400",
    },
    {
      id: "2",
      title: "Mutawif En Route",
      badge: "75% REFUND",
      badgeType: "warning",
      subtitle: "Before arrival",
      description:
        "If your Mutawif is on the way, you'll receive 75% of the booking amount.",
      icon: "directions_car",
      colorClass: "text-amber-400",
    },
    {
      id: "3",
      title: "After Arrival",
      badge: "NO REFUND",
      badgeType: "error",
      subtitle: "Mutawif at location",
      description:
        "Once your Mutawif has arrived at the pickup point, cancellations are non-refundable.",
      icon: "location_on",
      colorClass: "text-rose-400",
    },
  ];

  const policies = activeTab === "scheduled" ? scheduledPolicies : nowPolicies;

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "error":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
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
        <h1 className="text-lg font-bold">Refund Policy</h1>
        <div className="w-10" />
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-4">
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "scheduled"
              ? "bg-primary text-black"
              : "bg-surface-dark text-slate-400 hover:text-white"
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setActiveTab("now")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "now"
              ? "bg-primary text-black"
              : "bg-surface-dark text-slate-400 hover:text-white"
          }`}
        >
          Book Now
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          <div>
            <p className="text-primary font-medium text-sm">
              {activeTab === "scheduled"
                ? "For pre-booked services with a scheduled date and time."
                : "For on-demand services where a Mutawif is matched immediately."}
            </p>
          </div>
        </div>

        {/* Policy Steps */}
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <div
              key={policy.id}
              className="bg-surface-dark rounded-2xl p-4 border border-slate-800 animate-in fade-in slide-in-from-bottom duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${policy.colorClass}`}
                >
                  <span className="material-symbols-outlined">
                    {policy.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{policy.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getBadgeStyle(policy.badgeType)}`}
                    >
                      {policy.badge}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-2">
                    {policy.subtitle}
                  </p>
                  <p className="text-sm text-slate-400">{policy.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            <details className="bg-surface-dark rounded-xl border border-slate-800 group">
              <summary className="p-4 font-medium text-white cursor-pointer flex items-center justify-between">
                How long do refunds take?
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-400">
                Refunds are processed within 3-5 business days back to your
                original payment method.
              </div>
            </details>
            <details className="bg-surface-dark rounded-xl border border-slate-800 group">
              <summary className="p-4 font-medium text-white cursor-pointer flex items-center justify-between">
                What if the Mutawif cancels?
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-400">
                If your Mutawif cancels, you'll receive a full 100% refund
                automatically.
              </div>
            </details>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-background-dark border-t border-slate-800">
        <button
          onClick={() => navigate("/booking-care")}
          className="w-full py-4 bg-surface-dark border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">support_agent</span>
          Contact Support
        </button>
      </footer>
    </div>
  );
};

export default RefundPolicyPage;
