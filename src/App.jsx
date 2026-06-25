import { useState } from "react";
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
import FormStepper from "./components/form/FormStepper";
import ViewToggle from "./components/form/ViewToggle";

const INITIAL = {
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
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

function SuccessCard({ onReset }) {
  return (
    <div className="mx-auto my-16 max-w-md rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
      <img
        src="/assets/ic-thankyou.png"
        alt=""
        className="mx-auto h-16 w-16 object-contain"
      />
      <h2 className="mt-4 text-xl font-bold uppercase text-brand-dark">
        Thank you for applying to Yahya's!
      </h2>
      <p className="mt-2 text-sm text-brand-olive">
        Your application has been received successfully and will be reviewed by
        our HR team. Only shortlisted candidates will be contacted.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 cursor-pointer rounded-md bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green"
      >
        Submit another application
      </button>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState(INITIAL);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState("full");

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
    if (!form.position) e.position = "Please select a position.";
    if (!form.yearsExp) e.yearsExp = "Please select your experience.";
    if (!cv) e.cv = "Please upload your CV (PDF).";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setForm(INITIAL);
    setCv(null);
    setErrors({});
    setSubmitted(false);
  };

  const sectionProps = { form, set, errors };

  return (
    <div className="min-h-screen bg-[#e9ebe0] py-6 sm:py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-brand-cream shadow-xl">
        <Header />

        {submitted ? (
          <SuccessCard onReset={reset} />
        ) : (
          <>
            <ViewToggle mode={viewMode} onChange={setViewMode} />

            {viewMode === "stepper" ? (
              <FormStepper
                form={form}
                set={set}
                cv={cv}
                handleCv={handleCv}
                errors={errors}
                setErrors={setErrors}
                onSubmit={handleSubmit}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="px-5 py-8 sm:px-10"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <SectionCard
                    icon={<UserIcon />}
                    title="1. Personal Information"
                  >
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
                    <CvUpload
                      file={cv}
                      onFile={handleCv}
                      error={errors.cv}
                    />
                  </SectionCard>

                  <SectionCard
                    icon={<ClipboardIcon />}
                    title="7. Additional Information"
                    className="lg:col-span-2"
                  >
                    <AdditionalSection {...sectionProps} />
                  </SectionCard>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-full bg-brand-dark px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-green hover:shadow-xl active:scale-95"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
