import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadUser } from "../../actions/auth";

const Dashboard = ({ loadUser, authReducer: { user } }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.firstName} on
          board
        </p>
        <h2 class="text-dark">{user && user.firstName}'s Details</h2>

        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user && user.userName}</td>
              <td>{user && user.email}</td>
              <td>{user && user.firstName}</td>
              <td>{user && user.lastName}</td>
              <td>{user && user.gender}</td>
              <td>{user && user.country}</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
