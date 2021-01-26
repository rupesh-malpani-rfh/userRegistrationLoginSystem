import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing-wrapper">
      <div className="dark-overlay">
        <div className="landing-inner">
          <p className="lead">Welcome to User Profile Dashboard</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
