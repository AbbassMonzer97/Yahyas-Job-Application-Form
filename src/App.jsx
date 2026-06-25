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
import SuccessModal from "./components/form/SuccessModal";

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

export default function App() {
  const [form, setForm] = useState(INITIAL);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewMode, setViewMode] = useState("full");
  const [stepperKey, setStepperKey] = useState(0);

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

  const clearForm = () => {
    setForm(INITIAL);
    setCv(null);
    setErrors({});
    setStepperKey((k) => k + 1);
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
    clearForm();
    setShowSuccess(true);
  };

  const closeSuccess = () => setShowSuccess(false);

  const sectionProps = { form, set, errors };

  return (
    <div className="min-h-screen bg-[#e9ebe0] py-6 sm:py-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-brand-cream shadow-xl">
        <Header />

        <ViewToggle mode={viewMode} onChange={setViewMode} />

        {viewMode === "stepper" ? (
          <FormStepper
            key={stepperKey}
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

        <Footer />

        <SuccessModal open={showSuccess} onClose={closeSuccess} />
      </div>
    </div>
  );
}
