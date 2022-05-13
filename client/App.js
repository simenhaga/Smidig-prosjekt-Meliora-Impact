import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { BubblePage } from "./pages/BubblePage";
import Footer from "./components/Footer";
import { LoginPage } from "./pages/loginPage";
import { useLoading } from "./ library/useloading";
import { fetchLogin } from "./ library/apiMethods";
import { LoadingComponent } from "./components/loadingComponent";
import { ErrorComponent } from "./components/errorComponent";

export function App() {
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (loading) {
    return <LoadingComponent message={"Fetching user data, please wait..."} />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<BubblePage />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data?.config} reload={reload} />}
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}
