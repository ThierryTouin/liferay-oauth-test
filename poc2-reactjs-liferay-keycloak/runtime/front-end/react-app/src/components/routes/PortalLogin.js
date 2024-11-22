import React from "react";

const PortalLogin = () => (
  <div style={styles.container}>
    <h2 style={styles.heading}>Please sign in to access the application</h2>
    <p style={styles.paragraph}>
      You need to authenticate using OpenID Connect to use this application.
    </p>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '20px',
  },
};

export default PortalLogin;