import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = true,
  rightAction,
  transparent = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between px-4 py-4 ${
        transparent
          ? "bg-transparent"
          : "bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="btn-icon -ml-2"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
        )}
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-2">{rightAction}</div>
    </header>
  );
};

export default Header;
