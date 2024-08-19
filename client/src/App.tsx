import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import EditDebt from "./components/debt/EditDebt";
import DebtDetail from "./components/debt/DebtDetail";
import PaymentPage from "./components/payment/PaymentPage";
import Success from "./components/Success";
import { NavbarComponent } from "./components/navbar/Navbar";
import UserDetail from "./components/Admin/UserDetail";
import Chat from "./components/chat/Chat";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
const App: React.FC = () => {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/dashboard/updateDebt/:id" element={<EditDebt />} />
          <Route
            path="/dashboard/debtDetail/:userId/:id"
            element={<DebtDetail />}
          />
          <Route
            path="/dashboard/payment_debt/:debtId/debt/:paymentId"
            element={<PaymentPage />}
          />

          <Route
            path="/dashboard/user_detail/:userId"
            element={<UserDetail />}
          />

          <Route path="/success" element={<Success />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
