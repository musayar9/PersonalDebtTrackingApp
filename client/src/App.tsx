import React from "react";
import { NavbarComponent } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import EditDebt from "./components/EditDebt";
import DebtDetail from "./components/DebtDetail";
import Success from "./components/Success";
import PaymentPage from "./components/PaymentPage";


const App: React.FC = () => {



  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/dashboard/updateDebt/:id" element={<EditDebt />} />
        <Route path="/dashboard/debtDetail/:id" element={<DebtDetail />} />
   <Route path="/dashboard/payment_debt/:debtId/debt/:paymentId" element={<PaymentPage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
<Route path="/success" element={<Success/>}/>
        <Route />
      </Routes>
    </div>
  );
};

export default App;
