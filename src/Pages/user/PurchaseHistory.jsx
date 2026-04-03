import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/user";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/purchases`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(() => setOrders([
        { _id: "ORD001", course: { title: "Full Stack React" }, amount: 999, date: "2024-11-15", status: "completed", paymentId: "pay_Nx9mA2Kj" },
        { _id: "ORD002", course: { title: "Node.js Masterclass" }, amount: 999, date: "2024-12-01", status: "completed", paymentId: "pay_Kw3pL8Rz" },
        { _id: "ORD003", course: { title: "Python Basics" }, amount: 499, date: "2025-01-10", status: "completed", paymentId: "pay_Mv7qN2Yt" },
        { _id: "ORD004", course: { title: "MongoDB Bootcamp" }, amount: 999, date: "2025-02-20", status: "completed", paymentId: "pay_Jd5fH9Ls" },
      ]));
  }, [token]);

  const total = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Purchase History</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>All your course purchases</p>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total Spent", value: `₹${total.toLocaleString()}`, color: "#7c3aed" },
          { label: "Courses Bought", value: orders.length, color: "#059669" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 22px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Order ID", "Course", "Date", "Amount", "Status", "Invoice"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#94a3b8", fontFamily: "monospace" }}>#{order._id}</td>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{order.course?.title}</td>
                <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "13px" }}>{new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style={{ padding: "14px 16px", fontWeight: "700", color: "#059669", fontSize: "14px" }}>₹{order.amount}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#dcfce7", color: "#166534", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                    ✓ {order.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button style={{ padding: "6px 12px", background: "#eff6ff", color: "#1d4ed8", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                    📄 Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}