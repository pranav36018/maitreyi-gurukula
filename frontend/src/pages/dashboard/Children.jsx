
import { useEffect, useMemo, useState } from "react";
import ChildProfile from "./ChildProfile";
import { getChildren } from "../../services/api";
import "./Children.css";

function Children() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadChildren();
  }, []);

  const grades = useMemo(() => {
    const uniqueGrades = [
      ...new Set(children.map((child) => child.grade).filter(Boolean)),
    ];
    return ["All", ...uniqueGrades];
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

    return matchesSearch && matchesGrade;
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
      <div className="children-heading">
        <div>
          <span>GURUKULA CHILDREN</span>
          <h1>Children</h1>
          <p>
            View and follow each child&apos;s journey through the Gurukula.
          </p>
        </div>

        <div className="children-header-actions">
          <div className="children-count">
            <strong>{children.length}</strong>
            <span>Total Children</span>
          </div>
        </div>
      </div>

      <div className="children-toolbar">
        <input
          type="text"
          placeholder="Search by name, admission number or mentor..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search children"
        />

        <select
          value={gradeFilter}
          onChange={(event) => setGradeFilter(event.target.value)}
          aria-label="Filter children by grade"
        >
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade === "All" ? "All Grades" : `Grade ${grade}`}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="children-state">
          <p>Loading children from Gurukula database...</p>
        </div>
      )}

      {!loading && error && (
        <div className="children-state children-error">
          <strong>Unable to load children</strong>
          <p>{error}</p>
          <button onClick={loadChildren}>Try Again</button>
        </div>
      )}

      {!loading && !error && filteredChildren.length === 0 && (
        <div className="children-state">
          <strong>No children found</strong>
          <p>
            No child records currently match your search or grade filter.
            New children are registered through Admissions after joining is
            confirmed.
          </p>
        </div>
      )}

      {!loading && !error && filteredChildren.length > 0 && (
        <div className="children-grid">
          {filteredChildren.map((child) => {
            const fullName = [
              child.firstName,
              child.middleName,
              child.lastName,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={child._id}
                type="button"
                className="child-card"
                onClick={() => setSelectedChild(child)}
                aria-label={`Open profile for ${fullName}`}
              >
                <div className="child-card-top">
                  <div className="child-avatar">
                    {child.firstName?.charAt(0).toUpperCase() || "?"}
                  </div>

                  <span
                    className={`child-status ${
                      child.status === "Active" ? "active" : ""
                    }`}
                  >
                    {child.status || "Active"}
                  </span>
                </div>

                <div className="child-card-info">
                  <h2>{fullName || "Unnamed Child"}</h2>
                  <p>
                    {child.grade ? `Grade ${child.grade}` : "Grade not available"}
                  </p>

                  {child.admissionNumber && (
                    <small>{child.admissionNumber}</small>
                  )}

                  {child.mentor && <small>Mentor: {child.mentor}</small>}
                </div>

                <div className="child-card-arrow">→</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Children;
