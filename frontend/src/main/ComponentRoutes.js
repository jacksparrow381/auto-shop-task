import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./authPage/SignUp";
import LoginPage from "./authPage/LoginPage";
import SuccessSignUp from "./authPage/SuccessSignUp";
import AddVehicleForm from "../components/AddVehicleForm";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Home from "./authPage/Home";

export default function ComponentRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessSignUp />} />
        <Route path="/add-car" element={<AddVehicleForm />} />

        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}
