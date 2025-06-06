import React from 'react';


interface ButtonProps {
  buttonText: string; 
  onClick?: () => void;
  className?: string; 
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

// Use the ButtonProps interface for the component's props
const Button: React.FC<ButtonProps> = ({ buttonText, onClick, className, type = 'button', href }) => {
  if (href) {
    return (
      <a 
        href={href}
        className={`px-6 py-3 lg:text-base text-xs rounded border font-medium transition cursor-pointer ${className || ''}`}
      >
        {buttonText}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 lg:text-base text-xs rounded border font-medium transition ${className || ''}`} 
    >
      {buttonText}
    </button>
  );
}

export default Button;
