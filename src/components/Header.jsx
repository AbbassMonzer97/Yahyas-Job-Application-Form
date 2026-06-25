export default function Header() {
  return (
    <header className="relative">
      <div className="h-10 bg-brand-dark" />

      <div className="relative bg-brand-cream px-6 pt-4 pb-12 sm:px-10 sm:pt-5 sm:pb-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Yahya's — Since 1990"
              className="w-56 object-contain mix-blend-multiply sm:w-72"
            />
          </div>

          <div className="hidden h-28 w-[3px] rounded-full bg-brand-olive/70 sm:block" />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-brand-dark sm:text-3xl">
              Job Application Form
            </h1>
            <p className="mt-1 text-sm font-medium text-brand-green">
              Thank you for your interest in joining Yahya's.
            </p>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-brand-olive">
              Please complete this application form and attach your updated CV.
              Our HR team will review your application and contact shortlisted
              candidates.
            </p>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          style={{ height: "78px" }}
        >
          <path d="M0,40 C250,90 750,0 1000,35 L1000,80 L0,80 Z" fill="#808d2d" />
          <path d="M0,55 C300,15 700,90 1000,45 L1000,80 L0,80 Z" fill="#3e551b" />
        </svg>
      </div>
    </header>
  )
}
