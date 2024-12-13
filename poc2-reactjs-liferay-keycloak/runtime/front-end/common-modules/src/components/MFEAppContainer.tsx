// Import React and FC (Function Component) type from React
import React, { FC, ReactNode } from 'react';
import { MFEAppContainerProps } from '../models/MFEAppContainerProps';
import "../styles/route-style.css";

// Define the MfeAppContainer component with children
export const MFEAppContainer: FC<MFEAppContainerProps> = ({ children, appId, titleText }) => {
    return (
        // Render a div with the class name "mfe-app-container"
        <div className="mfe-app-container">
            <h1>Application :{appId} from POC2 : {titleText}</h1>
            {children} {/* Render any children passed to the component */}        
        </div>
    );
};
