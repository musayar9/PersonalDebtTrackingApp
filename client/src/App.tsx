import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import EditDebt from "./components/debt/EditDebt";
import DebtDetail from "./components/debt/DebtDetail";
import PaymentPage from "./components/payment/PaymentPage";
import Success from "./components/Success";
// import { NavbarComponent } from "./components/navbar/Navbar";
import UserDetail from "./components/Admin/UserDetail";
import Chat from "./components/chat/Chat";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import UsersDebts from "./components/Admin/usersdebt/UsersDebts";
import Profile from "./components/profile/Profile";
import ProfileChangePassword from "./components/profile/ProfileChangePassword";
import ProfileContactPreference from "./components/profile/ProfileContactPreference";
import Users from "./components/Admin/Users";
import Debt from "./components/debt/Debt";
import { NavbarComponent } from "./components/navbar/Navbar";
import DebtForm from "./components/debt/DebtForm";
import ChangePassword from "./pages/ChangePassword";
const App: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route element={<PrivateRoute />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/change-password"
              element={<ProfileChangePassword />}
            />
            <Route
              path="/profile/contactPreference"
              element={<ProfileContactPreference />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/debts" element={<Debt />} />
            <Route path="/debts/create_debt" element={<DebtForm />} />
            <Route path="/debts/updateDebt/:id" element={<EditDebt />} />
            <Route path="/allUsers/debts" element={<UsersDebts />} />
            <Route
              path="/debt/payment_debt/:debtId/debt/:paymentId"
              element={<PaymentPage />}
            />
            <Route />
            <Route
              path="/debts/debtDetail/:userId/:id"
              element={<DebtDetail />}
            />
            <Route
              path="/debts/payment_debt/:debtId/debt/:paymentId"
              element={<PaymentPage />}
            />

            <Route path="/users/user_detail/:userId" element={<UserDetail />} />

            <Route path="/success" element={<Success />} />
          </Route>
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/:userId/token/:token"
          element={<ChangePassword />}
        />
        <Route />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
