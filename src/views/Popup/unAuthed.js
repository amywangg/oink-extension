import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

const UnAuthed = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div style={{ marginTop: 70, width: "100%", alignContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <h1 style={{ color: "#FF8FB3" }}>User is not authenticated</h1>
        </div>
      )}
    </div>
  );
};

export default UnAuthed;
