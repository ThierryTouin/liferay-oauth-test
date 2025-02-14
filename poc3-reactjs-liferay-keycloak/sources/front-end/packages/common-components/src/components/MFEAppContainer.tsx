// Import React and FC (Function Component) type from React
import React, { FC } from 'react';
import styled from 'styled-components';
import { MFEAppContainerProps } from '../models/MFEAppContainerProps';
import { AppConfiguration } from '../models/AppConfiguration';
import { useAppContext } from "../context/AppContext"; 
import Header from './Header';

const Container = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
  }

  .header__logo {
    flex: 0 0 auto;
  }

  .header__logo-image {
    max-height: 50px;
  }

  .header__content {
    flex: 1;
    text-align: left;
    padding-left: 10px;
  }
`;

// Define the MfeAppContainer component with children
export const MFEAppContainer: FC<MFEAppContainerProps> = ({ children }) => {

    const context: AppConfiguration = useAppContext();

    const appId: string = context.appId;
    const imageUrl: string = context.appImagesCompleteUrl;
    const titleText: string = context.appVersion;

    return (
        <Container>
            <Header imageUrl={imageUrl}>
                <h1>Application : {appId} from POC3 : {titleText}</h1>
            </Header>
            {children} {/* Render any children passed to the component */}        
        </Container>
    );
};
