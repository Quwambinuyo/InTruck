import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/layout/Layout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/merchant/dashboard"
          element={<PlaceholderDashboard role="Merchant" />}
        />
        <Route
          path="/customer/dashboard"
          element={<PlaceholderDashboard role="Customer" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderDashboard({ role }: { role: string }) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="text-center">
        <div
          className="text-white text-4xl mb-4 uppercase"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
          }}
        >
          {role} Dashboard
        </div>
        <p className="text-white/50 text-sm mb-6">
          Coming soon — you're logged in!
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#F97316] text-white text-sm font-bold uppercase tracking-wide"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
