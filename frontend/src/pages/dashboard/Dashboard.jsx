import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Award,
  UserPlus,
  ArrowUpRight,
  Sparkles,
  Palette,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";

import Children from "./Children";
import Admissions from "./Admissions";
import FollowUps from "./FollowUps";
import Achievements from "./Achievements";
import Skills from "./Skills";
import Reports from "./Reports";
import DashboardStats from "./DashboardStats";
import DashboardActivity from "./DashboardActivity";
import Mentors from "./Mentors";

import "./Dashboard.css";

function Dashboard() {
  const [activePage, setActivePage] =
    useState("dashboard");

  const handleLogout = () => {
    window.location.hash = "";
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "children",
      label: "Children",
      icon: Users,
    },
    {
      id: "mentors",
      label: "Mentors",
      icon: Award,
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: UserPlus,
    },
    {
      id: "followups",
      label: "Follow-ups",
      icon: ArrowUpRight,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Sparkles,
    },
    {
      id: "skills",
      label: "Skills & Talents",
      icon: Palette,
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
    },
  ];

  const renderPage = () => {
    if (activePage === "children") {
      return <Children />;
    }

    if (activePage === "admissions") {
      return <Admissions />;
    }

    if (activePage === "followups") {
      return <FollowUps />;
    }

    if (activePage === "achievements") {
      return <Achievements />;
    }

    if (activePage === "skills") {
      return <Skills />;
    }

    if (activePage === "reports") {
      return <Reports />;
    }

    if (activePage === "mentors") {
  return <Mentors />;
}

    if (activePage === "settings") {
      return (
        <div className="dashboard-settings-page">
          <div className="settings-heading">
            <span>SYSTEM SETTINGS</span>
            <h1>Settings</h1>
            <p>
              Configure the Gurukula system and
              user preferences.
            </p>
          </div>
          <div className="settings-grid">
            <section>
              <span>PROFILE</span>
              <h2>User Profile</h2>
              <label>Name</label>
              <input
                value="Gurukula User"
                readOnly
              />
              <label>Role</label>
              <input
                value="Teacher / Mentor"
                readOnly
              />
            </section>
            <section>
              <span>SYSTEM</span>
              <h2>System Preferences</h2>
              <div className="settings-option">
                <div>
                  <strong>
                    Quick Observations
                  </strong>
                  <p>
                    Allow mentors to record
                    observations quickly.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </div>
              <div className="settings-option">
                <div>
                  <strong>
                    Follow-up Reminders
                  </strong>
                  <p>
                    Show pending mentor
                    follow-ups.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </div>
              <div className="settings-option">
                <div>
                  <strong>
                    Journey History
                  </strong>
                  <p>
                    Maintain historical child
                    journey records.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                />
              </div>
            </section>
          </div>
          <div className="settings-demo-note">
            <strong>FRONTEND DEMO</strong>
            <p>
              Settings will be connected to user
              accounts and database configuration
              after the backend is built.
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* DASHBOARD INTRO */}
        <div className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">
              GURUKULA DASHBOARD
            </p>
            <h1>
              A living view of
              <br />
              every child's journey.
            </h1>
            <p className="dashboard-intro">
              Track learning, growth, wellbeing,
              responsibilities and achievements
              across the Gurukula journey.
            </p>
          </div>
          <div className="dashboard-date">
            <span>TODAY</span>
            <strong>
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </strong>
          </div>
        </div>
        {/* LIVE MONGODB STATISTICS */}
        <DashboardStats />
        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content-grid">
          {/* RECENT ACTIVITY */}
          <section className="dashboard-panel dashboard-activity-panel">
            <div className="dashboard-panel-heading">
              <div>
                <span>RECENT ACTIVITY</span>
                <h2>
                  Child Journey Updates
                </h2>
              </div>
              <button
                onClick={() =>
                  setActivePage("children")
                }
              >
                View children →
              </button>
            </div>
            <DashboardActivity />
          </section>
          {/* AREAS OF ATTENTION */}
          <section className="dashboard-panel dashboard-support-panel">
            <div className="dashboard-panel-heading">
              <div>
                <span>HOLISTIC GROWTH</span>
                <h2>
                  Areas of attention
                </h2>
              </div>
            </div>
            <div className="support-list">
              <button
                onClick={() =>
                  setActivePage("followups")
                }
              >
                <div>
                  <strong>
                    Academic Support
                  </strong>
                  <p>
                    Learning and
                    subject-related support.
                  </p>
                </div>
                <span>→</span>
              </button>
              <button
                onClick={() =>
                  setActivePage("skills")
                }
              >
                <div>
                  <strong>
                    Skill Development
                  </strong>
                  <p>
                    Skills, talents and
                    interests.
                  </p>
                </div>
                <span>→</span>
              </button>
              <button
                onClick={() =>
                  setActivePage("followups")
                }
              >
                <div>
                  <strong>
                    Mentorship
                  </strong>
                  <p>
                    Mentor observations and
                    follow-ups.
                  </p>
                </div>
                <span>→</span>
              </button>
            </div>
          </section>
        </div>
        {/* JOURNEY BANNER */}
        <section className="dashboard-journey-banner">
          <div>
            <span>THE CHILD JOURNEY</span>
            <h2>
              From admission
              <br />
              to lifelong growth.
            </h2>
          </div>
          <p>
            Every observation, achievement,
            responsibility and learning
            milestone becomes part of the
            child's living story.
          </p>
        </section>
      </>
    );
  };

  return (
    <div className="dashboard-shell">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">
            M
          </div>
          <div>
            <strong>MAITREYI</strong>
            <span>GURUKULA</span>
          </div>
        </div>
        <div className="dashboard-sidebar-label">
          WORKSPACE
        </div>
        <nav className="dashboard-navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={
                  activePage === item.id
                    ? "dashboard-nav-item active"
                    : "dashboard-nav-item"
                }
                onClick={() => setActivePage(item.id)}
              >
                <span className="nav-icon">
                  {typeof Icon === "string" ? Icon : <Icon size={18} />}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-bottom">
          <button
            className="dashboard-settings"
            onClick={() => setActivePage("settings")}
          >
            <span className="nav-icon">
              <Settings size={18} />
            </span>
            <span className="nav-label">Settings</span>
          </button>
          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            <span className="nav-icon">
              <ArrowLeft size={18} />
            </span>
            <span className="nav-label">Back to website</span>
          </button>
        </div>
      </aside>
      {/* MAIN AREA */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="topbar-label">
              SHUBHAM KAROTI MAITREYI GURUKULA
            </span>
          </div>
          <div className="dashboard-user">
            <div className="dashboard-user-avatar">
              G
            </div>
            <div>
              <strong>
                Gurukula User
              </strong>
              <span>
                Teacher / Mentor
              </span>
            </div>
          </div>
        </header>
        <div className="dashboard-main-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;