import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Grid,
} from "lucide-react";
import { CONTENT_ITEMS } from "./QuickAccessGrid";
import "./QuickAccessTopBar.css";

function QuickAccessTopBar({
  activeId,
  onBack,
  onSelectContent,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeIndex = CONTENT_ITEMS.findIndex((item) => item.id === activeId);
  const activeItem = CONTENT_ITEMS[activeIndex] || CONTENT_ITEMS[0];

  const prevItem =
    activeIndex > 0
      ? CONTENT_ITEMS[activeIndex - 1]
      : CONTENT_ITEMS[CONTENT_ITEMS.length - 1];

  const nextItem =
    activeIndex < CONTENT_ITEMS.length - 1
      ? CONTENT_ITEMS[activeIndex + 1]
      : CONTENT_ITEMS[0];

  const handleSelect = (id) => {
    setIsDropdownOpen(false);
    onSelectContent(id);
  };

  return (
    <aside className="qa-sticky-bar" aria-label="Gurukula Darshanam Navigation Bar">
      <div className="qa-sticky-container">
        {/* Left: Back Button */}
        <div className="qa-sticky-left">
          <button
            type="button"
            className="qa-sticky-back-btn"
            onClick={onBack}
            title="Return to Gurukula Darshanam"
          >
            <ArrowLeft size={16} />
            <span>Back to Gurukula Darshanam</span>
          </button>

          {/* Breadcrumb Info */}
          <div className="qa-sticky-breadcrumb">
            <span className="qa-sticky-bc-root" onClick={onBack}>
              Gurukula Darshanam
            </span>
            <span className="qa-sticky-bc-sep">/</span>
            <div className="qa-sticky-bc-current">
              <span className={`qa-sticky-dot dot-${activeItem.color}`}></span>
              <strong>{activeItem.title}</strong>
              <span className="qa-sticky-kannada">({activeItem.kannadaTitle})</span>
            </div>
          </div>
        </div>

        {/* Right: Switcher Dropdown & Next/Prev Navigation */}
        <div className="qa-sticky-right">
          {/* Direct Switcher Dropdown */}
          <div className="qa-switcher-wrap">
            <button
              type="button"
              className="qa-switcher-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              title="Switch directly to another dimension"
            >
              <Grid size={14} />
              <span>Switch Dimension</span>
              <ChevronDown size={14} className={isDropdownOpen ? "open" : ""} />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="qa-switcher-backdrop"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="qa-switcher-menu">
                  <div className="qa-switcher-menu-header">
                    <Sparkles size={13} />
                    <span>EXPLORE ALL SACRED DIMENSIONS</span>
                  </div>
                  <div className="qa-switcher-items-list">
                    {CONTENT_ITEMS.map((item) => {
                      const ItemIcon = item.icon;
                      const isCurrent = item.id === activeId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`qa-switcher-item ${isCurrent ? "active" : ""}`}
                          onClick={() => handleSelect(item.id)}
                        >
                          <div className={`qa-switcher-icon box-${item.color}`}>
                            <ItemIcon size={14} />
                          </div>
                          <div className="qa-switcher-info">
                            <span className="qa-switcher-title">{item.title}</span>
                            <span className="qa-switcher-kannada">{item.kannadaTitle}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Prev & Next Shortcuts */}
          <div className="qa-sticky-nav-btns">
            <button
              type="button"
              className="qa-nav-step-btn"
              onClick={() => onSelectContent(prevItem.id)}
              title={`Previous: ${prevItem.title}`}
            >
              <ArrowLeft size={13} />
              <span className="qa-nav-step-label">Prev</span>
            </button>

            <button
              type="button"
              className="qa-nav-step-btn qa-nav-step-next"
              onClick={() => onSelectContent(nextItem.id)}
              title={`Next: ${nextItem.title}`}
            >
              <span className="qa-nav-step-label">Next</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default QuickAccessTopBar;
