import { useCallback, useEffect, useMemo, useState } from "react";
import { POSITIONS } from "../data";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabaseClient";
import {
  DownloadIcon,
  EyeIcon,
  LogOutIcon,
  RefreshIcon,
  SearchIcon,
  WhatsAppIcon,
} from "../components/icons";

const VIEW_MODES = [
  { id: "split", label: "Split" },
  { id: "expandable", label: "Expandable Rows" },
];

const SECTIONS = [
  {
    title: "1. Personal Information",
    fields: [
      { key: "full_name", label: "Full Name" },
      { key: "mobile_number", label: "Mobile Number", whatsapp: true },
      { key: "email", label: "Email" },
      { key: "date_of_birth", label: "Date of Birth" },
      { key: "gender", label: "Gender" },
      { key: "address", label: "Address" },
      { key: "area_of_residence", label: "Area of Residence" },
    ],
  },
  {
    title: "2. Position Applying For",
    fields: [
      { key: "position", label: "Position" },
      { key: "preferred_branch", label: "Preferred Branch" },
    ],
  },
  {
    title: "3. Experience",
    fields: [
      { key: "currently_employed", label: "Currently Employed" },
      { key: "years_of_experience", label: "Years of Experience" },
      { key: "last_position", label: "Last Position" },
      { key: "last_company", label: "Last Company" },
      { key: "expected_salary", label: "Expected Salary" },
    ],
  },
  {
    title: "4. Education",
    fields: [
      { key: "education_level", label: "Education Level" },
      { key: "field_of_study", label: "Field of Study" },
    ],
  },
  {
    title: "5. Availability",
    fields: [
      { key: "start_date", label: "When Can You Start" },
      { key: "shift_work", label: "Shift Work" },
      { key: "has_transportation", label: "Transportation" },
    ],
  },
  {
    title: "6. Additional Information",
    fields: [
      { key: "why_join", label: "Why Do You Want to Join Yahya's?", fullWidth: true },
      {
        key: "relevant_experience",
        label: "Previous Experience in Similar Role",
        fullWidth: true,
      },
    ],
  },
];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDateShort(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, { dateStyle: "medium" });
}

function displayValue(value) {
  if (value === null || value === undefined || value === "" || value === "-")
    return "—";
  return String(value);
}

