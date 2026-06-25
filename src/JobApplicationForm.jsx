import { useState } from "react";
import { supabasePublic } from "./lib/supabasePublic";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SectionCard } from "./components/ui";
import {
  UserIcon,
  BriefcaseIcon,
  AwardIcon,
  GraduationIcon,
  CalendarIcon,
  UploadIcon,
  ClipboardIcon,
} from "./components/icons";
import {
  PersonalSection,
  PositionSection,
  ExperienceSection,
  EducationSection,
  AvailabilitySection,
  AdditionalSection,
  CvUpload,
} from "./components/form/FormSections";
import SuccessModal from "./components/form/SuccessModal";

const INITIAL = {
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  address: "",
  area: "",
  position: "",
  branch: "",
  employed: "",
  yearsExp: "",
  lastPosition: "",
  lastCompany: "",
  expectedSalary: "",
  education: "",
  fieldOfStudy: "",
  startWhen: "",
  shiftWork: "",
  transportation: "",
  whyJoin: "",
  prevExperience: "",
};

function orEmpty(value) {
  if (value === null || value === undefined) return "-";
  const trimmed = String(value).trim();
  return trimmed || "-";
}

function toDbRow(form, cv, cvFilePath) {
  return {
    full_name: form.fullName.trim(),
    mobile_number: form.mobile.trim(),
    email: orEmpty(form.email),
    date_of_birth: orEmpty(form.dob),
    gender: orEmpty(form.gender),
    address: form.address.trim(),
    area_of_residence: form.area,
    position: form.position,
    preferred_branch: orEmpty(form.branch),
    currently_employed: orEmpty(form.employed),
    years_of_experience: form.yearsExp,
    last_position: orEmpty(form.lastPosition),
    last_company: orEmpty(form.lastCompany),
    expected_salary: form.expectedSalary.trim(),
    education_level: orEmpty(form.education),
    field_of_study: orEmpty(form.fieldOfStudy),
    start_date: orEmpty(form.startWhen),
    shift_work: orEmpty(form.shiftWork),
    has_transportation: orEmpty(form.transportation),
    why_join: orEmpty(form.whyJoin),
    relevant_experience: orEmpty(form.prevExperience),
    cv_file_path: cvFilePath,
    cv_file_name: cv?.name ? cv.name : "-",
  };
}

export default function JobApplicationForm() {
  const [form, setForm] = useState(INITIAL);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key) => (value) => {
    const v = value?.target ? value.target.value : value;
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleCv = (f) => {
    if (f.type !== "application/pdf") {
      setErrors((e) => ({ ...e, cv: "Only PDF files are allowed." }));
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrors((e) => ({ ...e, cv: "File must be 10 MB or smaller." }));
      return;
    }
    setCv(f);
    setErrors((e) => ({ ...e, cv: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.area) e.area = "Please select your area.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.position) e.position = "Please select a position.";
    if (!form.yearsExp) e.yearsExp = "Please select your experience.";
    if (!form.expectedSalary.trim())
      e.expectedSalary = "Expected salary is required.";
    if (!cv) e.cv = "Please upload your CV (PDF).";
    return e;
  };

  const clearForm = () => {
    setForm(INITIAL);
    setCv(null);
    setErrors({});
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setSubmitError("");
    if (Object.keys(e).length > 0) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    const safeName = cv.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const cvFilePath = `${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabasePublic.storage
      .from("cvs")
      .upload(cvFilePath, cv, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      setSubmitting(false);
      setSubmitError(
        uploadError.message || "Could not upload your CV. Please try again.",
      );
      return;
    }

    const { error: insertError } = await supabasePublic
      .from("job_applications")
      .insert(toDbRow(form, cv, cvFilePath));

    if (insertError) {
      await supabasePublic.storage.from("cvs").remove([cvFilePath]);
      setSubmitting(false);
      setSubmitError(
        insertError.message ||
          "Could not submit your application. Please try again.",
      );
      return;
    }

    clearForm();
    setSubmitting(false);
    setShowSuccess(true);
  };

  const closeSuccess = () => setShowSuccess(false);

  const sectionProps = { form, set, errors };

  return (
    <div className="min-h-screen bg-[#e9ebe0] py-6 sm:py-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-brand-cream shadow-xl">
        <Header />

        <form onSubmit={handleSubmit} noValidate className="px-5 py-8 sm:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard icon={<UserIcon />} title="1. Personal Information">
              <PersonalSection {...sectionProps} />
            </SectionCard>

            <SectionCard
              icon={<BriefcaseIcon />}
              title="2. Position Applying For"
            >
              <PositionSection {...sectionProps} />
            </SectionCard>

            <SectionCard icon={<AwardIcon />} title="3. Experience">
              <ExperienceSection {...sectionProps} />
            </SectionCard>

            <SectionCard icon={<GraduationIcon />} title="4. Education">
              <EducationSection {...sectionProps} />
            </SectionCard>

            <SectionCard icon={<CalendarIcon />} title="5. Availability">
              <AvailabilitySection {...sectionProps} />
            </SectionCard>

            <SectionCard icon={<UploadIcon />} title="6. CV Upload">
              <CvUpload file={cv} onFile={handleCv} error={errors.cv} />
            </SectionCard>

            <SectionCard
              icon={<ClipboardIcon />}
              title="7. Additional Information"
              className="lg:col-span-2"
            >
              <AdditionalSection {...sectionProps} />
            </SectionCard>
          </div>

          {submitError && (
            <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700 ring-1 ring-red-200">
              {submitError}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded-full bg-brand-dark px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-green hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        </form>

        <Footer />

        <SuccessModal open={showSuccess} onClose={closeSuccess} />
      </div>
    </div>
  );
}
