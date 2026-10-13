import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Scroll,
  Sun,
  MapPin,
  Calendar,
  Award,
  Menu,
  X,
  Navigation,
  LogIn,
  Compass,
} from "lucide-react";

import IntroSection from "./IntroSection";
import StorySection from "./StorySection";
import PhilosophySection from "./PhilosophySection";
import PersonalitySection from "./PersonalitySection";
import UniqueSection from "./UniqueSection";
import JourneySection from "./JourneySection";
import LocalPhotosSection from "./LocalPhotosSection";
import AdmissionsSection from "./AdmissionsSection";
import CampusSection from "./CampusSection";
import RoutineSection from "./RoutineSection";
import AcharyasSection from "./AcharyasSection";
import GallerySection from "./GallerySection";
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";
import DirectionsModal from "./DirectionsModal";
import QuickAccessGrid, { CONTENT_ITEMS } from "./QuickAccessGrid";
import QuickAccessTopBar from "./QuickAccessTopBar";
import GurukulaBackgroundAnimation from "./GurukulaBackgroundAnimation";
import HeroShowcaseCard from "./HeroShowcaseCard";
import "./PublicSections.css";

function Home({ onLogin }) {
  const [activeSection, setActiveSection] = useState(null);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize active section with URL hash & browser back/forward buttons
  useEffect(() => {
    const handleHashSync = () => {
      const rawHash = window.location.hash.replace("#", "");
      if (!rawHash || rawHash === "top" || rawHash === "quick-access-hub" || rawHash === "gurukula-darshanam") {
        setActiveSection(null);
      } else if (rawHash === "login" || rawHash === "dashboard") {
        // App.jsx handles login/dashboard routing
      } else {
        const item = CONTENT_ITEMS.find((it) => it.id === rawHash);
        if (item) {
          setActiveSection(rawHash);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    handleHashSync();
    window.addEventListener("popstate", handleHashSync);
    window.addEventListener("hashchange", handleHashSync);

    return () => {
      window.removeEventListener("popstate", handleHashSync);
      window.removeEventListener("hashchange", handleHashSync);
    };
  }, []);

  // Handle selecting any content via its button
  const handleSelectContent = (contentId) => {
    if (contentId === "directions") {
      setIsDirectionsOpen(true);
      return;
    }
    if (contentId === "portal-login") {
      onLogin();
      return;
    }

    setActiveSection(contentId);
    window.location.hash = contentId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Return to the Gurukula Darshanam gateway to browse other contents
  const handleBackToQuickAccess = () => {
    setActiveSection(null);
    window.location.hash = "";
    setTimeout(() => {
      const hub = document.getElementById("gurukula-darshanam");
      if (hub) {
        hub.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 40);
  };

  // Active item & Next item calculation for navigation flow
  const activeIndex = CONTENT_ITEMS.findIndex((item) => item.id === activeSection);
  const activeItemData = activeIndex >= 0 ? CONTENT_ITEMS[activeIndex] : null;
  const nextItem =
    activeIndex >= 0 && activeIndex < CONTENT_ITEMS.length - 1
      ? CONTENT_ITEMS[activeIndex + 1]
      : CONTENT_ITEMS[0];

  // Render the selected content view
  const renderSelectedContent = () => {
    switch (activeSection) {
      case "intro":
        return <IntroSection />;
      case "story":
      case "milestones":
        return <StorySection />;
      case "philosophy":
        return <PhilosophySection />;
      case "panchamukhi":
        return <PersonalitySection />;
      case "unique":
        return <UniqueSection />;
      case "journey":
        return <JourneySection />;
      case "campus-photos":
        return <LocalPhotosSection />;
      case "campus":
        return <CampusSection />;
      case "routine":
        return <RoutineSection />;
      case "acharyas":
        return <AcharyasSection />;
      case "admissions":
        return <AdmissionsSection />;
      case "gallery":
        return <GallerySection />;
      case "faqs":
        return <FaqSection />;
      case "contact":
        return <ContactSection onOpenDirections={() => setIsDirectionsOpen(true)} />;
      default:
        return null;
    }
  };

  return (
    <div className="maitreyi-home">
      {/* ================= NAVIGATION ================= */}
      <nav className="maitreyi-nav">
        <div className="maitreyi-nav-inner">
          <div className="maitreyi-brand">
            <a
              href="#"
              className="maitreyi-brand-link"
              onClick={(e) => {
                e.preventDefault();
                handleBackToQuickAccess();
              }}
            >
              <img
                src="/images/brand/logo.png"
                alt="Shubham Karoti Maitreyi Gurukula"
                className="maitreyi-brand-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="maitreyi-brand-text">
                <strong>Maitreyi Gurukula</strong>
                <span>Shubham Karoti • Bengaluru</span>
              </div>
            </a>
          </div>

          {/* Desktop Quick Nav Links */}
          <div className="maitreyi-nav-links">
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "story" ? "active" : ""}`}
              onClick={() => handleSelectContent("story")}
            >
              Our Story
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "philosophy" ? "active" : ""}`}
              onClick={() => handleSelectContent("philosophy")}
            >
              Philosophy
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "panchamukhi" ? "active" : ""}`}
              onClick={() => handleSelectContent("panchamukhi")}
            >
              Panchamukhi
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "campus" ? "active" : ""}`}
              onClick={() => handleSelectContent("campus")}
            >
              Campus Life
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "admissions" ? "active" : ""}`}
              onClick={() => handleSelectContent("admissions")}
            >
              Admissions
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "gallery" ? "active" : ""}`}
              onClick={() => handleSelectContent("gallery")}
            >
              Gallery
            </button>
            <button
              type="button"
              className={`nav-link-btn ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => handleSelectContent("contact")}
            >
              Contact
            </button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="maitreyi-nav-actions">
            <button
              type="button"
              className="nav-quick-access-btn"
              onClick={handleBackToQuickAccess}
              title="Explore Gurukula Darshanam"
            >
              <Compass size={15} />
              <span>Gurukula Darshanam</span>
            </button>

            <button
              type="button"
              className="maitreyi-nav-login"
              onClick={onLogin}
              title="Access Acharya & Staff Portal"
            >
              <LogIn size={16} />
              <span>Portal Login</span>
            </button>

            <button
              type="button"
              className="nav-directions-btn"
              onClick={() => setIsDirectionsOpen(true)}
              title="Directions & Google Maps"
            >
              <Navigation size={15} />
              <span>Directions</span>
            </button>

            <button
              type="button"
              className="nav-enquiry-btn"
              onClick={() => handleSelectContent("contact")}
            >
              <span>Admission Enquiry</span>
            </button>
          </div>

          {/* Mobile Header Quick Actions */}
          <div className="maitreyi-nav-mobile-actions">
            <button
              type="button"
              className="mobile-quick-directions-btn"
              onClick={() => setIsDirectionsOpen(true)}
              title="Directions to Gurukula"
              aria-label="Directions"
            >
              <Navigation size={14} />
              <span>Map</span>
            </button>

            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-down Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="maitreyi-mobile-drawer">
          <div className="mobile-drawer-links">
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleBackToQuickAccess();
              }}
            >
              ✨ Gurukula Darshanam • Sacred Pathways
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("story");
              }}
            >
              Our Story &amp; Origins
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("philosophy");
              }}
            >
              Gurukula Philosophy
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("panchamukhi");
              }}
            >
              Panchamukhi Shikshana
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("admissions");
              }}
            >
              Admissions
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("campus");
              }}
            >
              Campus Life &amp; Facilities
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("routine");
              }}
            >
              Daily Routine
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("acharyas");
              }}
            >
              Acharyas &amp; Mentors
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("gallery");
              }}
            >
              Gallery
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("faqs");
              }}
            >
              FAQs
            </button>
            <button
              type="button"
              className="drawer-link-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("contact");
              }}
            >
              Contact &amp; Enquiry
            </button>
          </div>

          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="drawer-quick-access-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleBackToQuickAccess();
              }}
            >
              <Compass size={18} />
              <span>Explore Gurukula Darshanam</span>
            </button>

            <button
              type="button"
              className="drawer-directions-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDirectionsOpen(true);
              }}
            >
              <Navigation size={18} />
              <span>Google Maps Directions</span>
            </button>

            <button
              type="button"
              className="drawer-enquiry-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSelectContent("contact");
              }}
            >
              <span>Admission Enquiry</span>
              <ArrowUpRight size={18} />
            </button>

            <button
              type="button"
              className="drawer-login-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogin();
              }}
            >
              <span>Portal Login</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      {/* Show Hero on home gateway */}
      {!activeSection && (
        <section className="maitreyi-hero" id="hero">
          <GurukulaBackgroundAnimation isHeroOnly={true} />
          <div className="maitreyi-hero-inner">
            <div className="maitreyi-hero-content">
              <div className="hero-pill-badge">
                <Sparkles size={16} className="hero-badge-icon" />
                <span>SHUBHAM KAROTI MAITREYI GURUKULA</span>
                <span className="hero-badge-dot">•</span>
                <span className="hero-badge-tag">12-ACRE RESIDENTIAL CAMPUS</span>
              </div>

              <h1>
                Blending Ancient Wisdom
                <br />
                with Modern Learning for
                <br />
                <span className="hero-title-highlight">Holistic Growth.</span>
              </h1>

              <p className="maitreyi-hero-description">
                A charitable residential Gurukula in Bengaluru exclusively for girls — offering 100% free living,
                wholesome satvic nourishment, spoken Sanskrit fluency, state board academic brilliance,
                classical Bharatanatyam, and enduring character building.
              </p>

              {/* Welcoming Featured Sanctuary Photograph on Homepage Opening View */}
              <div
                className="hero-welcome-photo-banner"
                onClick={() => handleSelectContent("campus-photos")}
                title="Click to explore Ramohalli Campus Photo Tour"
              >
                <img
                  src="/images/local/gurukula-activity-1.jpg"
                  alt="Shubham Karoti Maitreyi Gurukula students and founder in the 12-acre Ramohalli campus grove"
                  className="hero-welcome-img"
                  loading="eager"
                />
                <div className="hero-welcome-overlay">
                  <div className="hero-welcome-badge">
                    <Sparkles size={13} />
                    <span>OUR GURUKULA KUTUMBA • RAMOHALLI SANCTUARY</span>
                  </div>
                  <div className="hero-welcome-caption">
                    <strong>One United Residential Family Under the Sacred Trees</strong>
                    <span>Click to explore Campus Photo Tour →</span>
                  </div>
                </div>
              </div>

              <div className="hero-action-cluster">
                {/* Main Action CTAs */}
                <div className="hero-cta-buttons-bar">
                  <button
                    type="button"
                    className="hero-cta-quick-access"
                    onClick={handleBackToQuickAccess}
                    title="Explore Gurukula Darshanam sacred pathways"
                  >
                    <Compass size={17} />
                    <span>Explore Gurukula Darshanam ↓</span>
                  </button>

                  <button
                    type="button"
                    className="hero-cta-primary"
                    onClick={() => handleSelectContent("contact")}
                  >
                    <span>Admission Enquiry</span>
                    <ArrowUpRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="hero-cta-secondary"
                    onClick={() => handleSelectContent("story")}
                  >
                    <Scroll size={16} />
                    <span>Our 30-Yr Heritage</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    className="hero-cta-tertiary"
                    onClick={() => setIsDirectionsOpen(true)}
                    title="Interactive Google Maps directions to Gurukula"
                  >
                    <Navigation size={15} />
                    <span>Directions &amp; Map</span>
                  </button>
                </div>

                {/* Balanced 2x2 Highlights Grid */}
                <div className="hero-features-grid">
                  <div className="hero-feature-box">
                    <span className="feature-icon">🌿</span>
                    <div className="feature-info">
                      <strong>100% Free of Cost</strong>
                      <span>Education, Living &amp; Satvic Meals</span>
                    </div>
                  </div>

                  <div className="hero-feature-box">
                    <span className="feature-icon">📜</span>
                    <div className="feature-info">
                      <strong>Dual Board Certification</strong>
                      <span>SSLC &amp; Karnataka Sanskrit Univ.</span>
                    </div>
                  </div>

                  <div className="hero-feature-box">
                    <span className="feature-icon">🪷</span>
                    <div className="feature-info">
                      <strong>Spoken Sanskrit Fluency</strong>
                      <span>Natural Living Shastric Immersion</span>
                    </div>
                  </div>

                  <div className="hero-feature-box">
                    <span className="feature-icon">🏡</span>
                    <div className="feature-info">
                      <strong>12-Acre Green Campus</strong>
                      <span>Ramohalli, Bengaluru Sanctuary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="maitreyi-hero-art">
              <HeroShowcaseCard />
            </div>
          </div>

          {/* Hero Bottom Strip Ribbon */}
          <div className="maitreyi-hero-bottom">
            <div className="maitreyi-hero-bottom-inner">
              <button
                type="button"
                className="hero-strip-item hero-strip-clickable"
                onClick={() => setIsDirectionsOpen(true)}
                title="Click to view interactive Google Maps & transit directions"
              >
                <MapPin size={15} />
                <span>Ramohalli, Bengaluru (Near Big Banyan Tree) • View Directions 📍</span>
              </button>
              <div className="hero-strip-sep">/</div>
              <div className="hero-strip-item">
                <Calendar size={15} />
                <span>Inaugurated Vyasa Poornima 1994</span>
              </div>
              <div className="hero-strip-sep">/</div>
              <div className="hero-strip-item">
                <Award size={15} />
                <span>SSLC &amp; Karnataka Sanskrit University</span>
              </div>
              <div className="hero-strip-sep">/</div>
              <div className="hero-strip-item">
                <Sun size={15} />
                <span>Charitable &amp; 100% Free of Cost</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      {activeSection ? (
        /* ================= MODE: RESPECTIVE CONTENT VIEW ================= */
        <div className="qa-single-content-wrapper">
          {/* Living Vedic Background Animation (Golden Prana & Scenic Campus) */}
          <GurukulaBackgroundAnimation variant="content" />

          {/* Sticky Navigation Bar with Back Button & Content Switcher */}
          <QuickAccessTopBar
            activeId={activeSection}
            onBack={handleBackToQuickAccess}
            onSelectContent={handleSelectContent}
          />

          {/* Atmospheric Majestic Gateway Banner for the Selected Dimension */}
          {activeItemData && (
            <div className="qa-pathway-atmosphere-header">
              <div
                className="qa-pathway-bg-photo"
                style={{
                  backgroundImage: `url(${activeItemData.image || "/images/campus/campus-panoramic.webp"})`,
                }}
              />
              <div className="qa-pathway-scrim" />
              <div className="qa-pathway-content">
                <div className="qa-pathway-badge-row">
                  <span className="qa-pathway-num">{activeItemData.num}</span>
                  <span className="qa-pathway-category">{activeItemData.categoryLabel}</span>
                  {activeItemData.kannadaTitle && (
                    <span className="qa-pathway-kannada">✦ {activeItemData.kannadaTitle}</span>
                  )}
                </div>
                <h1 className="qa-pathway-title">{activeItemData.title}</h1>
                <p className="qa-pathway-summary">{activeItemData.summary}</p>
                {activeItemData.keyChips && activeItemData.keyChips.length > 0 && (
                  <div className="qa-pathway-chips">
                    {activeItemData.keyChips.map((chip, idx) => (
                      <span key={idx} className="qa-pathway-chip">
                        ✦ {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* The Respective Content Screen */}
          <div className="qa-active-content-container">
            {renderSelectedContent()}
          </div>

          {/* Bottom Return Bar */}
          <div className="qa-bottom-return-bar">
            <div className="qa-bottom-return-container">
              <button
                type="button"
                className="qa-bottom-back-btn"
                onClick={handleBackToQuickAccess}
                title="Return to Gurukula Darshanam"
              >
                <ArrowLeft size={18} />
                <span>Back to Gurukula Darshanam</span>
              </button>

              {nextItem && (
                <button
                  type="button"
                  className="qa-bottom-next-btn"
                  onClick={() => handleSelectContent(nextItem.id)}
                  title={`Next: ${nextItem.title}`}
                >
                  <span>Next: {nextItem.title}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ================= GURUKULA DARSHANAM GATEWAY ================= */
        <QuickAccessGrid
          onSelectContent={handleSelectContent}
        />
      )}

      {/* ================= COMPREHENSIVE FOOTER ================= */}
      <footer className="maitreyi-footer">
        <div className="footer-container">
          {/* Column 1: Brand & Ethos */}
          <div className="footer-col-brand">
            <div className="footer-brand-title">
              <img
                src="/images/brand/logo.png"
                alt="Shubham Karoti Maitreyi Gurukula"
                className="footer-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="footer-brand-text">
                <strong>Maitreyi Gurukula</strong>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#fbbf24",
                    fontWeight: "700",
                  }}
                >
                  Shubham Karoti • Bengaluru
                </span>
              </div>
            </div>
            <div className="footer-floral-ornament">
              <img
                src="/images/brand/floral-line.png"
                alt=""
                className="footer-floral-img"
              />
            </div>
            <p style={{ margin: "14px 0" }}>
              A charitable residential institution spread across 12 acres near the Big Banyan Tree, empowering girls through value-based traditional education, living Sanskrit, and holistic character building.
            </p>
            <div
              className="footer-location-tag"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#e2e8f0",
              }}
            >
              <MapPin size={15} style={{ color: "#fbbf24" }} />
              <span>Ramohalli, Kengeri Hobli, Bengaluru 560 074</span>
            </div>
            <button
              type="button"
              className="footer-directions-btn"
              onClick={() => setIsDirectionsOpen(true)}
            >
              <Navigation size={14} />
              <span>Google Maps &amp; Transit Directions</span>
            </button>
            <div className="footer-social-row">
              <a
                href="https://www.facebook.com/Shubham.Karoti.Gurukula"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/channel/UC9TV50PmZrCNhZdNley6bAg"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                YouTube
              </a>
              <a
                href="https://wa.me/919845403290"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="footer-col-nav">
            <h4>Quick Links</h4>
            <div
              className="footer-links-grid"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("story")}
              >
                Our Story &amp; Origins
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("philosophy")}
              >
                Gurukula Philosophy
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("panchamukhi")}
              >
                Panchamukhi Shikshana
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("campus-photos")}
              >
                Ramohalli Campus Photos
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("admissions")}
              >
                Admissions &amp; Eligibility
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("campus")}
              >
                12-Acre Campus Life
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("routine")}
              >
                Daily Routine (Dinacharya)
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("acharyas")}
              >
                Acharyas &amp; Founders
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("gallery")}
              >
                Photo &amp; Video Gallery
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("faqs")}
              >
                Frequently Asked Questions
              </button>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleSelectContent("contact")}
              >
                Contact &amp; Enquiry Form
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Visiting */}
          <div className="footer-col-contact">
            <h4>Direct Contact</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "13.5px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Sri Pramod Kamat
                </span>
                <a
                  href="tel:+919845403290"
                  style={{
                    color: "#ffffff",
                    fontWeight: "750",
                    textDecoration: "none",
                  }}
                >
                  +91 9845403290
                </a>
              </div>
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Gurukula Office
                </span>
                <a
                  href="tel:+916362133847"
                  style={{
                    color: "#ffffff",
                    fontWeight: "750",
                    textDecoration: "none",
                  }}
                >
                  +91 6362133847
                </a>
              </div>
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Sri Venugopal
                </span>
                <a
                  href="tel:+919900216373"
                  style={{
                    color: "#ffffff",
                    fontWeight: "750",
                    textDecoration: "none",
                  }}
                >
                  +91 9900216373
                </a>
              </div>
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Email Address
                </span>
                <a
                  href="mailto:shubhamkarotimaitreyigurukula@gmail.com"
                  style={{
                    color: "#38bdf8",
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  shubhamkarotimaitreyigurukula@gmail.com
                </a>
              </div>
              <div
                style={{
                  marginTop: "4px",
                  color: "#cbd5e1",
                  fontSize: "12.5px",
                }}
              >
                <span>🕒 Open Mon–Sat: 9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Portal & Admin Office */}
          <div className="footer-col-cta">
            <h4>Administrative Office</h4>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.5",
                color: "#cbd5e1",
                margin: "0 0 16px",
              }}
            >
              No. 37, 1st Main, Ramachandra Puram, Bengaluru 560 021, Karnataka, India
            </p>
            <h4 style={{ margin: "16px 0 8px" }}>Internal System</h4>
            <p
              style={{
                fontSize: "12.5px",
                color: "#94a3b8",
                margin: "0 0 12px",
              }}
            >
              Authorized tracking system for Acharyas, teachers &amp; staff.
            </p>
            <button className="footer-login-btn" onClick={onLogin}>
              <span>Staff Portal Login</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© 2026 Shubham Karoti Maitreyi Gurukula. All rights reserved.</span>
          <span style={{ fontStyle: "italic", color: "#fbbf24" }}>
            &ldquo;Swastha Susamskruta Samajada Nirmana&rdquo;
          </span>
          <button
            type="button"
            className="footer-back-to-top"
            onClick={handleBackToQuickAccess}
          >
            Back to Gurukula Darshanam ↑
          </button>
        </div>
      </footer>

      {/* ================= PERSISTENT FLOATING QUICK ACCESS BUTTON ================= */}
      <button
        type="button"
        className="floating-quick-access-fab"
        onClick={
          activeSection
            ? handleBackToQuickAccess
            : () => {
                const hub = document.getElementById("gurukula-darshanam");
                if (hub) {
                  hub.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
        }
        title={activeSection ? "Return to Gurukula Darshanam" : "Explore Gurukula Darshanam"}
        aria-label="Gurukula Darshanam"
      >
        <div className="fab-pulse-ring" aria-hidden="true" />
        {activeSection ? (
          <>
            <ArrowLeft size={18} className="fab-icon" />
            <span className="fab-label">Back to Darshanam</span>
          </>
        ) : (
          <>
            <Compass size={18} className="fab-icon" />
            <span className="fab-label">Gurukula Darshanam</span>
          </>
        )}
      </button>

      {/* ================= DIRECTIONS MODAL POPUP ================= */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />
    </div>
  );
}

export default Home;