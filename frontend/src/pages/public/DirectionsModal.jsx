import { useEffect, useState } from "react";
import {
  MapPin,
  X,
  Navigation,
  Compass,
  Bus,
  Train,
  Car,
  Copy,
  Check,
  ExternalLink,
  Phone,
} from "lucide-react";
import "./DirectionsModal.css";

function DirectionsModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fullAddress =
    "Shubham Karoti (Maitreyi Gurukula), No 52/1, Big Banyan Tree Road, Ramohalli, Kengeri Hobli, Bengaluru 560074, Karnataka, India";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Shubham+Karoti+Gurukula+Ramohalli+Bengaluru";

  return (
    <div className="directions-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="directions-modal-card"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="directions-modal-header">
          <div className="modal-header-brand">
            <div className="modal-brand-mark">
              <span>M</span>
            </div>
            <div>
              <h3>Directions to Gurukula</h3>
              <p>Shubham Karoti Maitreyi Gurukula • Ramohalli, Bengaluru</p>
            </div>
          </div>
          <button
            className="directions-modal-close"
            onClick={onClose}
            aria-label="Close directions popup"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="directions-modal-body">
          {/* Quick Action Banner */}
          <div className="directions-action-banner">
            <div className="action-banner-text">
              <span className="action-pill">
                <Compass size={14} /> LIVE NAVIGATION
              </span>
              <h4>Reach Gurukula easily on Google Maps</h4>
              <p>Open turn-by-turn driving, cycling, or transit directions on your phone or computer.</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-nav-btn"
            >
              <Navigation size={18} />
              <span>Start Navigation</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Google Maps Interactive Frame */}
          <div className="directions-map-frame-container">
            <iframe
              title="Interactive Google Maps Directions to Shubham Karoti Gurukula"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.016386997602!2d77.42642911430382!3d12.906667719793104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae38f96b4a72b7%3A0xe52a35b7bcd34570!2sShubham+Karoti+Gurukula!5e0!3m2!1sen!2sin!4v1540203970102"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Address & Copy Block */}
          <div className="directions-address-box">
            <div className="address-box-left">
              <div className="address-icon-wrap">
                <MapPin size={22} />
              </div>
              <div>
                <strong>Shubham Karoti Maitreyi Gurukula</strong>
                <p>
                  No 52/1, Big Banyan Tree Road, Ramohalli, Kengeri Hobli,
                  <br />
                  Bengaluru 560 074, Karnataka, India
                </p>
                <span className="landmark-tag">
                  🌿 Landmark: 1.5 km before Dodda Alada Mara (Big Banyan Tree)
                </span>
              </div>
            </div>
            <button
              className={`copy-address-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title="Copy address to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Transit & Commute Guidance Grid */}
          <div className="directions-transit-grid">
            {/* By Car / Two-Wheeler */}
            <div className="transit-card">
              <div className="transit-card-top">
                <div className="transit-icon car-icon">
                  <Car size={20} />
                </div>
                <h5>By Car / Two-Wheeler</h5>
              </div>
              <p>
                From Mysore Road, cross Kengeri &rarr; proceed towards Kommaghatta Road &rarr; continue 8 km to Ramohalli. Gurukula campus is on the main Big Banyan Tree Road.
              </p>
            </div>

            {/* By Namma Metro */}
            <div className="transit-card">
              <div className="transit-card-top">
                <div className="transit-icon metro-icon">
                  <Train size={20} />
                </div>
                <h5>By Namma Metro (Purple Line)</h5>
              </div>
              <p>
                Get down at <strong>Kengeri Bus Terminal</strong> or <strong>Challaghatta Metro Station</strong>. Auto-rickshaws or BMTC feeder buses to Ramohalli take approximately 15–20 minutes.
              </p>
            </div>

            {/* By BMTC Bus */}
            <div className="transit-card">
              <div className="transit-card-top">
                <div className="transit-icon bus-icon">
                  <Bus size={20} />
                </div>
                <h5>By BMTC Public Bus</h5>
              </div>
              <p>
                Board BMTC Route <strong>227 series</strong> (227, 227A, 227C) from Majestic (Kempegowda Bus Station) or K.R. Market heading towards Dodda Alada Mara. Request <strong>Ramohalli Gurukula Stop</strong>.
              </p>
            </div>
          </div>

          {/* Contact Helpline Strip */}
          <div className="directions-helpline-strip">
            <div className="helpline-text">
              <Phone size={18} />
              <span>Need help finding the route? Call us directly:</span>
            </div>
            <div className="helpline-phones">
              <a href="tel:+919845403290">+91 9845403290</a>
              <span className="helpline-sep">•</span>
              <a href="tel:+916362133847">+91 6362133847</a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="directions-modal-footer">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-nav-btn"
          >
            <Navigation size={18} />
            <span>Open in Google Maps App</span>
          </a>
          <button className="footer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectionsModal;
