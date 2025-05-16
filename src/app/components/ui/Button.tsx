import React from 'react';


interface ButtonProps {
  buttonText: string; 
  onClick?: () => void;
  className?: string; 
  type?: 'button' | 'submit' | 'reset'; 
}

// Use the ButtonProps interface for the component's props
// Destructure buttonText from props
const Button: React.FC<ButtonProps> = ({ buttonText, onClick, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 lg:text-base text-xs rounded border font-medium  transition ${className || ''}`} 
    >
      {buttonText}
    </button>
  );
}

export default Button;
