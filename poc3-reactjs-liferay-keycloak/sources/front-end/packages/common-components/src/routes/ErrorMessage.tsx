import React from 'react';
import styled from 'styled-components';

// Define the props for the ErrorMessage component
interface ErrorMessageProps {
  message: string;  // The error message to display
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
  background-color: #f8d7da; /* Light red background for error */
  color: #721c24; /* Dark red color for text */
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .error-heading {
    font-size: 24px;
    color: #721c24;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .error-message {
    font-size: 1.2rem;
    color: #721c24;
    margin-bottom: 20px;
    max-width: 600px;
  }
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <h1 className="error-heading">Error</h1>
      <p className="error-message">{message}</p>
    </ErrorContainer>
  );
};