import React from "react";
import { Route, Routes } from "react-router";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import AdminOrderPage from "../page/AdminOrderPage";
import AdminProduct from "../page/AdminProduct";
import CartPage from "../page/CartPage";
import Login from "../page/Login";
import MyPage from "../page/MyPage";
import OrderCompletePage from "../page/OrderCompletePage";
import PaymentPage from "../page/PaymentPage";
import ProductAll from "../page/ProductAll";
import ProductDetail from "../page/ProductDetail";
import RegisterPage from "../page/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Event from "../page/Event";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductAll />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route element={<PrivateRoute permissionLevel="customer" />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                    path="/payment/success"
                    element={<OrderCompletePage />}
                />
                <Route path="/account/purchase" element={<MyPage />} />
                <Route path="/event" element={<Event />} />
            </Route>
            <Route element={<PrivateRoute permissionLevel="admin" />}>
                <Route path="/admin/product" element={<AdminProduct />} />
                <Route path="/admin/order" element={<AdminOrderPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
