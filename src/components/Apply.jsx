import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api.js';

function Apply() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    resume: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data banate hain (text + file)
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("role", form.role);
    formData.append("message", form.message);
    if (form.resume) formData.append("resume", form.resume);

    // API call karo
    try {
      const res = await fetch(`${API_BASE_URL}/api/apply`, {
        method: "POST",
        body: formData,
      });

      // Res check karo
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Apply API failed");

      alert("Application Submitted Successfully 🚀");

      // Form reset karo
      setForm({
        name: "",
        email: "",
        role: "",
        message: "",
        resume: null,
      });

      navigate("/careers");
    } catch (error) {
      console.error("Apply submit error:", error);
      alert("Application failed: " + error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(255,255,255,0.05)",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          📄 Apply for Job
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Role */}
        <input
          type="text"
          name="role"
          placeholder="Applying for (Role)"
          value={form.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Why should we hire you?"
          value={form.message}
          onChange={handleChange}
          rows="4"
          style={{ ...inputStyle, resize: "none" }}
        />

        {/* Resume Upload */}
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          style={{
            marginBottom: "15px",
            color: "#cbd5f5",
          }}
        />

        {/* Submit */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #3b82f6)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit Application 🚀
        </button>

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/careers")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent",
            color: "#94a3b8",
            cursor: "pointer",
          }}
        >
          ← Back to Careers
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none",
};

export default Apply;