import React from "react";

function Button({
  title,
  variant = "contained",
  color = "primary",
  type = "button",
  onClick,
  fullWidth = false,
  disabled,
}) {
  let className = fullWidth ? "w-full rounded " : "pr-2 pl-2 rounded ";
  if (variant === "contained" && !disabled) {
    className += `bg-slate-700 text-white`;
  } else if (variant === "outlined" && !disabled) {
    className += `border-${color} text-white`;
  }

  if (disabled) {
    className += " opacity-50 cursor-not-allowed";
  }

  return (
    <button
      className={`py-2 px-4 border ${className} bg-slate-500 hover:bg-slate-700 border-slate-700`}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;



