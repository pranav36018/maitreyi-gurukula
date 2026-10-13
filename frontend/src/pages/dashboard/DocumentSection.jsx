import { useEffect, useState } from "react";

import {
  getDocumentsByChild,
  createDocument,
} from "../../services/api";

function DocumentSection({ child, childName }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "Admission",
    documentDate: "",
    description: "",
    documentUrl: "",
  });

  useEffect(() => {
    const loadDocuments = async () => {
      if (!child?._id) return;

      try {
        setLoading(true);
        setError("");

        const response =
          await getDocumentsByChild(child._id);

        setDocuments(response.data || []);
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Unable to load documents."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [child?._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Document title is required.");
      return;
    }

    try {
      setError("");

      await createDocument({
        child: child._id,
        ...form,
        documentDate:
          form.documentDate || undefined,
      });

      const response =
        await getDocumentsByChild(child._id);

      setDocuments(response.data || []);

      setForm({
        title: "",
        category: "Admission",
        documentDate: "",
        description: "",
        documentUrl: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to save document."
      );
    }
  };

  return (
    <section className="profile-content-card">
      <div className="profile-content-heading">
        <div>
          <span>DOCUMENTS</span>
          <h2>Journey archive</h2>
          <p>
            Keep important records and
            certificates connected to{" "}
            {childName}'s Gurukula journey.
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
          <label>Document Title</label>
          <input
            value={form.title}
            onChange={(event) =>
              setForm({
                ...form,
                title: event.target.value,
              })
            }
            placeholder="Example: Admission Record"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={form.category}
            onChange={(event) =>
              setForm({
                ...form,
                category: event.target.value,
              })
            }
          >
            <option value="Admission">
              Admission
            </option>
            <option value="Academic">
              Academic
            </option>
            <option value="Achievement">
              Achievement
            </option>
            <option value="Certificate">
              Certificate
            </option>
            <option value="Health">
              Health
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </div>
        <div>
          <label>Document Date</label>
          <input
            type="date"
            value={form.documentDate}
            onChange={(event) =>
              setForm({
                ...form,
                documentDate:
                  event.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Document Link</label>
          <input
            value={form.documentUrl}
            onChange={(event) =>
              setForm({
                ...form,
                documentUrl:
                  event.target.value,
              })
            }
            placeholder="Optional document link"
          />
        </div>
        <div className="profile-form-full">
          <label>Description</label>
          <textarea
            rows="4"
            value={form.description}
            onChange={(event) =>
              setForm({
                ...form,
                description:
                  event.target.value,
              })
            }
            placeholder="Short description of this document"
          />
        </div>
        <div className="profile-form-full">
          <button
            type="submit"
            className="profile-primary-button full"
          >
            Save Document
          </button>
        </div>
      </form>
      <div className="profile-record-list">
        <h3>Journey Archive</h3>
        {loading && (
          <p>Loading documents...</p>
        )}

        {!loading &&
          documents.length === 0 && (
            <div className="simple-record">
              <strong>
                No documents yet
              </strong>
              <p>
                Add an important record or
                certificate above.
              </p>
            </div>
          )}

        {!loading &&
          documents.map((document) => (
            <article
              className="simple-record"
              key={document._id}
            >
              <strong>
                {document.title}
              </strong>
              <p>
                Category:{" "}
                {document.category}
              </p>
              {document.documentDate && (
                <p>
                  Date:{" "}
                  {new Date(
                    document.documentDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
              )}

              {document.description && (
                <p>
                  {document.description}
                </p>
              )}

              {document.documentUrl && (
                <p>
                  Document:{" "}
                  <a
                    href={document.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open document
                  </a>
                </p>
              )}
            </article>
          ))}
      </div>
    </section>
  );
}

export default DocumentSection;