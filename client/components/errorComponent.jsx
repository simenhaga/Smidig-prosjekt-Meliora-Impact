import React from "react";
export function ErrorComponent({ error }) {
    return (
        <div>
            <h1>Error</h1>
            <div id={"error-text"}>{error.toString()}</div>
        </div>
    );
}