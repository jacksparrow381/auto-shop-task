import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./authPage/SignUp";
import LoginPage from "./authPage/LoginPage";
import SuccessSignUp from "./authPage/SuccessSignUp";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Home from "./authPage/Home";
import Categories from "./category/Categories";

export default function ComponentRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessSignUp />} />

        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}
