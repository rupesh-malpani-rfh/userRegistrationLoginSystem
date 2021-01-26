import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
  });

  const {
    userName,
    password,
    email,
    firstName,
    lastName,
    gender,
    country,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      userName,
      password,
      email,
      firstName,
      lastName,
      gender,
      country,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            name="userName"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={firstName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lastname"
            name="lastName"
            value={lastName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="male" style={{ marginRight: "10px" }}>
            Male
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            onChange={(e) => onChange(e)}
            value="female"
          />
          <label htmlFor="female">Female</label>
        </div>
        <div className="form-group">
          <select name="country" value={country} onChange={(e) => onChange(e)}>
            <option value="0">* Select Your Country</option>
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="UAE">UAE</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
