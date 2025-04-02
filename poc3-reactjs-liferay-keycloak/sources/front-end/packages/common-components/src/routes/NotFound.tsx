import React from "react";
import { ErrorMessage } from './ErrorMessage';

// No props for this component, so we use React.FC with no props.
export const NotFound: React.FC = () => (
  <>
    <ErrorMessage message="Oops! The page you are looking for does not exist." />
  </>
);