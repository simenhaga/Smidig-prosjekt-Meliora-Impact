import React from "react";
export function LoadingComponent({ message = "Loading, please wait..." }) {
  return (
    <div className={"loading-component"}>
      <div>
        <span className={"fa-solid fa-spinner fa-spin-pulse"} />
        <p>{message}</p>
      </div>
    </div>
  );
}
