import { useEffect, useState } from "react";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === "#login") {
        setPage("login");
      } else if (hash === "#dashboard") {
        setPage("dashboard");
      } else {
        setPage("home");
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  const openLogin = () => {
    window.location.hash = "login";
  };

  const loginSuccess = () => {
    window.location.hash = "dashboard";
  };

  if (page === "login") {
    return (
      <Login
        onLogin={loginSuccess}
      />
    );
  }

  if (page === "dashboard") {
    return <Dashboard />;
  }

  return (
    <Home
      onLogin={openLogin}
    />
  );
}

export default App;