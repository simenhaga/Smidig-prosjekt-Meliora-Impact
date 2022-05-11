import "bulma/css/bulma.min.css";
import React from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import sandbox from "./components/sandbox";

import OldBubblePage from "./pages/BubblePage";

const App = () => {
  return (
    <div className={"App"}>
      <Router>
        <Routes>
          <Route exact path="/" element={<sandbox />} />

          <Route exact path="/bubbles" element={<OldBubblePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
