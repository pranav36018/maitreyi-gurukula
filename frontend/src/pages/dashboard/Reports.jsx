
import { useEffect, useState } from "react";

import {
  getChildren,
  getAdmissions,
  getFollowUps,
  getAcademics,
  getSkills,
  getAchievements,
  getObservations,
  getWellbeings,
  getResponsibilities,
} from "../../services/api";

import "./Dashboard.css";
import "./Reports.css";

const reportTypes = [
  {
    id: "children",
    number: "01",
    title: "Child Directory",
    description: "Child names, grades, admission details and status.",
  },
  {
    id: "academics",
    number: "02",
    title: "Academic Progress",
    description: "Subject-wise performance and academic remarks.",
  },
  {
    id: "skills",
    number: "03",
    title: "Skills & Talents",
    description: "Skills, interests and development levels.",
  },
  {
    id: "achievements",
    number: "04",
    title: "Achievements",
    description: "Recorded achievements and recognition.",
  },
  {
    id: "wellbeing",
    number: "05",
    title: "Wellbeing",
    description: "Wellbeing records and support status.",
  },
  {
    id: "followups",
    number: "06",
    title: "Follow-ups",
    description: "Pending actions, due dates and assigned staff.",
  },
  {
    id: "admissions",
    number: "07",
    title: "Admissions",
    description: "Prospective children and admission progress.",
  },
  {
    id: "observations",
    number: "08",
    title: "Mentor Observations",
    description: "Observations recorded for each child.",
  },
  {
    id: "responsibilities",
    number: "09",
    title: "Responsibilities",
    description: "Leadership, seva and other responsibilities.",
  },
];

