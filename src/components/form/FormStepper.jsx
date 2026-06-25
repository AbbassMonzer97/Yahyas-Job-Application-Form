import { useState } from "react";
import { FORM_STEPS, renderStepContent } from "./FormSections";

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function validateStep(stepKey, form, cv) {
  const e = {};
  switch (stepKey) {
    case "personal":
      if (!form.fullName.trim()) e.fullName = "Full name is required.";
      if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email address.";
      if (!form.area) e.area = "Please select your area.";
      break;
    case "position":
      if (!form.position) e.position = "Please select a position.";
      break;
    case "experience":
      if (!form.yearsExp) e.yearsExp = "Please select your experience.";
      break;
    case "cv":
      if (!cv) e.cv = "Please upload your CV (PDF).";
      break;
    default:
      break;
  }
  return e;
}

export default function FormStepper({
  form,
  set,
  cv,
  handleCv,
  errors,
  setErrors,
  onSubmit,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const totalSteps = FORM_STEPS.length;
  const isLastStep = currentStep === totalSteps - 1;
  const step = FORM_STEPS[currentStep];
  const StepIcon = step.icon;

  const sectionProps = { form, set, errors, cv, handleCv };
  const slideClass =
    direction === "forward" ? "step-animate-forward" : "step-animate-back";

  const goNext = () => {
    const stepErrors = validateStep(step.key, form, cv);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (Object.keys(stepErrors).length > 0) return;
    setDirection("forward");
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const goBack = () => {
    setDirection("back");
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const stepErrors = validateStep(step.key, form, cv);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (Object.keys(stepErrors).length > 0) return;
    onSubmit(ev);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-10">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {/* Stepper header */}
        <div className="flex items-center overflow-x-auto border-b border-brand-olive/15 bg-brand-cream/60 px-4 py-4 sm:px-6">
          {FORM_STEPS.map((s, idx) => {
            const Icon = s.icon;
            const completed = idx < currentStep;
            const active = idx === currentStep;
            return (
              <div
                className="flex min-w-0 flex-1 items-center last:flex-none"
                key={s.key}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out sm:h-10 sm:w-10 ${
                    completed
                      ? "scale-100 bg-brand-olive/25 text-brand-dark"
                      : active
                        ? "scale-110 bg-brand-dark text-white shadow-md shadow-brand-dark/30"
                        : "scale-100 bg-white text-brand-olive/50 ring-1 ring-brand-olive/25"
                  }`}
                  title={s.title}
                >
                  {completed ? (
                    <span className="animate-[step-header-in_0.3s_ease-out_both]">
                      <CheckIcon />
                    </span>
                  ) : (
                    <span className="[&>svg]:h-[18px] [&>svg]:w-[18px] sm:[&>svg]:h-5 sm:[&>svg]:w-5">
                      <Icon />
                    </span>
                  )}
                </div>
                {idx < FORM_STEPS.length - 1 && (
                  <div className="relative mx-1.5 h-0.5 min-w-[12px] flex-1 overflow-hidden rounded bg-brand-olive/20 sm:mx-2">
                    <div
                      className="absolute inset-y-0 left-0 rounded bg-brand-olive transition-all duration-500 ease-out"
                      style={{ width: idx < currentStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="overflow-hidden bg-gradient-to-b from-brand-cream/40 to-white px-5 py-8 sm:px-8">
          <div
            key={`header-${currentStep}`}
            className={`mb-6 text-center ${slideClass} step-header-animate`}
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark/10 text-brand-dark transition-transform duration-300">
              <span className="[&>svg]:h-7 [&>svg]:w-7">
                <StepIcon />
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-olive">
              Step {currentStep + 1} of {totalSteps}
            </p>
            <h2 className="mt-1 text-xl font-bold text-brand-dark sm:text-2xl">
              {step.title}
            </h2>
          </div>

          <div key={`content-${currentStep}`} className={slideClass}>
            {renderStepContent(step.key, sectionProps)}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between gap-3 border-t border-brand-olive/15 bg-white px-5 py-4 sm:px-8">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="cursor-pointer rounded-full border border-brand-olive/40 px-5 py-2.5 text-sm font-semibold text-brand-green transition-all duration-200 hover:-translate-x-0.5 hover:bg-brand-cream active:scale-95"
            >
              ‹ Back
            </button>
          ) : (
            <span />
          )}

          {isLastStep ? (
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-brand-dark px-8 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-200 hover:bg-brand-green hover:shadow-xl active:scale-95"
            >
              Submit Application
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="cursor-pointer rounded-full bg-brand-dark px-8 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:translate-x-0.5 hover:bg-brand-green hover:shadow-xl active:scale-95"
            >
              Continue ›
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
