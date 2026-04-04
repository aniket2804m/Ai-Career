import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/admin`;

export default function Analytics() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/analytics`, { headers });
      setData(res.data);
    } catch {
      // Fallback mock data for display
      setData({
        totalRevenue: 284500,
        monthRevenue: 84200,
        totalOrders: 312,
        monthOrders: 36,
        topCourses: [
          { title: "Full Stack React", sales: 48, revenue: 47952 },
          { title: "Node.js Masterclass", sales: 36, revenue: 35964 },
          { title: "Python for Beginners", sales: 62, revenue: 30938 },
          { title: "MongoDB Bootcamp", sales: 29, revenue: 28971 },
          { title: "DSA in JavaScript", sales: 44, revenue: 21956 },
        ],
        monthlyRevenue: [42000, 38000, 55000, 47000, 63000, 84200],
        months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      });
    }
  }, [headers]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  if (!data) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading analytics...</div>;

  const maxBar = Math.max(...data.monthlyRevenue);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Revenue & Analytics</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>Platform performance overview</p>
      </div>

      {/* Revenue Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Revenue", value: `₹${data.totalRevenue?.toLocaleString()}`, icon: "💰", color: "#059669", bg: "#ecfdf5" },
          { label: "This Month", value: `₹${data.monthRevenue?.toLocaleString()}`, icon: "📅", color: "#3b82f6", bg: "#eff6ff" },
          { label: "Total Orders", value: data.totalOrders, icon: "🛒", color: "#f59e0b", bg: "#fffbeb" },
          { label: "Orders (Month)", value: data.monthOrders, icon: "📦", color: "#8b5cf6", bg: "#f5f3ff" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontSize: "24px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Monthly Revenue Chart */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Monthly Revenue</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
            {data.monthlyRevenue.map((val, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ fontSize: "10px", color: "#64748b" }}>₹{(val / 1000).toFixed(0)}k</div>
                <div style={{
                  width: "100%", borderRadius: "6px 6px 0 0",
                  background: i === data.monthlyRevenue.length - 1
                    ? "linear-gradient(180deg, #3b82f6, #1d4ed8)"
                    : "#bfdbfe",
                  height: `${(val / maxBar) * 120}px`,
                  transition: "all 0.3s",
                }} />
                <div style={{ fontSize: "11px", color: "#64748b" }}>{data.months[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>Top Selling Courses</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.topCourses.map((course, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                    <span style={{ color: "#94a3b8", marginRight: "6px" }}>#{i + 1}</span>{course.title}
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#059669" }}>₹{course.revenue.toLocaleString()}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: "4px",
                    background: `hsl(${220 - i * 30}, 70%, 55%)`,
                    width: `${(course.sales / data.topCourses[0].sales) * 100}%`,
                  }} />
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>{course.sales} sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}