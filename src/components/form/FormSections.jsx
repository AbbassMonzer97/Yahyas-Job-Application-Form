import {
  TextInput,
  TextArea,
  Select,
  RadioGroup,
  Label,
} from "../ui";
import {
  UploadIcon,
  PositionIcon,
} from "../icons";
import {
  AREAS,
  POSITIONS,
  BRANCHES,
  EXPERIENCE_YEARS,
  EDUCATION_LEVELS,
  START_OPTIONS,
} from "../../data";
import { useState } from "react";

const YES_NO = ["Yes", "No"];

export function PositionExamples() {
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
            <span className="text-brand-olive">
              <PositionIcon name={p} />
            </span>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CvUpload({ file, onFile, error }) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const f = files?.[0];
    if (f) onFile(f);
  };

  return (
    <div>
      <Label required>Upload Your CV</Label>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-7 text-center transition ${
          dragging
            ? "border-brand-olive bg-brand-olive/10"
            : "border-brand-olive/40 bg-brand-cream/50 hover:bg-brand-cream"
        }`}
      >
        <span className="mb-2 text-brand-olive [&>svg]:h-10 [&>svg]:w-10">
          <UploadIcon />
        </span>
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
  );
}

export function PersonalSection({ form, set, errors }) {
  return (
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
      <TextInput
        label="Address"
        required
        placeholder="Street, building, city"
        value={form.address}
        onChange={set("address")}
        error={errors.address}
        data-error={!!errors.address}
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
  );
}

export function PositionSection({ form, set, errors }) {
  return (
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
  );
}

export function ExperienceSection({ form, set, errors }) {
  return (
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
        label="Expected Salary"
        required
        value={form.expectedSalary}
        onChange={set("expectedSalary")}
        error={errors.expectedSalary}
        data-error={!!errors.expectedSalary}
      />
    </div>
  );
}

export function EducationSection({ form, set }) {
  return (
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
  );
}

export function AvailabilitySection({ form, set }) {
  return (
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
  );
}

export function AdditionalSection({ form, set }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextArea
        label="Why would you like to join Yahya's?"
        labelClassName="sm:min-h-[2.6rem]"
        placeholder="Your answer"
        value={form.whyJoin}
        onChange={set("whyJoin")}
      />
      <TextArea
        label="Do you have previous experience in fruits, vegetables, supermarkets, retail, or customer service?"
        labelClassName="sm:min-h-[2.6rem]"
        placeholder="Your answer"
        value={form.prevExperience}
        onChange={set("prevExperience")}
      />
    </div>
  );
}
