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
      <h2>Welcome to Home Page!</h2>
      <p><strong>First Name:</strong> {firstName || "Unknown"}</p>
      <p><strong>Last Name:</strong> {lastName || "Unknown"}</p>
      <p><strong>Email:</strong> {email || "Unknown"}</p>
    </div>
  );

};

export default Home;