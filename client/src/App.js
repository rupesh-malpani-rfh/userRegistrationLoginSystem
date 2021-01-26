import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import AboutUs from "./components/layout/AboutUs";
import ContactUs from "./components/layout/ContactUs";
import Testimonial from "./components/layout/Testimonial";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/aboutus" exact component={AboutUs} />
              <PrivateRoute path="/contactus" exact component={ContactUs} />
              <PrivateRoute path="/testimonial" exact component={Testimonial} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
