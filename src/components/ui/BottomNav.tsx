import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface BottomNavProps {
  items?: NavItem[];
  variant?: "pilgrim" | "partner";
}

const pilgrimItems: NavItem[] = [
  { icon: "home", label: "Home", path: "/" },
  { icon: "search", label: "Find", path: "/find-guide" },
  { icon: "calendar_today", label: "Bookings", path: "/booking" },
  { icon: "person", label: "Profile", path: "/profile" },
];

const partnerItems: NavItem[] = [
  { icon: "home", label: "Home", path: "/partner/dashboard" },
  { icon: "work", label: "Jobs", path: "/partner/jobs" },
  { icon: "account_balance_wallet", label: "Wallet", path: "/partner/wallet" },
  { icon: "person", label: "Profile", path: "/partner/profile" },
];

const BottomNav: React.FC<BottomNavProps> = ({
  items,
  variant = "pilgrim",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems =
    items || (variant === "partner" ? partnerItems : pilgrimItems);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-2 safe-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  isActive ? "material-symbols-fill" : ""
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
    </nav>
  );
};

export default BottomNav;
