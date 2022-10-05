import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SignIn from "../views/Auth/SignIn";
import SignUp from "../views/Auth/SignUp";


export default function AppRouter() {
    return (
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={<SignIn />}
            />
            <Route 
              path="/register" 
              element={<SignUp />}
              />
          </Routes>
      </Router>
    )
}