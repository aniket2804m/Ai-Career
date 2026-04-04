import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Listing from "./Listing";
import Footer from "./Footer";
import ExploreListing from "./ExploreListing";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";

import AdminLayout from "./pages/admin/ComponentName.jsx";
import UserLayout from "./pages/user/UserLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageUsers from "./pages/admin/ManageUsers";
import Analytics from "./pages/admin/Analytics";
import QuizReport from "./pages/admin/QuizReport";

import UserDashboard from "./pages/user/UserDashboard";
import EnrolledCourses from "./pages/user/EnrolledCourses";
import CourseProgress from "./pages/user/CourseProgress";
import PurchaseHistory from "./pages/user/PurchaseHistory";
import UserProfile from "./pages/user/UserProfile";
import QuizPage from "./pages/user/QuizPage";

import ChatBot from './components/ChatBot';
import ScamDetector from "./pages/ScamDetector";
import Careers from "./components/Careers";
import Apply from "./components/Apply";
import RoadmapBuilder from "./components/RoadmapBuilder";

// ✅ FIX 1: MentorGroup backend model ki jagah GroupDashboard component import karo
import MentorSetup from "./components/Mentor/Mentorsetup";
import BrowseMentors from "./components/Mentor/Browsementors";
import GroupDashboard from "./components/Mentor/Groupdashboard"; // ← ye file banani hai

import ResumeAtsCheck from "./components/ResumeAtsCheck";

// ── Route Guards ──────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar role={role} setRole={setRole} search={search} setSearch={setSearch} />

      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/" element={<ScamDetector />} />
        <Route path="/explore" element={<ExploreListing search={search} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/create" element={<Listing />} />
        <Route path="/resume-ats" element={<ResumeAtsCheck />} />
        <Route path="/roadmap" element={<RoadmapBuilder />} />
        <Route path="/coursedetail/:id" element={<CourseDetail />} />

        {/* Quiz route */}
        <Route
          path="/quiz/:courseId"
          element={<ProtectedRoute><QuizPage /></ProtectedRoute>}
        />

        {/* ── Admin Routes ── */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="quiz-report" element={<QuizReport />} />
        </Route>

        {/* ── User Routes ── */}
        <Route path="/dashboard" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<UserDashboard />} />
          <Route path="courses" element={<EnrolledCourses />} />
          <Route path="progress" element={<CourseProgress />} />
          <Route path="purchases" element={<PurchaseHistory />} />
          <Route path="profile" element={<UserProfile />} />

          {/* ✅ FIX 2: Mentor routes user dashboard ke ANDAR daalo — protected automatically */}
          <Route path="mentor/setup" element={<MentorSetup />} />
          <Route path="mentor/browse" element={<BrowseMentors />} />
          <Route path="mentor/group" element={<GroupDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <Footer />
      <ChatBot />
    </>
  );
}

export default App;