import React, { useEffect, useState } from 'react';
import { useAuth } from "react-oidc-context";
import { ApimService } from 'common-services';
import { DebugData } from '../models/DebugData';
import { DebugDataProps } from '../models/DebugDataProps';
import { useAppContext, AppConfiguration } from 'common-components'; 

export const DebugDataDisplay: React.FC<DebugDataProps> = (props) => {
  
    const [debugData, setDebugData] = useState<DebugData | null>(null);
    const appId = props.appId;
    const auth = useAuth();
    const authToken: string = auth.user?.access_token ?? "";

    const appconfig: AppConfiguration = useAppContext();

    useEffect(() => {
      
      async function fetchData() {
        try {
            
           // Use an empty string if undefined
          console.log("authToken:", authToken);
  
          const apimClient = new ApimService(appId, authToken);
          const debugResponse = await apimClient.debugRoute();
          setDebugData(debugResponse);
          
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();

    }, [appId, authToken]); // Call the useEffect when a modification occurs in variables

    const payloadColor = String(appconfig.appCustomConfig.payloadColor);

    const style = {
      color: payloadColor
    };

    return !debugData ? (
      <div>Loading POC2 ...</div>
    ) : (
        <> 
        <h3>Returned JSON from APIM</h3>
        <pre style={style}>
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </>
    );
  };