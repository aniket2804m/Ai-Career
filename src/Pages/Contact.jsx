import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    return alert("Please fill required fields.");
  }

  try {
    const res = await fetch("http://localhost:5000/api/sendmsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),   // ✅ formData nahi, form use karo
    });

    const data = await res.json();

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert(data.message || "Error sending message");
    }

  } catch (error) {
    console.error("Error sending message:", error);
    alert("Server error");
  }
};

  const contactDetails = [
    {
      icon: "✉️",
      label: "Email Us",
      value: "sryawanshianiket@gmail.com",
      href: "mailto:sryawanshianiket@gmail.com",
    },
    {
      icon: "📞",
      label: "Call Us",
      value: "+91-9307736352",
      href: "tel:+919307736352",
    },
    {
      icon: "📍",
      label: "Visit Us",
      value: "123 Innovation Street, Tech City, TC 10001",
      href: null,
    },
    {
      icon: "🕐",
      label: "Working Hours",
      value: "Mon–Fri: 9AM–6PM\nSat: 10AM–4PM\nSun: Closed",
      href: null,
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-page {
          min-height: 100vh;
          background: #0c0c0e;
          font-family: 'DM Sans', sans-serif;
          color: #f0ede8;
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }

        .contact-page::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212,163,115,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-page::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(100,140,200,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .contact-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c49a6c;
          margin-bottom: 16px;
        }

        .contact-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 300;
          color: #f0ede8;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .contact-title em {
          font-style: italic;
          color: #c49a6c;
        }

        .contact-subtitle {
          font-size: 15px;
          color: #888;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 300;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        /* Info Panel */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }

        .info-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(196,154,108,0.25);
        }

        .info-icon {
          font-size: 20px;
          margin-bottom: 10px;
          display: block;
        }

        .info-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c49a6c;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .info-value {
          font-size: 14px;
          color: #ccc;
          line-height: 1.7;
          font-weight: 300;
          white-space: pre-line;
        }

        .info-value a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.2s;
        }

        .info-value a:hover { color: #c49a6c; }

        .info-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 4px 0;
        }

        /* Form Panel */
        .form-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px;
        }

        .form-title {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 300;
          color: #f0ede8;
          margin-bottom: 8px;
        }

        .form-desc {
          font-size: 13px;
          color: #666;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr; }
          .form-panel { padding: 28px 20px; }
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }

        .field-full { grid-column: 1 / -1; }

        .field label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          font-weight: 500;
        }

        .field input,
        .field textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }

        .field input::placeholder,
        .field textarea::placeholder { color: #444; }

        .field input:focus,
        .field textarea:focus {
          border-color: rgba(196,154,108,0.5);
          background: rgba(255,255,255,0.06);
        }

        .field textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #c49a6c;
          color: #0c0c0e;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: #d4aa80;
          transform: translateY(-1px);
        }

        .submit-btn:active { transform: translateY(0); }

        /* Success State */
        .success-state {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .success-title {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 300;
          color: #f0ede8;
          margin-bottom: 10px;
        }

        .success-msg {
          font-size: 14px;
          color: #888;
          font-weight: 300;
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-wrapper">

          <div className="contact-header">
            <p className="contact-eyebrow">Contact</p>
            <h1 className="contact-title">Get in <em>Touch</em></h1>
            <p className="contact-subtitle">
              Have questions about our programs or enrollment? Reach out — our team responds within 24 hours.
            </p>
          </div>

          <div className="contact-grid">

            {/* Info Panel */}
            <div className="info-panel">
              {contactDetails.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="info-card">
                    <span className="info-icon">{item.icon}</span>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">
                      {item.href
                        ? <a href={item.href}>{item.value}</a>
                        : item.value
                      }
                    </p>
                  </div>
                  {i < contactDetails.length - 1 && <div className="info-divider" />}
                </React.Fragment>
              ))}
            </div>

            {/* Form Panel */}
            <div className="form-panel">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">✅</div>
                  <h2 className="success-title">Message Sent!</h2>
                  <p className="success-msg">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="form-title">Send a Message</h2>
                  <p className="form-desc">Fill in the form below and we'll be in touch shortly.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="field">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Aniket Sharma"
                        />
                      </div>
                      <div className="field">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Course Enrollment Query"
                      />
                    </div>

                    <div className="field">
                      <label>Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                      />
                    </div>

                    <button type="submit" className="submit-btn">Send Message →</button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Contact