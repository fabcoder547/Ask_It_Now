import { render } from "@testing-library/react"
import React from "react"

import {Redirect,Route} from "react-router-dom"
import { isAuthenticated } from "../components/Auth/helper"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    ></Route>
  );
};
export default PrivateRoute;


