import React, { useEffect, useState } from 'react';
import { useAuth } from "react-oidc-context";
import { ApimService } from 'common-modules';
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
      <div>

        <h3>APP Description</h3>
        <p>This react app is Private : it leverage : 
          <ul>
          <li><b>Sso</b> to authentify using Open Id Connect procotole in <b>silent mode</b>.</li>
          <li><b>Apim</b> to grant securised access to Back End API.</li>
          </ul>   
        This application is deployed <b>in separate container hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay. 
          This app leverage a <b>centralized and shared react library</b> to centralize common devs. This application <b>is integrated in Liferay as remote app</b> using pure OSGI config 
          (without declared client-extension in Liferay workspace)</p>

        <h3>Returned JSON from APIM</h3>
        <pre>
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>
    );
  };