function getChildName(child) {
  if (!child) return "Gurukula Child";
  if (typeof child === "string") return child;

  return (
    child.fullName ||
    child.name ||
    [
      child.firstName,
      child.middleName,
      child.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    "Gurukula Child"
  );
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN");
}

function downloadCsv(filename, rows) {
  if (!rows.length) {
    alert("There are no records to download for this report.");
    return;
  }

  const headers = Object.keys(rows[0]);

  const escapeCsv = (value) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsv(row[header])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function Reports() {
  const [selectedReport, setSelectedReport] = useState("children");
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      setLoading(true);
      setError("");

      try {
        const [
          childrenResponse,
          admissionsResponse,
          followUpsResponse,
          academicsResponse,
          skillsResponse,
          achievementsResponse,
          wellbeingResponse,
          observationsResponse,
          responsibilitiesResponse,
        ] = await Promise.all([
          getChildren().catch(() => ({ data: [] })),
          getAdmissions().catch(() => ({ data: [] })),
          getFollowUps().catch(() => ({ data: [] })),
          getAcademics().catch(() => ({ data: [] })),
          getSkills().catch(() => ({ data: [] })),
          getAchievements().catch(() => ({ data: [] })),
          getWellbeings().catch(() => ({ data: [] })),
          getObservations().catch(() => ({ data: [] })),
          getResponsibilities().catch(() => ({ data: [] })),
        ]);

        const children = childrenResponse.data || [];
        const admissions = admissionsResponse.data || [];
        const followUps = followUpsResponse.data || [];
        const academics = academicsResponse.data || [];
        const skills = skillsResponse.data || [];
        const achievements = achievementsResponse.data || [];
        const wellbeing = wellbeingResponse.data || [];
        const observations = observationsResponse.data || [];
        const responsibilities = responsibilitiesResponse.data || [];

        const reportRecords = {
          children: children.map((child) => ({
            "Child Name": getChildName(child),
            "Admission Number": child.admissionNumber || "",
            Grade: child.grade || "",
            "Admission Year":
              child.admissionYear ||
              (child.admissionDate
                ? new Date(child.admissionDate).getFullYear()
                : ""),
            Status: child.status || "Active",
            Mentor: child.mentor || "",
          })),

          admissions: admissions.map((item) => ({
            "Child Name": getChildName(item),
            "Parent / Guardian": item.parentName || "",
            Phone: item.parentPhone || "",
            Status: item.status || "",
            "Enquiry Date": formatDate(item.enquiryDate),
            "Interview Date": formatDate(item.interviewDate),
            "Next Follow-up": formatDate(item.nextFollowUpDate),
          })),

          followups: followUps.map((item) => ({
            "Child Name": getChildName(item.child),
            Title: item.title || "",
            Category: item.category || "",
            Status: item.status || "",
            "Due Date": formatDate(item.dueDate),
            "Assigned To": item.assignedTo || "",
            Note: item.note || "",
          })),

          academics: academics.map((item) => ({
            "Child Name": getChildName(item.child),
            "Academic Year": item.academicYear || "",
            Subject: item.subject || "",
            Performance: item.performance || "",
            Remarks: item.remarks || "",
          })),

          skills: skills.map((item) => ({
            "Child Name": getChildName(item.child),
            Skill: item.skillName || "",
            Category: item.category || "",
            "Development Level": item.developmentLevel || "",
            "Interest Level": item.interestLevel || "",
            Remarks: item.remarks || "",
          })),

          achievements: achievements.map((item) => ({
            "Child Name": getChildName(item.child),
            Title: item.title || "",
            Category: item.category || "",
            Level: item.level || "",
            Date: formatDate(item.achievementDate),
            Description: item.description || "",
          })),

          wellbeing: wellbeing.map((item) => ({
            "Child Name": getChildName(item.child),
            Area: item.area || "",
            Status: item.status || "",
            Observation: item.observation || "",
            "Support Provided": item.supportProvided || "",
            "Observed Date": formatDate(item.observedAt),
            "Follow-up Required": item.followUpRequired ? "Yes" : "No",
            "Follow-up Date": formatDate(item.followUpDate),
          })),

          observations: observations.map((item) => ({
            "Child Name": getChildName(item.child),
            Category: item.category || "",
            Tags: Array.isArray(item.tags)
              ? item.tags.join("; ")
              : item.tags || "",
            Note: item.note || item.observation || "",
            Date: formatDate(
              item.observedAt || item.createdAt
            ),
            "Follow-up Required": item.followUpRequired ? "Yes" : "No",
            "Follow-up Date": formatDate(item.followUpDate),
          })),

          responsibilities: responsibilities.map((item) => ({
            "Child Name": getChildName(item.child),
            Title: item.title || "",
            Category: item.category || "",
            Description: item.description || "",
            Status: item.status || "",
            "Start Date": formatDate(item.startDate),
            "End Date": formatDate(item.endDate),
            Remarks: item.remarks || "",
          })),
        };

        if (!cancelled) {
          setReportData(reportRecords);
        }
      } catch (err) {
        console.error("Unable to load reports:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load report data. Please check the backend."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeReport = reportTypes.find(
    (report) => report.id === selectedReport
  );

  const rows = reportData[selectedReport] || [];

  const handleDownload = () => {
    const safeName = activeReport.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    downloadCsv(
      `gurukula-${safeName}-${new Date().toISOString().slice(0, 10)}.csv`,
      rows
    );
  };

  return (
    <div className="reports-page">
      <div className="reports-heading">
        <span>GURUKULA RECORDS</span>
        <h1>Reports & Insights</h1>
        <p>
          Explore records from the Gurukula database and download
          reports for review and planning.
        </p>
      </div>
      <div className="reports-summary">
        {[
          ["Children", reportData.children?.length ?? "—"],
          ["Admissions", reportData.admissions?.length ?? "—"],
          ["Achievements", reportData.achievements?.length ?? "—"],
          ["Open Follow-ups", reportData.followups
            ? reportData.followups.filter(
                (item) =>
                  item.Status !== "Completed" &&
                  item.Status !== "Closed"
              ).length
            : "—"],
        ].map(([label, value]) => (
          <div key={label} className="report-summary-card">
            <span>{label.toUpperCase()}</span>
            <strong>{loading ? "…" : value}</strong>
          </div>
        ))}
      </div>
      {error && (
        <div role="alert" className="reports-error-banner">
          <strong>Reports could not be loaded</strong>
          <p>{error}</p>
          <button
            type="button"
            className="reports-retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}
      <div className="reports-grid">
        {reportTypes.map((report) => (
          <button
            type="button"
            key={report.id}
            className={
              selectedReport === report.id
                ? "report-card report-card-active"
                : "report-card"
            }
            onClick={() => setSelectedReport(report.id)}
          >
            <span>{report.number}</span>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <p className="report-card-count">
              {loading
                ? "Loading records…"
                : `${reportData[report.id]?.length || 0} records`}
            </p>
          </button>
        ))}
      </div>
      <section className="report-preview-section">
        <div className="report-preview-header">
          <div>
            <span>SELECTED REPORT</span>
            <h2>{activeReport?.title}</h2>
            <p>
              {rows.length} record{rows.length === 1 ? "" : "s"} available
            </p>
          </div>
          <button
            type="button"
            className="report-download-btn"
            onClick={handleDownload}
            disabled={loading || Boolean(error) || rows.length === 0}
          >
            Download CSV
          </button>
        </div>
        {loading ? (
          <p className="reports-loading-text">Loading report records…</p>
        ) : rows.length === 0 ? (
          <div className="report-empty">
            <div className="report-empty-icon">—</div>
            <h3>No records available yet</h3>
            <p>
              Once records are added for this category, they will
              appear here and can be downloaded as a CSV file.
            </p>
          </div>
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  {Object.keys(rows[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 25).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex}>
                        {String(value ?? "") || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 25 && (
              <p className="report-table-note">
                Previewing 25 records. Download the CSV to view all{" "}
                {rows.length} records.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reports;
