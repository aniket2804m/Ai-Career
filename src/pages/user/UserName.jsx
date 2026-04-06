import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";

export default function UserLayout() {
  return (
    <>
      <style>{`
        .user-layout {
          display: flex;
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          background: #f8f7ff;
          font-family: system-ui, sans-serif;
          overflow-x: hidden;
        }

        .user-main {
          flex: 1;
          min-width: 0;
          width: 100%;
          padding: 32px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        @media (max-width: 992px) {
          .user-main { padding: 20px; }
        }

        @media (max-width: 768px) {
          .user-layout { flex-direction: column; }
          .user-main { padding: 16px; }
        }
      `}</style>

      <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <Outlet />   {/* ✅ Nested routes yahan render honge */}
      </main>
      </div>
    </>
  );
}