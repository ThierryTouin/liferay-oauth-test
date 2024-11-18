import React, { useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import {ApimService} from '../services/ApimService.js';

const Display = ( props ) => {

    const [debugData, setDebugData] = React.useState(null);
	const appId = props.appId;
	const auth = useAuth();

	useEffect(() => {
		async function fetchData() {
			try {
				
				const authToken = auth.user?.access_token;
				//const authToken = "iuiuipuhpiuh";
				console.log("authToken:" + authToken);

				const apimClient = new ApimService(appId, authToken);
				const debugResponse = await apimClient.debugRoute();
				setDebugData(debugResponse);

			} catch (error) {
				console.error(error);
			}

		}
		fetchData();
	}, [appId]);

	return !debugData ? (
		<div>Loading POC2 ...</div>
	) : (
		<div>
			<h2>APP1 : HttpBin Debug Response</h2>

            <pre>
                {JSON.stringify(debugData, null, 2)}
            </pre>
		</div>
	);
}

export default Display;