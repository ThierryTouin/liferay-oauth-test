import React, { useEffect, useState } from 'react';
import { useAuth } from "react-oidc-context";
import { ApimService } from 'common-services';
import { DebugData } from '../models/DebugData';
import { DebugDataProps } from '../models/DebugDataProps';

export const DebugDataDisplay: React.FC<DebugDataProps> = (props) => {
  
    const [debugData, setDebugData] = useState<DebugData | null>(null);
    const appId = props.appId;
    const auth = useAuth();
  
    useEffect(() => {
      async function fetchData() {
        try {
            
          const authToken: string = auth.user?.access_token ?? ""; // Use an empty string if undefined
          console.log("authToken:", authToken);
  
          const apimClient = new ApimService(appId, authToken);
          const debugResponse = await apimClient.debugRoute();
          setDebugData(debugResponse);
  
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [appId, auth.user?.access_token]); // Ajout de auth.user?.access_token dans les dépendances
  
    return !debugData ? (
      <div>Loading POC2 ...</div>
    ) : (
        <> 
        <h3>Returned JSON from APIM</h3>
        <pre>
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </>
    );
  };