function getInitials(name) {
  return (displayValue(name) === "—" ? "?" : name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function toWhatsAppUrl(phone) {
  if (!phone || phone === "-") return null;

  let digits = String(phone).replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("0")) {
    digits = `961${digits.slice(1)}`;
  } else if (!digits.startsWith("961")) {
    digits = `961${digits}`;
  }

  return `https://wa.me/${digits}`;
}

function Field({ label, value, fullWidth = false, whatsapp = false }) {
  const display = displayValue(value);
  const whatsAppUrl = whatsapp ? toWhatsAppUrl(value) : null;

  return (
    <div className={fullWidth ? "sm:col-span-2" : undefined}>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-brand-olive">
        {label}
      </dt>
      <dd className="mt-0.5 flex items-center gap-2 whitespace-pre-wrap break-words text-sm text-brand-green">
        <span>{display}</span>
        {whatsAppUrl && (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${display}`}
            title="Open in WhatsApp"
            className="inline-flex shrink-0 rounded-full p-1 text-[#25D366] transition hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        )}
      </dd>
    </div>
  );
}

function ApplicationDetail({
  application,
  onDownload,
  onView,
  downloading,
  viewing,
}) {
  return (
    <div className="divide-y divide-brand-olive/10">
      {SECTIONS.map((section) => (
        <section key={section.title} className="px-5 py-4 sm:px-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-dark">
            {section.title}
          </h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {section.fields.map((field) => (
              <Field
                key={field.key}
                label={field.label}
                value={application[field.key]}
                fullWidth={field.fullWidth}
                whatsapp={field.whatsapp}
              />
            ))}
          </dl>
        </section>
      ))}

      <section className="bg-brand-cream/50 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <dl className="min-w-0 flex-1">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-brand-olive">
              7. CV Upload
            </dt>
            <dd className="mt-0.5 truncate text-sm text-brand-green">
              {displayValue(application.cv_file_name)}
            </dd>
          </dl>
          {application.cv_file_path && (
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onView(application)}
                disabled={viewing || downloading}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-brand-olive/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-green transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-60"
              >
                <EyeIcon />
                {viewing ? "Loading…" : "View CV"}
              </button>
              <button
                type="button"
                onClick={() => onDownload(application)}
                disabled={downloading || viewing}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-60"
              >
                <DownloadIcon />
                {downloading ? "Preparing…" : "Download CV"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DetailHeader({
  selected,
  selectedIndex,
  total,
  onPrev,
  onNext,
}) {
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-brand-olive/10 bg-brand-cream/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold text-brand-dark">
          {displayValue(selected.full_name)}
        </h2>
        <p className="mt-0.5 text-sm text-brand-olive">
          {displayValue(selected.position)}
          <span className="mx-2 text-brand-olive/40">·</span>
          Applied {formatDate(selected.created_at)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={selectedIndex <= 0}
          className="cursor-pointer rounded-full border border-brand-olive/30 px-3 py-1.5 text-xs font-medium text-brand-green transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-xs tabular-nums text-brand-olive">
          {selectedIndex + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={selectedIndex >= total - 1}
          className="cursor-pointer rounded-full border border-brand-olive/30 px-3 py-1.5 text-xs font-medium text-brand-green transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function CvPreviewModal({ preview, onClose }) {
  useEffect(() => {
    if (!preview) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [preview]);

  if (!preview) return null;

  return (
    <div
      className="success-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-preview-title"
      onClick={onClose}
    >
      <div
        className="success-modal-content relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-brand-olive/20 bg-brand-dark px-5 py-4">
          <div className="min-w-0 pr-4">
            <h2
              id="cv-preview-title"
              className="truncate text-sm font-semibold uppercase tracking-wide text-white"
            >
              {displayValue(preview.fileName)}
            </h2>
            <p className="mt-0.5 truncate text-xs text-white/75">
              {displayValue(preview.applicantName)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <iframe
          src={preview.url}
          title={displayValue(preview.fileName)}
          className="min-h-0 flex-1 w-full bg-brand-cream/30"
        />
      </div>
    </div>
  );
}

function ViewSwitcher({ viewMode, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {VIEW_MODES.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition ${
            viewMode === mode.id
              ? "bg-white text-brand-dark shadow-sm"
              : "border border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

function EmptyListMessage({ loading }) {
  return (
    <p className="px-4 py-8 text-center text-sm text-brand-olive">
      {loading ? "Loading…" : "No applications found."}
    </p>
  );
}

function SplitView({
  filtered,
  loading,
  selectedId,
  setSelectedId,
  selected,
  selectedIndex,
  onPrev,
  onNext,
  onDownload,
  onView,
  downloadingId,
  viewingId,
}) {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col lg:flex-row">
      <aside className="flex min-h-0 w-full shrink-0 flex-col border-b border-brand-olive/20 bg-brand-cream lg:w-80 lg:border-b-0 lg:border-r">
        <div className="shrink-0 border-b border-brand-olive/10 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-olive">
            Applicants
          </p>
        </div>

        <div className="min-h-0 max-h-48 flex-1 overflow-y-auto lg:max-h-none">
          {loading || filtered.length === 0 ? (
            <EmptyListMessage loading={loading} />
          ) : (
            <ul className="divide-y divide-brand-olive/10">
              {filtered.map((row) => {
                const isActive = row.id === selectedId;
                return (
                  <li key={row.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(row.id)}
                      className={`w-full cursor-pointer px-4 py-3 text-left transition ${
                        isActive
                          ? "bg-brand-dark text-white"
                          : "hover:bg-white/60"
                      }`}
                    >
                      <p
                        className={`truncate text-sm font-semibold ${
                          isActive ? "text-white" : "text-brand-green"
                        }`}
                      >
                        {displayValue(row.full_name)}
                      </p>
                      <p
                        className={`mt-0.5 truncate text-xs ${
                          isActive ? "text-white/75" : "text-brand-olive"
                        }`}
                      >
                        {displayValue(row.position)}
                      </p>
                      <p
                        className={`mt-1 text-[11px] ${
                          isActive ? "text-white/60" : "text-brand-olive/70"
                        }`}
                      >
                        {formatDateShort(row.created_at)}
                        {row.mobile_number && row.mobile_number !== "-"
                          ? ` · ${row.mobile_number}`
                          : ""}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white">
        {!selected ? (
          <p className="flex h-full items-center justify-center text-sm text-brand-olive">
            Select an application to view details.
          </p>
        ) : (
          <>
            <DetailHeader
              selected={selected}
              selectedIndex={selectedIndex}
              total={filtered.length}
              onPrev={onPrev}
              onNext={onNext}
            />
            <ApplicationDetail
              application={selected}
              onDownload={onDownload}
              onView={onView}
              downloading={downloadingId === selected.id}
              viewing={viewingId === selected.id}
            />
          </>
        )}
      </main>
    </div>
  );
}

function ExpandableRowsView({
  filtered,
  loading,
  expandedId,
  setExpandedId,
  onDownload,
  onView,
  downloadingId,
  viewingId,
}) {
  return (
    <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 overflow-y-auto px-4 py-4 sm:px-6">
      {loading || filtered.length === 0 ? (
        <div className="rounded-xl bg-white py-10 shadow-sm ring-1 ring-black/5">
          <EmptyListMessage loading={loading} />
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((row) => {
            const isExpanded = row.id === expandedId;
            return (
              <li
                key={row.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : row.id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition hover:bg-brand-cream/40"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isExpanded
                        ? "bg-brand-dark text-white"
                        : "bg-brand-olive/15 text-brand-dark"
                    }`}
                  >
                    {getInitials(row.full_name)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-brand-green">
                        {displayValue(row.full_name)}
                      </span>
                      <span className="shrink-0 text-[11px] text-brand-olive/70">
                        {formatDateShort(row.created_at)}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-brand-olive">
                      {displayValue(row.position)}
                      {row.mobile_number && row.mobile_number !== "-"
                        ? ` · ${row.mobile_number}`
                        : ""}
                    </span>
                  </span>

                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 shrink-0 text-brand-olive transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="border-t border-brand-olive/10 bg-white">
                    <ApplicationDetail
                      application={row}
                      onDownload={onDownload}
                      onView={onView}
                      downloading={downloadingId === row.id}
                      viewing={viewingId === row.id}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [viewMode, setViewMode] = useState("split");
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  const getSignedCvUrl = async (row) => {
    const { data, error: urlError } = await supabase.storage
      .from("cvs")
      .createSignedUrl(row.cv_file_path, 3600);

    if (urlError || !data?.signedUrl) {
      setError(urlError?.message || "Could not access CV file.");
      return null;
    }

    return data.signedUrl;
  };

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message || "Failed to load applications.");
      setApplications([]);
    } else {
      setApplications(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const positionOptions = useMemo(() => {
    const fromApps = applications
      .map((row) => row.position)
      .filter((p) => p && p !== "-");
    return [...new Set([...POSITIONS, ...fromApps])];
  }, [applications]);

  const filtered = useMemo(() => {
    let rows = applications;

    if (positionFilter) {
      rows = rows.filter((row) => row.position === positionFilter);
    }

    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => {
      const haystack = [
        row.full_name,
        row.position,
        row.mobile_number,
        row.email,
        row.area_of_residence,
        row.preferred_branch,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [applications, search, positionFilter]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      setExpandedId(null);
      return;
    }
    if (!filtered.some((row) => row.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
    if (expandedId && !filtered.some((row) => row.id === expandedId)) {
      setExpandedId(null);
    }
  }, [filtered, selectedId, expandedId]);

  const selectedIndex = filtered.findIndex((row) => row.id === selectedId);
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  const goToPrev = () => {
    if (selectedIndex > 0) setSelectedId(filtered[selectedIndex - 1].id);
  };

  const goToNext = () => {
    if (selectedIndex < filtered.length - 1)
      setSelectedId(filtered[selectedIndex + 1].id);
  };

  const handleDownload = async (row) => {
    if (!row.cv_file_path) return;

    setDownloadingId(row.id);

    const { data, error: downloadError } = await supabase.storage
      .from("cvs")
      .download(row.cv_file_path);

    setDownloadingId(null);

    if (downloadError || !data) {
      setError(downloadError?.message || "Could not download CV file.");
      return;
    }

    const fileName =
      row.cv_file_name && row.cv_file_name !== "-"
        ? row.cv_file_name
        : row.cv_file_path.split("/").pop() || "cv.pdf";

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleViewCv = async (row) => {
    if (!row.cv_file_path) return;

    setViewingId(row.id);
    const signedUrl = await getSignedCvUrl(row);
    setViewingId(null);

    if (signedUrl) {
      setCvPreview({
        url: signedUrl,
        fileName: row.cv_file_name,
        applicantName: row.full_name,
      });
    }
  };

  const sharedListProps = {
    filtered,
    loading,
    selectedId,
    setSelectedId,
    selected,
    selectedIndex,
    onPrev: goToPrev,
    onNext: goToNext,
    onDownload: handleDownload,
    onView: handleViewCv,
    downloadingId,
    viewingId,
  };

  return (
    <div className="flex h-screen flex-col bg-[#e9ebe0]">
      <header className="shrink-0 bg-brand-dark px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold uppercase tracking-wide text-white">
                Job Applications
              </h1>
              <p className="mt-0.5 text-sm text-white/75">
                {filtered.length} application{filtered.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-56">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <input
                  id="search"
                  type="search"
                  placeholder="Search applications…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border border-white/20 bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder-white/50 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div className="relative w-full sm:w-52">
                <label htmlFor="position-filter" className="sr-only">
                  Filter by position
                </label>
                <select
                  id="position-filter"
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className={`w-full appearance-none rounded-md border border-white/20 bg-white/10 py-2 pl-3 pr-9 text-sm outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20 ${
                    positionFilter ? "text-white" : "text-white/50"
                  }`}
                >
                  <option value="" className="text-brand-green">
                    All positions
                  </option>
                  {positionOptions.map((position) => (
                    <option
                      key={position}
                      value={position}
                      className="text-brand-green"
                    >
                      {position}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button
                type="button"
                onClick={fetchApplications}
                disabled={loading}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshIcon className={loading ? "animate-spin" : undefined} />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
              >
                <LogOutIcon />
                Sign out
              </button>
            </div>
          </div>

          <ViewSwitcher viewMode={viewMode} onChange={setViewMode} />
        </div>
      </header>

      {error && (
        <p className="shrink-0 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {viewMode === "split" && <SplitView {...sharedListProps} />}

      {viewMode === "expandable" && (
        <ExpandableRowsView
          filtered={filtered}
          loading={loading}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          onDownload={handleDownload}
          onView={handleViewCv}
          downloadingId={downloadingId}
          viewingId={viewingId}
        />
      )}

      <CvPreviewModal preview={cvPreview} onClose={() => setCvPreview(null)} />
    </div>
  );
}
