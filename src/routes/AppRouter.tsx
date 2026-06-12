import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutWrapper from "../layouts/layout/Index";
import LandingPage from "../layouts/landing/Landing";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { CustomerDashboard, PostJob } from "../customer/components";
import MerchantDashboard from "../merchants/components/MerchantDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<LayoutWrapper />}>
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/post-job" element={<PostJob />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
