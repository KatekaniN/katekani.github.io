// src/index.js
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import SignInSideBusiness from "./business/SignInSideBusiness"; // Adjust path as per your structure
import SignUpSideBusiness from "./business/SignUpSideBusiness";
import SignInSideInvestor from "./investor/SignInSideInvestor"; // Adjust path as per your structure
import SignUpSideInvestor from "./investor/SignUpSideInvestor";
import SignUpCardInvestor from "./investor/SignUpCardInvestor";
import SignUpCardBusiness from "./business/SignUpCardBusiness";
import BusinessDetailsForm from "./business/form/businessinfo";

const root = createRoot(document.getElementById("root")); // create a root.
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/business-signin" element={<SignInSideBusiness />} />
      <Route path="/signup-business" element={<SignUpSideBusiness />} />
      <Route path="/investor-signin" element={<SignInSideInvestor />} />
      <Route path="/signup-investor" element={<SignUpSideInvestor />} />
      <Route path="/signup-i" element={<SignUpSideInvestor />} />
      <Route path="/signup-b" element={<SignUpSideBusiness />} />
      <Route path="/signup-form" element={<BusinessDetailsForm />} />
    </Routes>
  </Router>
); // render your app.
