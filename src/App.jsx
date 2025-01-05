import React, { useState, useEffect } from "react";
import NewsAnalytics from "./pages/NewsAnalytics";
import PayoutDetails from "./pages/PayoutDetails"
import ExportOptions from "./pages/ExportOptions";
import Dashboard from "./pages/DashBord";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./component/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}>
          <Route path="/NewsAnalytics" element={<NewsAnalytics/>}/>
          <Route path="/PayoutDetails" element={<PayoutDetails />}/>
          <Route path="/ExportOptions" element={<ExportOptions />}/>
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
