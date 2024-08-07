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

const App: React.FC = () => {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/dashboard/updateDebt/:id" element={<EditDebt />} />
        <Route path="/dashboard/debtDetail/:id" element={<DebtDetail />} />
        <Route
          path="/dashboard/payment_debt/:debtId/debt/:paymentId"
          element={<PaymentPage />}
        />
        
        <Route path="/dashboard/user_detail/:userId" element={<UserDetail/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<Success />} />
        <Route />
      </Routes>
    </div>
  );
};

export default App;
