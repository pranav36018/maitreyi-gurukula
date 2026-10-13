import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import ChildProfile from "./ChildProfile";
import { getChildren, deleteChild } from "../../services/api";
import "./Children.css";

const CARD_PALETTES = [
  {
    name: "saffron",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    glow: "rgba(245, 158, 11, 0.35)",
    ribbon: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    tagBg: "#fffbeb",
    tagColor: "#b45309",
    tagBorder: "#fde68a",
  },
  {
    name: "emerald",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glow: "rgba(16, 185, 129, 0.35)",
    ribbon: "linear-gradient(90deg, #10b981, #34d399)",
    tagBg: "#ecfdf5",
    tagColor: "#047857",
    tagBorder: "#a7f3d0",
  },
  {
    name: "indigo",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    glow: "rgba(99, 102, 241, 0.35)",
    ribbon: "linear-gradient(90deg, #6366f1, #818cf8)",
    tagBg: "#eef2ff",
    tagColor: "#4338ca",
    tagBorder: "#c7d2fe",
  },
  {
    name: "terracotta",
    gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    glow: "rgba(249, 115, 22, 0.35)",
    ribbon: "linear-gradient(90deg, #f97316, #fb923c)",
    tagBg: "#fff7ed",
    tagColor: "#c2410c",
    tagBorder: "#fed7aa",
  },
  {
    name: "teal",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
    glow: "rgba(6, 182, 212, 0.35)",
    ribbon: "linear-gradient(90deg, #06b6d4, #22d3ee)",
    tagBg: "#f0fdfa",
    tagColor: "#0f766e",
    tagBorder: "#99f6e4",
  },
  {
    name: "rose",
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    glow: "rgba(236, 72, 153, 0.35)",
    ribbon: "linear-gradient(90deg, #ec4899, #f472b6)",
    tagBg: "#fdf2f8",
    tagColor: "#be185d",
    tagBorder: "#fbcfe8",
  },
];

function getPalette(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_PALETTES[Math.abs(hash) % CARD_PALETTES.length];
}

