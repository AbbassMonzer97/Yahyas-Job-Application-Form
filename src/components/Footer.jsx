function SocialIcon({ children, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="mt-8">
      <div className="bg-brand-cream px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <img
              src="/assets/ic-thankyou.png"
              alt=""
              className="mt-0.5 h-9 w-9 object-contain"
            />
            <div>
              <h3 className="text-sm font-bold uppercase text-brand-dark">
                Thank you for applying to Yahya's!
              </h3>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-brand-olive">
                Your application has been received successfully and will be
                reviewed by our HR team. Only shortlisted candidates will be
                contacted.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="font-script text-3xl leading-none text-brand-dark">
                Grow with us.
              </p>
              <p className="mt-1 text-xs text-brand-olive">
                Be part of the Yahya's family.
              </p>
            </div>
            <img
              src="/assets/ic-leaves.png"
              alt=""
              className="h-8 w-8 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="bg-brand-dark px-6 py-4 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-white sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide">
              Follow us
            </span>
            <SocialIcon label="Facebook">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3h1.4V5.8c-.7-.1-1.4-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2H8.4V14h2.2v7h2.9z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M12 8.8A3.2 3.2 0 108.8 12 3.2 3.2 0 0012 8.8zm0 5.3A2.1 2.1 0 119.9 12 2.1 2.1 0 0112 14.1zm4.1-5.4a.75.75 0 11-.75-.75.75.75 0 01.75.75zM18 6.6a4.7 4.7 0 00-1.3-3.3A4.7 4.7 0 0013.4 2c-1.3-.1-5.2-.1-6.5 0A4.7 4.7 0 003.6 3.3 4.7 4.7 0 002.3 6.6c-.1 1.3-.1 5.2 0 6.5a4.7 4.7 0 001.3 3.3 4.7 4.7 0 003.3 1.3c1.3.1 5.2.1 6.5 0a4.7 4.7 0 003.3-1.3 4.7 4.7 0 001.3-3.3c.1-1.3.1-5.2 0-6.5zm-1.6 7.9a2.1 2.1 0 01-1.2 1.2c-.8.3-2.8.3-3.2.3s-2.4 0-3.2-.3a2.1 2.1 0 01-1.2-1.2c-.3-.8-.3-2.8-.3-3.2s0-2.4.3-3.2a2.1 2.1 0 011.2-1.2c.8-.3 2.8-.3 3.2-.3s2.4 0 3.2.3a2.1 2.1 0 011.2 1.2c.3.8.3 2.8.3 3.2s0 2.4-.3 3.2z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M6.9 8.8H4.2V18h2.7V8.8zM5.5 4.5a1.6 1.6 0 100 3.1 1.6 1.6 0 000-3.1zM19.8 18v-5c0-2.5-1.3-3.6-3.1-3.6a2.7 2.7 0 00-2.4 1.3V8.8h-2.7V18h2.7v-4.9c0-1.1.4-1.8 1.4-1.8s1.3.7 1.3 1.9V18h2.8z" />
              </svg>
            </SocialIcon>
          </div>

          <div className="flex items-center gap-2 text-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </span>
            <div className="text-xs">
              <p className="font-semibold uppercase tracking-wide">
                Visit our website
              </p>
              <p className="text-white/80">www.yahyas.com</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <img
              src="/assets/ic-cherry.png"
              alt=""
              className="h-6 w-6 object-contain"
            />
            <p className="text-xs font-medium leading-tight">
              FRESHNESS YOU CAN TRUST,
              <br />
              QUALITY YOU CAN TASTE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
