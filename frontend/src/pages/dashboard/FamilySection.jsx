import { useEffect, useState } from "react";

import {
  getFamilyByChild,
  createFamily,
} from "../../services/api";

function FamilySection({ child, childName }) {
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    guardianName: "",
    relationship: "Mother",
    phone: "",
    email: "",
    occupation: "",
    skillsInterests: "",
    familyInvolvement: "",
    notes: "",
  });

  useEffect(() => {
    const loadFamily = async () => {
      if (!child?._id) return;

      try {
        setLoading(true);
        setError("");

        const response = await getFamilyByChild(child._id);

        setFamily(response.data || []);

        if (response.data?.length) {
          const latest = response.data[0];

          setForm({
            guardianName: latest.guardianName || "",
            relationship:
              latest.relationship || "Mother",
            phone: latest.phone || "",
            email: latest.email || "",
            occupation:
              latest.occupation || "",
            skillsInterests:
              latest.skillsInterests || "",
            familyInvolvement:
              latest.familyInvolvement || "",
            notes: latest.notes || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError(
          err.message ||
            "Unable to load family information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFamily();
  }, [child?._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.guardianName.trim()) {
      setError(
        "Parent / guardian name is required."
      );
      return;
    }

    try {
      setError("");

      await createFamily({
        child: child._id,
        ...form,
      });

      const response =
        await getFamilyByChild(child._id);

      setFamily(response.data || []);

      setForm({
        guardianName: "",
        relationship: "Mother",
        phone: "",
        email: "",
        occupation: "",
        skillsInterests: "",
        familyInvolvement: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to save family information."
      );
    }
  };

  return (
    <section className="profile-content-card">
      <div className="profile-content-heading">
        <div>
          <span>FAMILY INFORMATION</span>
          <h2>Family profile</h2>
          <p>
            Keep the family context connected
            to {childName}'s Gurukula journey.
          </p>
        </div>
      </div>
      {error && (
        <p className="profile-error-message">
          {error}
        </p>
      )}
      <form
        className="profile-form-grid"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Parent / Guardian Name
          </label>
          <input
            value={form.guardianName}
            onChange={(event) =>
              setForm({
                ...form,
                guardianName:
                  event.target.value,
              })
            }
            placeholder="Enter parent or guardian name"
          />
        </div>
        <div>
          <label>Relationship</label>
          <select
            value={form.relationship}
            onChange={(event) =>
              setForm({
                ...form,
                relationship:
                  event.target.value,
              })
            }
          >
            <option value="Mother">
              Mother
            </option>
            <option value="Father">
              Father
            </option>
            <option value="Guardian">
              Guardian
            </option>
            <option value="Grandparent">
              Grandparent
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </div>
        <div>
          <label>Phone</label>
          <input
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value,
              })
            }
            placeholder="Phone number"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            placeholder="Email address"
          />
        </div>
        <div>
          <label>Occupation</label>
          <input
            value={form.occupation}
            onChange={(event) =>
              setForm({
                ...form,
                occupation:
                  event.target.value,
              })
            }
            placeholder="Parent / guardian occupation"
          />
        </div>
        <div>
          <label>
            Family Skills / Interests
          </label>
          <input
            value={form.skillsInterests}
            onChange={(event) =>
              setForm({
                ...form,
                skillsInterests:
                  event.target.value,
              })
            }
            placeholder="Skills, interests or expertise"
          />
        </div>
        <div className="profile-form-full">
          <label>
            Family Involvement / Seva
          </label>
          <textarea
            rows="3"
            value={form.familyInvolvement}
            onChange={(event) =>
              setForm({
                ...form,
                familyInvolvement:
                  event.target.value,
              })
            }
            placeholder="Possible Gurukula or Seva involvement"
          />
        </div>
        <div className="profile-form-full">
          <label>
            Additional Notes
          </label>
          <textarea
            rows="3"
            value={form.notes}
            onChange={(event) =>
              setForm({
                ...form,
                notes: event.target.value,
              })
            }
            placeholder="Any useful family information"
          />
        </div>
        <div className="profile-form-full">
          <button
            type="submit"
            className="profile-primary-button full"
          >
            Save Family Information
          </button>
        </div>
      </form>
      <div className="profile-record-list">
        <h3>Saved Family Records</h3>
        {loading && (
          <p>
            Loading family information...
          </p>
        )}

        {!loading &&
          family.length === 0 && (
            <div className="simple-record">
              <strong>
                No family records yet
              </strong>
              <p>
                Add a parent or guardian above
                to begin the family record.
              </p>
            </div>
          )}

        {!loading &&
          family.map((record) => (
            <article
              className="simple-record"
              key={record._id}
            >
              <strong>
                {record.guardianName} •{" "}
                {record.relationship}
              </strong>
              <p>
                Phone:{" "}
                {record.phone ||
                  "Not provided"}
              </p>
              <p>
                Email:{" "}
                {record.email ||
                  "Not provided"}
              </p>
              <p>
                Occupation:{" "}
                {record.occupation ||
                  "Not provided"}
              </p>
              <p>
                Skills / Interests:{" "}
                {record.skillsInterests ||
                  "Not provided"}
              </p>
              <p>
                Family Involvement:{" "}
                {record.familyInvolvement ||
                  "Not provided"}
              </p>
              {record.notes && (
                <p>
                  Notes: {record.notes}
                </p>
              )}
            </article>
          ))}
      </div>
    </section>
  );
}

export default FamilySection;