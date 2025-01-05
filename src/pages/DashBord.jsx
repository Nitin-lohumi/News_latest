import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../component/header";
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      {user && (
        <>
          <Header user={user} />
          <main className="p-1 main">
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
