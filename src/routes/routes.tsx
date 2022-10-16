import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivateAccount from "../views/Auth/ActivateAccount";

import PrivateRoutes from "./PrivateRoutes";
import Pay from "../views/PayClient";
import SignIn from "../views/Auth/SignIn";
import SignUp from "../views/Auth/SignUp";
import Home from "../views/Home";
import Search from "../views/Search";
import Notifications from "../views/Notifications";
import About from "../views/About";
import Scan from "../views/Scan";
import Help from "../views/Help";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoutes component={Home} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/about" element={<About />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/search" element={<PrivateRoutes component={Search} />} />
        <Route path="/pay" element={<PrivateRoutes component={Pay} />} />
        <Route path="/help" element={<PrivateRoutes component={Help} />} />
        <Route
          path="/notifications"
          element={<PrivateRoutes component={Notifications} />}
        />
      </Routes>
    </Router>
  );
}
