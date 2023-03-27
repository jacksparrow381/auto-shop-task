import React from "react";
import Table from "../table/MaterialTable";
import NavBar from "../NavBar";

export default function Home() {
  const isLoggedIn = localStorage.getItem("user-token");

  return (
    <div>
      {isLoggedIn && (
        <div>
          <NavBar />
          <Table />
        </div>
      )}
    </div>
  );
}
