// Import React and FC (Function Component) type from React
import React, { FC } from 'react';
import { MFEAppContainerProps } from '../models/MFEAppContainerProps';
import Header from '../components/Header';
import "../styles/route-style.css";

// Define the MfeAppContainer component with children
export const MFEAppContainer: FC<MFEAppContainerProps> = ({ children, appId, titleText, imageUrl }) => {
    
    return (
        // Render a div with the class name "mfe-app-container"
        <div className="mfe-app-container">
            <Header imageUrl={imageUrl}>
                <h1>Application : {appId} from POC2 : {titleText}</h1>
            </Header>
            {children} {/* Render any children passed to the component */}        
        </div>
    );
};
