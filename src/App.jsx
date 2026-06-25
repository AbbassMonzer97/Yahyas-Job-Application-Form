import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import {
  SectionCard,
  TextInput,
  TextArea,
  Select,
  RadioGroup,
  Label,
} from "./components/ui"
import {
  AREAS,
  POSITIONS,
  BRANCHES,
  EXPERIENCE_YEARS,
  EDUCATION_LEVELS,
  START_OPTIONS,
} from "./data"

const YES_NO = ["Yes", "No"]

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
}

function PositionExamples() {
  return (
    <div className="mt-4 rounded-lg bg-brand-cream p-4 ring-1 ring-brand-olive/20">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-brand-olive">
        Examples of Positions
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {POSITIONS.map((p) => (
          <div
            key={p}
            className="flex items-center gap-2 text-[13px] text-brand-green"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 fill-none stroke-brand-olive"
              strokeWidth="1.8"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}

function CvUpload({ file, onFile, error }) {
  const [dragging, setDragging] = useState(false)

  const handleFiles = (files) => {
    const f = files?.[0]
    if (f) onFile(f)
  }

  return (
    <div>
      <Label required>Upload Your CV</Label>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-7 text-center transition ${
          dragging
            ? "border-brand-olive bg-brand-olive/10"
            : "border-brand-olive/40 bg-brand-cream/50 hover:bg-brand-cream"
        }`}
      >
        <img src="/assets/ic-upload.png" alt="" className="mb-2 h-9 w-9 object-contain" />
        {file ? (
          <span className="text-sm font-medium text-brand-green">
            {file.name}
          </span>
        ) : (
          <span className="text-sm text-brand-olive">
            Click to upload or drag and drop
          </span>
        )}
        <span className="mt-1 text-xs text-brand-olive/70">
          PDF only (Max 10 MB)
        </span>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function SuccessCard({ onReset }) {
  return (
    <div className="mx-auto my-16 max-w-md rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
      <img src="/assets/ic-thankyou.png" alt="" className="mx-auto h-16 w-16 object-contain" />
      <h2 className="mt-4 text-xl font-bold uppercase text-brand-dark">
        Thank you for applying to Yahya's!
      </h2>
      <p className="mt-2 text-sm text-brand-olive">
        Your application has been received successfully and will be reviewed by
        our HR team. Only shortlisted candidates will be contacted.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-md bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green"
      >
        Submit another application
      </button>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState(INITIAL)
  const [cv, setCv] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (value) => {
    const v = value?.target ? value.target.value : value
    setForm((f) => ({ ...f, [key]: v }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleCv = (f) => {
    if (f.type !== "application/pdf") {
      setErrors((e) => ({ ...e, cv: "Only PDF files are allowed." }))
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrors((e) => ({ ...e, cv: "File must be 10 MB or smaller." }))
      return
    }
    setCv(f)
    setErrors((e) => ({ ...e, cv: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = "Full name is required."
    if (!form.mobile.trim()) e.mobile = "Mobile number is required."
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address."
    if (!form.area) e.area = "Please select your area."
    if (!form.position) e.position = "Please select a position."
    if (!form.yearsExp) e.yearsExp = "Please select your experience."
    if (!cv) e.cv = "Please upload your CV (PDF)."
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) {
      const first = document.querySelector("[data-error='true']")
      first?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const reset = () => {
    setForm(INITIAL)
    setCv(null)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[#e9ebe0] py-6 sm:py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-brand-cream shadow-xl">
        <Header />

        {submitted ? (
          <SuccessCard onReset={reset} />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-5 py-8 sm:px-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SectionCard icon="/assets/ic-personal.png" title="1. Personal Information">
                <div className="space-y-4">
                  <TextInput
                    label="Full Name"
                    required
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={set("fullName")}
                    error={errors.fullName}
                    data-error={!!errors.fullName}
                  />
                  <TextInput
                    label="Mobile Number"
                    required
                    type="tel"
                    placeholder="e.g. 70 123 456"
                    value={form.mobile}
                    onChange={set("mobile")}
                    error={errors.mobile}
                    data-error={!!errors.mobile}
                  />
                  <TextInput
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    data-error={!!errors.email}
                  />
                  <TextInput
                    label="Date of Birth"
                    type="date"
                    value={form.dob}
                    onChange={set("dob")}
                  />
                  <RadioGroup
                    label="Gender"
                    name="gender"
                    options={["Male", "Female"]}
                    value={form.gender}
                    onChange={set("gender")}
                  />
                  <Select
                    label="Area of Residence"
                    required
                    placeholder="Select your area"
                    options={AREAS}
                    value={form.area}
                    onChange={set("area")}
                    error={errors.area}
                    data-error={!!errors.area}
                  />
                </div>
              </SectionCard>

              <SectionCard icon="/assets/ic-position.png" title="2. Position Applying For">
                <div className="space-y-4">
                  <Select
                    label="Position Applied For"
                    required
                    placeholder="Select position"
                    options={POSITIONS}
                    value={form.position}
                    onChange={set("position")}
                    error={errors.position}
                    data-error={!!errors.position}
                  />
                  <Select
                    label="Preferred Branch"
                    placeholder="Select branch"
                    options={BRANCHES}
                    value={form.branch}
                    onChange={set("branch")}
                  />
                  <PositionExamples />
                </div>
              </SectionCard>

              <SectionCard icon="/assets/ic-experience.png" title="3. Experience">
                <div className="space-y-4">
                  <RadioGroup
                    label="Are you currently employed?"
                    name="employed"
                    options={YES_NO}
                    value={form.employed}
                    onChange={set("employed")}
                  />
                  <Select
                    label="Years of Experience"
                    required
                    placeholder="Select experience"
                    options={EXPERIENCE_YEARS}
                    value={form.yearsExp}
                    onChange={set("yearsExp")}
                    error={errors.yearsExp}
                    data-error={!!errors.yearsExp}
                  />
                  <TextInput
                    label="Current / Last Position"
                    value={form.lastPosition}
                    onChange={set("lastPosition")}
                  />
                  <TextInput
                    label="Current / Last Company"
                    value={form.lastCompany}
                    onChange={set("lastCompany")}
                  />
                  <TextInput
                    label="Expected Salary (Optional)"
                    value={form.expectedSalary}
                    onChange={set("expectedSalary")}
                  />
                </div>
              </SectionCard>

              <SectionCard icon="/assets/ic-education.png" title="4. Education">
                <div className="space-y-4">
                  <Select
                    label="Highest Education Level"
                    placeholder="Select level"
                    options={EDUCATION_LEVELS}
                    value={form.education}
                    onChange={set("education")}
                  />
                  <TextInput
                    label="Field of Study"
                    value={form.fieldOfStudy}
                    onChange={set("fieldOfStudy")}
                  />
                </div>
              </SectionCard>

              <SectionCard icon="/assets/ic-availability.png" title="5. Availability">
                <div className="space-y-4">
                  <Select
                    label="When can you start?"
                    placeholder="Select option"
                    options={START_OPTIONS}
                    value={form.startWhen}
                    onChange={set("startWhen")}
                  />
                  <RadioGroup
                    label="Are you available for shift work?"
                    name="shiftWork"
                    options={YES_NO}
                    value={form.shiftWork}
                    onChange={set("shiftWork")}
                  />
                  <RadioGroup
                    label="Do you have reliable transportation?"
                    name="transportation"
                    options={YES_NO}
                    value={form.transportation}
                    onChange={set("transportation")}
                  />
                </div>
              </SectionCard>

              <SectionCard icon="/assets/ic-upload.png" title="6. CV Upload">
                <CvUpload file={cv} onFile={handleCv} error={errors.cv} />
              </SectionCard>

              <SectionCard
                icon="/assets/ic-additional.png"
                title="7. Additional Information"
                className="lg:col-span-2"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextArea
                    label="Why would you like to join Yahya's?"
                    placeholder="Your answer"
                    value={form.whyJoin}
                    onChange={set("whyJoin")}
                  />
                  <TextArea
                    label="Do you have previous experience in fruits, vegetables, supermarkets, retail, or customer service?"
                    placeholder="Your answer"
                    value={form.prevExperience}
                    onChange={set("prevExperience")}
                  />
                </div>
              </SectionCard>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-brand-dark px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-green hover:shadow-xl active:scale-95"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}

        <Footer />
      </div>
    </div>
  )
}
