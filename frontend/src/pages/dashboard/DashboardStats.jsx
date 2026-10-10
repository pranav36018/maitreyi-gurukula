import { useEffect, useState } from "react";

import {
  getChildren,
  getAdmissions,
  getFollowUps,
  getAchievementsByChild,
  getSkillsByChild,
  getWellbeingByChild,
  getObservationsByChild,
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
    const loadDashboardStats = async () => {
      try {
        const [
          childrenResponse,
          admissionsResponse,
          followUpsResponse,
        ] = await Promise.all([
          getChildren(),
          getAdmissions(),
          getFollowUps(),
        ]);

        const children =
          childrenResponse.data || [];

        const admissions =
          admissionsResponse.data || [];

        const followUps =
          followUpsResponse.data || [];

        let achievements = 0;
        let skills = 0;
        let wellbeing = 0;
        let observations = 0;
        let needsSupport = 0;

        for (const child of children) {
          if (!child._id) continue;

          const [
            achievementResponse,
            skillResponse,
            wellbeingResponse,
            observationResponse,
          ] = await Promise.all([
            getAchievementsByChild(child._id),
            getSkillsByChild(child._id),
            getWellbeingByChild(child._id),
            getObservationsByChild(child._id),
          ]);

          const achievementData =
            achievementResponse.data || [];

          const skillData =
            skillResponse.data || [];

          const wellbeingData =
            wellbeingResponse.data || [];

          const observationData =
            observationResponse.data || [];

          achievements +=
            achievementData.length;

          skills += skillData.length;

          wellbeing +=
            wellbeingData.length;

          observations +=
            observationData.length;

          const childNeedsSupport =
            wellbeingData.some(
              (item) =>
                item.status ===
                  "Needs Attention" ||
                item.status ===
                  "Under Support"
            ) ||
            observationData.some(
              (item) =>
                item.followUpRequired === true
            );

          if (childNeedsSupport) {
            needsSupport += 1;
          }
        }

        const pendingFollowUps =
          followUps.filter(
            (item) =>
              item.status !== "Completed" &&
              item.status !== "Closed"
          ).length;

        setStats({
          children: children.length,
          admissions: admissions.length,
          achievements,
          skills,
          wellbeing,
          observations,
          followUps: pendingFollowUps,
          needsSupport,
        });
      } catch (error) {
        console.error(
          "Unable to load dashboard statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
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