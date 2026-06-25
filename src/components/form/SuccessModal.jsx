import { useEffect } from "react";

export default function SuccessModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="success-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
    >
      <div
        className="success-modal-content relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 pt-10 text-center shadow-2xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-brand-olive transition hover:bg-brand-cream hover:text-brand-dark"
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

        <img
          src="/assets/ic-thankyou.png"
          alt=""
          className="mx-auto h-16 w-16 object-contain"
        />
        <h2
          id="success-modal-title"
          className="mt-4 text-xl font-bold uppercase text-brand-dark"
        >
          Thank you for applying to Yahya's!
        </h2>
        <p className="mt-2 text-sm text-brand-olive">
          Your application has been received successfully and will be reviewed
          by our HR team. Only shortlisted candidates will be contacted.
        </p>
      </div>
    </div>
  );
}
