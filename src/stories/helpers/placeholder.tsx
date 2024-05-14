import React from "react";

export default ({ height = 300 }) => (
  <div
    style={{
      height,
      border: "2px solid #d3d3d3",
      backgroundImage:
        "linear-gradient(45deg, #d3d3d3 25%, transparent 25%, transparent 50%, #d3d3d3 50%, #d3d3d3 75%, transparent 75%, transparent 100%)",
      backgroundSize: "56.57px 56.57px",
    }}
  />
);
