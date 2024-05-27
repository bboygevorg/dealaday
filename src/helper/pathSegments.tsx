import React from "react";

export const pathSegments = location.pathname
  .split("/")
  .filter((segment) => segment)
  .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));
