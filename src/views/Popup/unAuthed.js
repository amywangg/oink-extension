import React from "react";

const unAuthed = () => {
  return (
    <div>
      <h1 style={{color: "#FF8FB3"}}>User is not authenticated</h1>
      <a href="https://oink-dashboard.herokuapp.com/">
      <p style={{color: "#FF8FB3"}}>Sign in with Dashboard</p>
      </a>
    </div>
  );
};

export default unAuthed;
