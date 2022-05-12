import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Header from "./components/Header";
import { BubblePage } from "./pages/BubblePage";
import Footer from "./components/Footer";

export function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<BubblePage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}
