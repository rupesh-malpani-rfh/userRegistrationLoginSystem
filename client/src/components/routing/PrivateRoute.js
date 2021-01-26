import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// const PrivateRoute = ({
//   component: Component,
//   auth: { isAuthenticated, loading },
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       loading ? (
//         <Spinner />
//       ) : isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

const PrivateRoute = ({
  component: Component,
  authReducer: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
