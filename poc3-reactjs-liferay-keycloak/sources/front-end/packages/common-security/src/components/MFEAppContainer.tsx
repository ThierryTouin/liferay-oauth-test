// Import React and FC (Function Component) type from React
import React, { FC } from 'react';
import { MFEAppContainerProps } from '../models/MFEAppContainerProps';
import { AppConfiguration } from '../models/AppConfiguration';
import { useAppContext } from "./context/AppContext"; 
import Header from './Header';

// Define the MfeAppContainer component with children
export const MFEAppContainer: FC<MFEAppContainerProps> = ({ children }) => {

    const context: AppConfiguration = useAppContext();

    const appId: string = context.appId;
    const imageUrl: string = context.appImagesCompleteUrl;
    const titleText: string = context.appVersion;

    return (
        // Render a div with the class name "mfe-app-container"
        <div className="mfe-app-container">
            <Header imageUrl={imageUrl}>
                <h1>Application : {appId} from POC3 : {titleText}</h1>
            </Header>
            {children} {/* Render any children passed to the component */}        
        </div>
    );
};
