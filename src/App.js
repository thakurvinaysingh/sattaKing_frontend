import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./components/AdminLayout";
import AgentLayout from "./components/AgentLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Agents from "./pages/admin/Agents";
import Ghadi from "./pages/admin/Ghadi";
import Results from "./pages/admin/Results";
import AssignGhadi from "./pages/admin/AssignGhadi";
import AgentLogin from "./pages/agent/Login";
import AgentDashboard from "./pages/agent/Dashboard";
import GhadiResults from "./pages/agent/GhadiResults";
import ContentBlockPage from "./pages/admin/ContentBlockPage";

import PublicHome from "./pages/PublicHome"; 



export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="agents" element={<Agents />} />
            <Route path="ghadi" element={<Ghadi />} />
            <Route path="results" element={<Results />} />
            <Route path="assign-ghadi" element={<AssignGhadi />} />
            <Route path="content-blocks" element={<ContentBlockPage />} />
          </Route>
          {/* Agent login */}
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/*" element={<ProtectedRoute role="agent"><AgentLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="ghadi-results" element={<GhadiResults />} />
          </Route>
          <Route path="/login" element={<Navigate to="/agent/login" />} />
          <Route path="/" element={<PublicHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}