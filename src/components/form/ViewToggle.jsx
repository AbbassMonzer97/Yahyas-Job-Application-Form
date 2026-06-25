export default function ViewToggle({ mode, onChange }) {
  return (
    <div className="flex justify-center border-b border-brand-olive/15 bg-white/60 px-5 py-4 sm:px-10">
      <div className="inline-flex rounded-full bg-brand-cream p-1 ring-1 ring-brand-olive/20">
        <button
          type="button"
          onClick={() => onChange("full")}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
            mode === "full"
              ? "bg-brand-dark text-white shadow-sm"
              : "text-brand-green hover:text-brand-dark"
          }`}
        >
          Full Form
        </button>
        <button
          type="button"
          onClick={() => onChange("stepper")}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
            mode === "stepper"
              ? "bg-brand-dark text-white shadow-sm"
              : "text-brand-green hover:text-brand-dark"
          }`}
        >
          Step by Step
        </button>
      </div>
    </div>
  );
}
