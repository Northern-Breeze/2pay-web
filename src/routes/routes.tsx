import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ActivateAccount from "../views/Auth/ActivateAccount";

import PrivateRoutes from "./PrivateRoutes";
import Pay from '../views/PayClient';
import SignIn from "../views/Auth/SignIn";
import SignUp from "../views/Auth/SignUp";
import Home from "../views/Home";
import Search from "../views/Search";


export default function AppRouter() {
    return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoutes component={Home} />}
            />
            <Route 
              path="/login" 
              element={<SignIn />}
            />
            <Route
              path="/activate"
              element={<ActivateAccount />}
            />
            <Route 
              path="/register" 
              element={<SignUp />}
              />
              <Route
                path="/search"
                element={<PrivateRoutes  component={Search} />}
                />
                <Route
                  path="/pay"
                  element={<PrivateRoutes component={Pay} />}
                  />
          </Routes>
      </Router>
    )
}