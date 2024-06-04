import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ permissionLevel }) => {
    const user = useSelector((state) => state.user.user);
    // const user = { level: "admin" };
    console.log("PrivateRoute user", user);
    const isAuthenticated =
        user?.user.level === permissionLevel || user?.user.level === "admin";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
