import { useEffect, useState } from "react";

import {
  getChildren,
  getAdmissions,
  getFollowUps,
  getAchievements,
  getSkills,
  getWellbeings,
  getObservations,
} from "../../services/api";

function DashboardStats() {
  const [stats, setStats] = useState({
    children: 0,
    admissions: 0,
    achievements: 0,
    skills: 0,
    wellbeing: 0,
    observations: 0,
    followUps: 0,
    needsSupport: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardStats = async () => {
      try {
        const [
          childrenResponse,
          admissionsResponse,
          followUpsResponse,
          achievementsResponse,
          skillsResponse,
          wellbeingResponse,
          observationsResponse,
        ] = await Promise.all([
          getChildren().catch(() => ({ data: [] })),
          getAdmissions().catch(() => ({ data: [] })),
          getFollowUps().catch(() => ({ data: [] })),
          getAchievements().catch(() => ({ data: [] })),
          getSkills().catch(() => ({ data: [] })),
          getWellbeings().catch(() => ({ data: [] })),
          getObservations().catch(() => ({ data: [] })),
        ]);

        const children = childrenResponse.data || [];
        const admissions = admissionsResponse.data || [];
        const followUps = followUpsResponse.data || [];
        const achievements = achievementsResponse.data || [];
        const skills = skillsResponse.data || [];
        const wellbeing = wellbeingResponse.data || [];
        const observations = observationsResponse.data || [];

        const needSupportChildIds = new Set();
        wellbeing.forEach((item) => {
          if (
            item.status === "Needs Attention" ||
            item.status === "Under Support"
          ) {
            const id = item.child?._id || item.child;
            if (id) needSupportChildIds.add(String(id));
          }
        });

        observations.forEach((item) => {
          if (item.followUpRequired === true) {
            const id = item.child?._id || item.child;
            if (id) needSupportChildIds.add(String(id));
          }
        });

        const pendingFollowUps = followUps.filter(
          (item) =>
            item.status !== "Completed" &&
            item.status !== "Closed"
        ).length;

        if (isMounted) {
          setStats({
            children: children.length,
            admissions: admissions.length,
            achievements: achievements.length,
            skills: skills.length,
            wellbeing: wellbeing.length,
            observations: observations.length,
            followUps: pendingFollowUps,
            needsSupport: needSupportChildIds.size,
          });
        }
      } catch (error) {
        console.error(
          "Unable to load dashboard statistics:",
          error
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardStats();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="dashboard-live-stats">
        <div className="dashboard-live-heading">
          <span>LIVE DATA</span>

          <h2>
            Loading Gurukula journey...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-live-stats">
      <div className="dashboard-live-heading">
        <div>
          <span>LIVE DATA</span>

          <h2>
            Gurukula Journey Overview
          </h2>

          <p>
            These numbers are connected
            directly to the records stored
            in MongoDB.
          </p>
        </div>
      </div>

      <div className="dashboard-live-grid">

        <article className="dashboard-live-card">
          <span>TOTAL CHILDREN</span>

          <strong>
            {stats.children}
          </strong>

          <p>
            Child journey records
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>NEW ADMISSIONS</span>

          <strong>
            {stats.admissions}
          </strong>

          <p>
            Admission records
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>NEEDS SUPPORT</span>

          <strong>
            {stats.needsSupport}
          </strong>

          <p>
            Children needing attention
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>FOLLOW-UPS DUE</span>

          <strong>
            {stats.followUps}
          </strong>

          <p>
            Open follow-up records
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>ACHIEVEMENTS</span>

          <strong>
            {stats.achievements}
          </strong>

          <p>
            Achievements recorded
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>SKILLS & TALENTS</span>

          <strong>
            {stats.skills}
          </strong>

          <p>
            Development records
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>WELLBEING</span>

          <strong>
            {stats.wellbeing}
          </strong>

          <p>
            Wellbeing records
          </p>
        </article>

        <article className="dashboard-live-card">
          <span>OBSERVATIONS</span>

          <strong>
            {stats.observations}
          </strong>

          <p>
            Mentor observations
          </p>
        </article>

      </div>
    </section>
  );
}

export default DashboardStats;