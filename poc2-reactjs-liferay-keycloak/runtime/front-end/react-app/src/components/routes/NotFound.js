// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>404</h1>
    <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
    <Link to="/" style={styles.link}>
      Go back to the homepage
    </Link>
  </div>
);

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10%",
    padding: "20px",
  },
  title: {
    fontSize: "5rem",
    color: "#FF6F61",
  },
  message: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007BFF",
    fontSize: "1.2rem",
  },
};

export default NotFound;
