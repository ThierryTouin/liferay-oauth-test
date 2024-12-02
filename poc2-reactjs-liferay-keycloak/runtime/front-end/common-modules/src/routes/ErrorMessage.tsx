import React from 'react';
import "../styles/route-style.css";

// Define the props for the ErrorMessage component
interface ErrorMessageProps {
  message: string;  // The error message to display
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-container">
      <h1 className="error-heading">Authentication Error</h1>
      <p className="error-message">{message}</p>
    </div>
  );
};