function Children() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadChildren = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getChildren();
      setChildren(response.data || []);
    } catch (err) {
      console.error("Unable to load children:", err);
      setError(err.message || "Unable to load children.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChild = async (child) => {
    const fullName = [
      child.firstName,
      child.middleName,
      child.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName || "this child"}? This action may be permanent.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(child._id);
      setError("");

      await deleteChild(child._id);

      setChildren((current) =>
        current.filter((item) => item._id !== child._id)
      );
    } catch (err) {
      console.error("Unable to delete child:", err);
      setError(err.message || "Unable to delete child.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getChildren()
      .then((response) => {
        if (isMounted) {
          setChildren(response.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Unable to load children:", err);
          setError(err.message || "Unable to load children.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const grades = useMemo(() => {
    const uniqueGrades = [
      ...new Set(children.map((child) => child.grade).filter(Boolean)),
    ];
    return ["All", ...uniqueGrades];
  }, [children]);

  const activeCount = useMemo(() => {
    return children.filter(
      (c) => (c.status || "Active").toLowerCase() === "active"
    ).length;
  }, [children]);

  const alumniCount = useMemo(() => {
    return children.filter(
      (c) => (c.status || "").toLowerCase() === "alumni"
    ).length;
  }, [children]);

  const mentorsCount = useMemo(() => {
    return new Set(children.map((c) => c.mentor).filter(Boolean)).size;
  }, [children]);

  const filteredChildren = children.filter((child) => {
    const fullName = [
      child.firstName,
      child.middleName,
      child.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      fullName.toLowerCase().includes(searchText) ||
      (child.admissionNumber || "").toLowerCase().includes(searchText) ||
      (child.mentor || "").toLowerCase().includes(searchText);

    const matchesGrade =
      gradeFilter === "All" || child.grade === gradeFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (child.status || "Active").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesGrade && matchesStatus;
  });

  if (selectedChild) {
    return (
      <ChildProfile
        child={selectedChild}
        onBack={() => setSelectedChild(null)}
      />
    );
  }

  return (
    <div className="children-page">
      {/* HEADER SECTION WITH STATS CARDS */}
      <div className="children-hero-banner">
        <div className="children-heading">
          <span className="children-eyebrow">GURUKULA SHISHYA DIRECTORY</span>
          <h1>Children & Learning Journeys</h1>
          <p className="children-description">
            Follow each child&apos;s holistic growth, academic accomplishments,
            mentorship guidance, and character development through the Gurukula.
          </p>
        </div>

        <div className="children-stats-row">
          <div className="children-stat-pill stat-emerald">
            <span className="stat-num">{children.length}</span>
            <span className="stat-label">Enrolled Shishyas</span>
          </div>
          <div className="children-stat-pill stat-saffron">
            <span className="stat-num">{activeCount}</span>
            <span className="stat-label">Active Learners</span>
          </div>
          <div className="children-stat-pill stat-purple">
            <span className="stat-num">{alumniCount}</span>
            <span className="stat-label">Alumni Network</span>
          </div>
          <div className="children-stat-pill stat-teal">
            <span className="stat-num">{grades.filter((g) => g !== "All").length}</span>
            <span className="stat-label">Grade Levels</span>
          </div>
          <div className="children-stat-pill stat-terracotta">
            <span className="stat-num">{mentorsCount}</span>
            <span className="stat-label">Mentors Guiding</span>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="children-toolbar-container">
        <div className="children-search-box">
          <Search className="search-icon" size={18} strokeWidth={2.2} />
          <input
            type="text"
            className="children-search-input"
            placeholder="Search by student name, admission number, or mentor..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search children"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className="children-grade-pills">
          <button
            type="button"
            className={`grade-filter-pill ${statusFilter === "All" && gradeFilter === "All" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("All");
              setGradeFilter("All");
            }}
          >
            All Students
          </button>
          <button
            type="button"
            className={`grade-filter-pill ${statusFilter === "Active" ? "active" : ""}`}
            onClick={() => setStatusFilter(statusFilter === "Active" ? "All" : "Active")}
          >
            Active Only
          </button>
          <button
            type="button"
            className={`grade-filter-pill ${statusFilter === "Alumni" ? "active" : ""}`}
            onClick={() => setStatusFilter(statusFilter === "Alumni" ? "All" : "Alumni")}
          >
            Alumni Only
          </button>
          {grades.filter((g) => g !== "All").map((grade) => (
            <button
              key={grade}
              type="button"
              className={`grade-filter-pill ${gradeFilter === grade ? "active" : ""}`}
              onClick={() => setGradeFilter(gradeFilter === grade ? "All" : grade)}
            >
              Grade {grade}
            </button>
          ))}
        </div>

        <div className="children-results-count">
          <strong>{filteredChildren.length}</strong> of {children.length} students
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="children-state children-loading">
          <div className="children-spinner"></div>
          <p>Loading children from Gurukula database...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="children-state children-error">
          <strong>Unable to load children records</strong>
          <p>{error}</p>
          <button onClick={loadChildren}>Reload Children</button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredChildren.length === 0 && (
        <div className="children-state children-empty-state">
          <div className="empty-icon-circle">🔍</div>
          <strong>No matching children found</strong>
          <p>
            No student records match &quot;{search}&quot;
            {gradeFilter !== "All" ? ` in Grade ${gradeFilter}` : ""}.
          </p>
          <button
            type="button"
            className="reset-filters-btn"
            onClick={() => {
              setSearch("");
              setGradeFilter("All");
              setStatusFilter("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* CHILDREN CARDS GRID */}
      {!loading && !error && filteredChildren.length > 0 && (
        <div className="children-grid">
          {filteredChildren.map((child) => {
            const fullName = [child.firstName, child.middleName, child.lastName]
              .filter(Boolean)
              .join(" ") || "Gurukula Child";
            const palette = getPalette(fullName);
            const initial = child.firstName?.charAt(0).toUpperCase() || "G";
            const childStatus = child.status || "Active";
            const statusClass =
              childStatus.toLowerCase() === "active"
                ? "status-active"
                : childStatus.toLowerCase() === "alumni"
                ? "status-alumni"
                : "status-other";

            return (
              <div
                key={child._id}
                className="child-card"
                style={{ "--card-glow": palette.glow }}
              >
                <div
                  className="child-card-ribbon"
                  style={{ background: palette.ribbon }}
                ></div>

                <div
                  className="child-card-content"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedChild(child)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedChild(child);
                    }
                  }}
                  aria-label={`Open profile for ${fullName}`}
                >
                  <div className="child-card-top">
                    <div
                      className="child-avatar"
                      style={{
                        background: palette.gradient,
                        boxShadow: `0 8px 20px ${palette.glow}`,
                      }}
                    >
                      {initial}
                    </div>
                    <span className={`child-status ${statusClass}`}>
                      <i className="status-dot"></i>
                      {childStatus}
                    </span>
                  </div>

                  <div className="child-card-info">
                    <h2>{fullName}</h2>

                    <div className="child-tags-row">
                      {child.grade && (
                        <span
                          className="child-tag grade-tag"
                          style={{
                            background: palette.tagBg,
                            color: palette.tagColor,
                            borderColor: palette.tagBorder,
                          }}
                        >
                          Grade {child.grade}
                        </span>
                      )}
                      {child.admissionNumber && (
                        <span className="child-tag admission-tag">
                          ID #{child.admissionNumber}
                        </span>
                      )}
                    </div>

                    {child.mentor && (
                      <div className="child-mentor-line">
                        <span className="mentor-icon">👤</span>
                        <span className="mentor-text">
                          Mentor: <strong>{child.mentor}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="child-card-footer">
                    <span className="child-view-btn">
                      Explore Journey
                      <span className="btn-arrow">→</span>
                    </span>
                  </div>
                </div>

                <div className="child-card-actions">
                  <button
                    type="button"
                    className="delete-child-button"
                    disabled={deletingId === child._id}
                    onClick={() => handleDeleteChild(child)}
                    title="Delete child record"
                  >
                    {deletingId === child._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Children;
