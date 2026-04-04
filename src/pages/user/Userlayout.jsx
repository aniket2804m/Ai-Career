import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";

export default function UserLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f7ff", fontFamily: "system-ui, sans-serif" }}>
      <UserSidebar />
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <Outlet />   {/* ✅ Nested routes yahan render honge */}
      </main>
    </div>
  );
}