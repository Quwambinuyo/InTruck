import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutWrapper from "../layouts/layout/Index";
import LandingPage from "../layouts/landing/Landing";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import {
  CustomerDashboard,
  FindDrivers,
  MarketPlace,
  MyJobs,
  PostJob,
  TrackDeliveries,
  Transactions,
} from "../customer/components";
import {
  ListTruck,
  MerchantDashboard,
  MyDriver,
  MyFleet,
} from "../merchants/components";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<LayoutWrapper />}>
          {/* Merchant */}
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/list-truck" element={<ListTruck />} />
          <Route path="/merchant/fleet" element={<MyFleet />} />
          <Route path="/merchant/driver" element={<MyDriver />} />

          {/* Customer */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/post-job" element={<PostJob />} />
          <Route path="/customer/jobs" element={<MyJobs />} />
          <Route path="/customer/track" element={<TrackDeliveries />} />
          <Route path="/customer/transactions" element={<Transactions />} />
          <Route path="/customer/drivers" element={<FindDrivers />} />
          <Route path="/customer/marketplace" element={<MarketPlace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
