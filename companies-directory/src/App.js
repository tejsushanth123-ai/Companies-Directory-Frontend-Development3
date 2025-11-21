import React from "react";
import "./App.css";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <div className="app-container">
      <div className="title-card">
        <h1>Companies Directory</h1>
      </div>


      <div className="content-area">
        <CompanyList />
      </div>
    </div>
  );
}

export default App;
