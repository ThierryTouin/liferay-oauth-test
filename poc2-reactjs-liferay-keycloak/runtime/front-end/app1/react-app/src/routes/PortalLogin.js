import React from "react";
import '../styles/route-style.css'; // Import the CSS file

const PortalLogin = () => (
  <div className="container">
    <h2 className="heading">Please sign in to access the application</h2>
    <p className="paragraph">
      You need to authenticate using OpenID Connect to use this application.
    </p>
  </div>
);

export default PortalLogin;
