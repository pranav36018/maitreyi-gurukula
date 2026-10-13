import { useState } from "react";
import GurukulaBackgroundAnimation from "./GurukulaBackgroundAnimation";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  const handleBackToHome = () => {
    window.location.hash = "";
  };

  const handleQuickDemo = () => {
    setUsername("acharya.mentor");
    setPassword("gurukula2026");
  };

  return (
    <div className="maitreyi-login">
      {/* LEFT: MAJESTIC GURUKULA BRAND SANCTUM */}
      <div className="maitreyi-login-brand">
        <GurukulaBackgroundAnimation isHeroOnly={true} />

        <div className="maitreyi-login-brand-top">
          <button 
            type="button" 
            onClick={handleBackToHome}
            className="login-back-home-btn"
            title="Return to Gurukula Home"
          >
            <span className="back-arrow">←</span>
            <span>Back to Gurukula Home</span>
          </button>
        </div>

        <div className="maitreyi-login-story">
          <div className="login-emblem-badge">
            <span className="emblem-glyph">ॐ</span>
            <span className="emblem-text">SHUBHAM KAROTI MAITREYI GURUKULA</span>
          </div>

          <h1>
            A Journey of
            <br />
            <span>Values & Wisdom.</span>
            <br />
            <em>Lifelong Holistic Growth.</em>
          </h1>

          <div className="login-sanskrit-verse">
            <p className="sanskrit-devanagari">विद्या ददाति विनयं विनयाद्याति पात्रताम्</p>
            <p className="sanskrit-meaning">
              "True education bestows humility, from humility blossoms worthiness and noble character."
            </p>
          </div>

          <div className="login-heritage-features">
            <div className="login-feature-item">
              <span className="feature-icon">🌿</span>
              <div>
                <strong>Panchamukhi Shikshana</strong>
                <small>Physical, Moral, Intellectual, Emotional & Spiritual</small>
              </div>
            </div>
            <div className="login-feature-item">
              <span className="feature-icon">📍</span>
              <div>
                <strong>Ramohalli, Bengaluru</strong>
                <small>Green campus rooted in Vedic heritage</small>
              </div>
            </div>
          </div>
        </div>

        <div className="maitreyi-login-footer">
          <div className="login-footer-col">
            <span className="footer-label">SANCTUARY</span>
            <strong>Bengaluru Ashram</strong>
          </div>
          <div className="login-footer-col">
            <span className="footer-label">ESTABLISHED</span>
            <strong>30+ Years Legacy</strong>
          </div>
          <div className="login-footer-col">
            <span className="footer-label">SYSTEM</span>
            <strong>Child Journey Portal</strong>
          </div>
        </div>
      </div>

      {/* RIGHT: REGAL AUTHENTICATION PORTAL */}
      <div className="maitreyi-login-panel">
        <div className="maitreyi-login-card">
          <div className="login-card-decorative-corner top-left"></div>
          <div className="login-card-decorative-corner top-right"></div>

          <div className="maitreyi-login-card-heading">
            <div className="login-card-seal">
              <span className="seal-char">M</span>
            </div>
            <span className="login-subtag">MAITREYI GURUKULA SYSTEM</span>
            <h2>Acharya & Mentor Portal</h2>
            <p>
              Sign in to track child learning, holistic development, assessments, and daily observations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-body">
            <div className="maitreyi-login-field">
              <label htmlFor="login-username">
                <span>Username or Acharya ID</span>
              </label>
              <div className="login-input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. acharya.mentor"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="maitreyi-login-field">
              <label htmlFor="login-password">
                <span>Security Password</span>
              </label>
              <div className="login-input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your confidential password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="maitreyi-login-submit"
            >
              <span className="submit-label">Enter Management Portal</span>
              <span className="submit-arrow">→</span>
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="login-demo-helper-btn"
            >
              <span>⚡ Fill Demo Credentials</span>
            </button>
          </form>

          <div className="maitreyi-login-note">
            <span className="note-dot"></span>
            <p>
              Encrypted access for authorized Gurukula faculty, trustees, and administrative mentors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;