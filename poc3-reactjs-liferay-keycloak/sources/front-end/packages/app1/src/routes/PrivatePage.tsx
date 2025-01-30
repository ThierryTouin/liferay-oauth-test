import React from 'react';
import { useAuth } from "react-oidc-context";
import { ErrorMessage } from 'common-security';


// This will works well in monorepo configuration but not in multi repo
import '../../../app2/build/static/js/bundle.js';

const PrivatePage: React.FC = () => {

  /*const oidc = useAuth();
  console.log("OIDC : " + oidc)
  const user = oidc.user;

  if (!user) {
    return <ErrorMessage message="User need to be signed in to use this feature" />;
  }

  const firstName: string | undefined = user?.profile?.given_name;
  const lastName: string | undefined = user?.profile?.family_name;
  const email: string | undefined = user?.profile?.email;*/

  return (
    <div>
      <h3>Private Page</h3>
      <nav>
        <a href="/">Go to Home</a>
      </nav>
      <br/>    
      {/*
      <h3>User informations returned by SSO :</h3>
      <p><strong>First Name:</strong> {firstName || "Unknown"}</p>
      <p><strong>Last Name:</strong> {lastName || "Unknown"}</p>
      <p><strong>Email:</strong> {email || "Unknown"}</p>
      */}
       <app2-docker-example/>
    </div>
  );
};

export default PrivatePage;
