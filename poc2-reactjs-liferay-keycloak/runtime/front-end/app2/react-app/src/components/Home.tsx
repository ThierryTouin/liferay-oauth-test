import { ErrorMessage } from 'common-modules';
import React from 'react';
import { useAuth } from "react-oidc-context";

const Home: React.FC = () => {

  const oidc = useAuth();

  const user = oidc.user;

  if (!user) {
    return <ErrorMessage message="User need to be signed in to use this feature" />;
  }

  const firstName: string | undefined = user?.profile?.given_name;
  const lastName: string | undefined = user?.profile?.family_name;
  const email: string | undefined = user?.profile?.email;

  return (
    <div>
      <h3>APP Description</h3>
        <p>This react app is Private : it leverage : 
          <ul>
            <li><b>Sso</b> to authentify using Open Id Connect procotole in <b>silent mode</b>.</li>
          </ul>   
        This application is deployed <b>in separate container hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay. 
          This app leverage a <b>centralized and shared react library</b> to centralize common devs. This application <b>is integrated in Liferay as remote app</b> using pure OSGI config 
          (without declared client-extension in Liferay workspace)</p>
      <br/>    
      <h3>User informations returned by SSO :</h3>
      <p><strong>First Name:</strong> {firstName || "Unknown"}</p>
      <p><strong>Last Name:</strong> {lastName || "Unknown"}</p>
      <p><strong>Email:</strong> {email || "Unknown"}</p>
    </div>
  );

};

export default Home;