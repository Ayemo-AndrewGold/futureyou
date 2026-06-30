"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  /** Button text (preferred) */
  label?: string;

  /** Legacy support */
  title?: string;

  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;

  type?: "button" | "submit" | "reset";
  className?: string;
  bgcolor?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  title,
  onClick,
  isDisabled = false,
  isLoading = false,
  type = "button",
  className = "",
  bgcolor = "bg-[#293C97]",
  color = "text-white",
}) => {
  const buttonText = label || title;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`
        flex justify-center items-center gap-2
        border font-lato text-lg font-medium leading-none
        rounded-[10px] px-6 py-3
        transition-all duration-300 ease-in-out
        hover:opacity-90
        disabled:cursor-not-allowed disabled:opacity-60
        ${bgcolor} ${color}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Loading...
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
