import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { vehicleApiSlice } from "./service/VehicleApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApiProvider api={vehicleApiSlice}>
      <App />
    </ApiProvider>
  </BrowserRouter>
);
