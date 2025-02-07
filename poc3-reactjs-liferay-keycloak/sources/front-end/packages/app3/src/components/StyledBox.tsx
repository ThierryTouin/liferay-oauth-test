// src/components/StyledBox.tsx
import styled from "styled-components";

// Default values for the styles
const DEFAULT_BORDER_COLOR = "green";
const DEFAULT_BG_COLOR = "#e6ffe6";
const DEFAULT_HEADER_COLOR = "green";
const DEFAULT_TEXT_COLOR = "black";

// Definition of types for the props with the $ prefix
interface StyledBoxProps {
  borderColor?: string;
  bgColor?: string;
  headerColor?: string;
  textColor?: string;
}

// Using styled-components with default values and $ prefix for custom props
export const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['borderColor', 'bgColor', 'headerColor', 'textColor'].includes(prop), // Exclude these props from being forwarded to the DOM
})<StyledBoxProps>`
  border: 2px solid ${(props) => props.borderColor || DEFAULT_BORDER_COLOR}; /* Dynamic border color */
  padding: 16px; /* Padding inside the box */
  margin: 16px 0; /* Margin outside the box */
  border-radius: 8px; /* Rounded corners */
  background-color: ${(props) => props.bgColor || DEFAULT_BG_COLOR}; /* Dynamic background color */
  color: ${(props) => props.textColor || DEFAULT_TEXT_COLOR}; /* Text color application */

  h2 {
    color: ${(props) => props.headerColor || DEFAULT_HEADER_COLOR}; /* Dynamic color for the h2 header */
  }
`;

