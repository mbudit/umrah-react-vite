import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  padding = "md",
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-surface-dark 
        rounded-2xl 
        border border-slate-200 dark:border-slate-800 
        shadow-sm
        ${paddingStyles[padding]}
        ${hoverable ? "cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200" : ""}
        ${onClick ? "active:scale-[0.99]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
