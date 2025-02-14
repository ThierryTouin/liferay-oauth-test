import React, { useEffect } from 'react';
import { useAuth, AuthContextProps } from "react-oidc-context";
import { ErrorMessage, useAppSharedContext } from 'common-components';

const PrivatePage: React.FC = () => {

  const oidc: AuthContextProps = useAuth();
  const user = oidc.user;

  const firstName: string | undefined = user?.profile?.given_name;
  const lastName: string | undefined = user?.profile?.family_name;
  const email: string | undefined = user?.profile?.email;
  const accessToken: string | undefined = user?.access_token;

  const { appSharedContextParams, setAppSharedContextParams } = useAppSharedContext();

  useEffect(() => {
    if (user) {
      const params = {
        firstName: firstName || "Unknown",
        lastName: lastName || "Unknown",
        email: email || "Unknown",
        accessToken: accessToken || ""
      };
      console.log('APP1 : Setting AppSharedContextParams:', params);
      setAppSharedContextParams(params);

      const element = document.querySelector('app2-docker-example');
      if (element) {
        console.log('APP1 : Found app2-docker-example element');
        (element as any).appSharedContextParams = params;
      } else {
        console.log('APP1 : app2-docker-example element not found');
      }

    }
  }, [user, user?.access_token, setAppSharedContextParams]);

  if (!user) {
    return <ErrorMessage message="User needs to be signed in to use this feature" />;
  }

  return (
    <div>
      <h3>Private Page</h3>
      <nav>
        <a href="/">Go to Home</a>
      </nav>
      <br/>
      <h3>User information returned by SSO:</h3>
      <ul>
        <li><strong>First Name:</strong> {appSharedContextParams.firstName}</li>
        <li><strong>Last Name:</strong> {appSharedContextParams.lastName}</li>
        <li><strong>Email:</strong> {appSharedContextParams.email}</li>
        <li><strong>Token:</strong> {appSharedContextParams.email}</li>
      </ul>
      <app2-docker-example/>
    </div>
  );
};

export default PrivatePage;