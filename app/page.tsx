"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const reducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function Home() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyOnList, setAlreadyOnList] = useState(false);

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!consent) {
      setConsentError("Please confirm you agree to receive updates.");
      valid = false;
    } else {
      setConsentError("");
    }

    if (!valid) return;

    setSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  const faqs = [
    {
      q: "What is a numbered drop?",
      a: "A numbered drop is a limited, small-batch roast. Each drop is produced in a fixed quantity, numbered, and offered for reservation while supplies last.",
    },
    {
      q: "When are drops roasted and shipped?",
      a: "We roast-to-order. Each bag is roasted when you reserve or order and then prepared for shipment to prioritize freshness.",
    },
    {
      q: "Do I have to subscribe?",
      a: "No. Phase 1 is waitlist-only. Join Waitlist reserves a numbered bag when the drop is open. There is no subscription required to join.",
    },
    {
      q: "How do I change my preferences or email?",
      a: "Use the manage link in your confirmation email, or visit the Manage Reservation page to update preferences and contact details.",
    },
  ];

  return (
    <>
      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <nav
          aria-label="Main navigation"
          className="container mx-auto flex items-center justify-between px-[var(--space-3)] py-[var(--space-2)]"
        >
          <a href="/" aria-label="Tindel home" className="flex items-center gap-[var(--space-1)]">
            <ProjectImage
              id="logo"
              className="w-8 h-8 object-contain"
            />
            <span
              className="text-[var(--color-text)] font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
            >
              Tindel
            </span>
          </a>
          <div className="flex items-center gap-[var(--space-2)]">
            <a
              href="/roasts"
              className="hidden sm:inline-flex text-[var(--color-text-muted)] text-sm font-[family-name:var(--font-body)] hover:text-[var(--color-text)] transition-colors duration-200"
            >
              Roast Profiles
            </a>
            <a
              href="#waitlist"
              className="btn-primary"
            >
              Join Waitlist
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="pt-[72px]">
        {/* ── HERO ── */}
        <section
          aria-labelledby="hero-heading"
          className="bg-[var(--color-bg)] px-[var(--space-3)] pt-[var(--space-8)] pb-[var(--space-6)] md:pt-[var(--space-10)] md:pb-[var(--space-8)]"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              animate="visible"
              className="flex flex-col lg:flex-row lg:items-start lg:gap-[var(--space-8)]"
            >
              {/* Left: headline + CTA */}
              <div className="flex-1 flex flex-col gap-[var(--space-3)]">
                <motion.div variants={fadeUp}>
                  <span
                    className="inline-flex items-center gap-[var(--space-1)] bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-[family-name:var(--font-body)] font-semibold uppercase tracking-widest px-[var(--space-2)] py-[var(--space-1)] rounded-sm"
                    aria-label="Current drop: Drop number 3"
                  >
                    Drop #3
                  </span>
                </motion.div>

                <motion.h1
                  id="hero-heading"
                  variants={fadeUp}
                  className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-[var(--color-text)] leading-tight tracking-tight"
                >
                  Drop #3 — Ethiopia · 150 bags
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-[var(--color-text-muted)] font-[family-name:var(--font-body)] leading-relaxed max-w-lg"
                >
                  Roasted-to-order. Reserve your bag. Brew the ritual.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-[var(--space-2)] items-start">
                  <a href="#waitlist" className="btn-primary">
                    Join Waitlist
                  </a>
                  <a
                    href="/roasts"
                    className="inline-flex items-center justify-center px-[var(--space-3)] py-[var(--space-2)] text-[var(--color-text)] font-[family-name:var(--font-body)] font-semibold text-base border border-[var(--color-border)] rounded-sm hover:border-[var(--color-text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    See Roast Profiles
                  </a>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-body)]"
                >
                  One required field: email. Optional: preferred roast, cadence. Consent required.
                </motion.p>
              </div>

              {/* Right: Ritual Card */}
              <motion.aside
                variants={fadeUp}
                aria-label="Three-step brewing ritual"
                className="mt-[var(--space-5)] lg:mt-0 lg:w-80 xl:w-96 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-[var(--space-4)] flex flex-col gap-[var(--space-3)] shadow-[var(--shadow-card)]"
              >
                <h2 className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
                  The Ritual
                </h2>
                <ol className="flex flex-col gap-[var(--space-3)] list-none">
                  <li className="flex items-start gap-[var(--space-2)]">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-[family-name:var(--font-body)] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      1
                    </span>
                    <div>
                      <p className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]">Pick</p>
                      <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">Reserve a small-batch drop.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-[var(--space-2)]">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-[family-name:var(--font-body)] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      2
                    </span>
                    <div>
                      <p className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]">Schedule</p>
                      <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">We roast-to-order and ship fresh.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-[var(--space-2)]">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-[family-name:var(--font-body)] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      3
                    </span>
                    <div>
                      <p className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]">Brew</p>
                      <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">Simple steps for a clean cup.</p>
                    </div>
                  </li>
                </ol>
                <a
                  href="#waitlist"
                  className="btn-primary text-center"
                >
                  Reserve Drop
                </a>
              </motion.aside>
            </motion.div>
          </div>
        </section>

        {/* ── FOUNDER NOTE ── */}
        <section
          aria-labelledby="founder-heading"
          className="bg-[var(--color-surface)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-8)]"
        >
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-3)]"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-[family-name:var(--font-body)] font-semibold text-[var(--color-accent)] uppercase tracking-widest"
              >
                From the Founder
              </motion.p>
              <motion.h2
                id="founder-heading"
                variants={fadeUp}
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)] leading-snug"
              >
                Roast-to-door freshness, kept simple.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base font-[family-name:var(--font-body)] text-[var(--color-text-muted)] leading-relaxed"
              >
                Our founder started this roastery to keep roast-to-door freshness simple. We work with small lots, roast when you order, and ship each bag so brewing feels like a ritual, not a routine.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── WHY TINDEL ── */}
        <section
          aria-labelledby="why-heading"
          className="bg-[var(--color-bg)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-8)]"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-5)]"
            >
              <motion.h2
                id="why-heading"
                variants={fadeUp}
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]"
              >
                Why Tindel
              </motion.h2>
              <motion.ul
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3)] list-none"
              >
                {[
                  "Numbered drops, limited counts.",
                  "Roasted-to-order for peak freshness.",
                  "Simple ritual guidance so every cup feels deliberate.",
                  "Manage your reservation anytime from the confirmation page.",
                ].map((point) => (
                  <motion.li
                    key={point}
                    variants={fadeUp}
                    className="flex items-start gap-[var(--space-2)] p-[var(--space-3)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm"
                  >
                    <span
                      className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <p className="text-base font-[family-name:var(--font-body)] text-[var(--color-text)] leading-relaxed">
                      {point}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* ── CURRENT DROP ── */}
        <section
          aria-labelledby="drop-heading"
          className="bg-[var(--color-primary)] px-[var(--space-3)] py-[var(--space-8)] md:py-[var(--space-10)]"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-4)]"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-[var(--space-1)] bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-[family-name:var(--font-body)] font-semibold uppercase tracking-widest px-[var(--space-2)] py-[var(--space-1)] rounded-sm"
                >
                  Drop #3
                </span>
              </motion.div>
              <motion.h2
                id="drop-heading"
                variants={fadeUp}
                className="text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-[var(--color-bg)] leading-tight tracking-tight"
              >
                Drop #3 — Ethiopia · 150 bags
              </motion.h2>
              <motion.dl
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-3)]"
              >
                {[
                  { label: "Origin", value: "Ethiopia, single-lot" },
                  { label: "Quantity", value: "150 bags" },
                  { label: "Profile", value: "Filter or espresso. Roasted-to-order." },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex flex-col gap-[var(--space-1)] border-t border-[var(--color-border-dark)] pt-[var(--space-2)]"
                  >
                    <dt className="text-xs font-[family-name:var(--font-body)] font-semibold text-[var(--color-text-muted-dark)] uppercase tracking-widest">
                      {label}
                    </dt>
                    <dd className="text-base font-[family-name:var(--font-body)] text-[var(--color-text-dark)] leading-relaxed">
                      {value}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
              <motion.p
                variants={fadeUp}
                className="text-base font-[family-name:var(--font-body)] text-[var(--color-text-muted-dark)] leading-relaxed max-w-xl"
              >
                Single-lot roast, intended for filter or espresso. Roasted-to-order and available while quantities last.
              </motion.p>
              <motion.div variants={fadeUp}>
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-[var(--space-4)] py-[var(--space-2)] bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-body)] font-semibold text-base rounded-sm hover:bg-[var(--color-accent-dark)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg)]"
                >
                  Reserve this drop — Join Waitlist
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          aria-labelledby="how-heading"
          className="bg-[var(--color-surface)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-8)]"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-5)]"
            >
              <motion.h2
                id="how-heading"
                variants={fadeUp}
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]"
              >
                How It Works
              </motion.h2>
              <motion.ol
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-4)] list-none"
              >
                {[
                  {
                    step: "1",
                    title: "Join",
                    body: "Enter your email, opt into preferences if you like, then submit.",
                  },
                  {
                    step: "2",
                    title: "Reserve",
                    body: "Your reservation holds a numbered bag while quantities remain.",
                  },
                  {
                    step: "3",
                    title: "Receive",
                    body: `We roast when you order and ship fresh so you get the cup intended by the roaster.`,
                  },
                ].map(({ step, title, body }) => (
                  <motion.li
                    key={step}
                    variants={fadeUp}
                    className="flex flex-col gap-[var(--space-2)]"
                  >
                    <span
                      className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-sm font-[family-name:var(--font-body)] font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                    <h3 className="text-lg font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]">
                      {title}
                    </h3>
                    <p className="text-base font-[family-name:var(--font-body)] text-[var(--color-text-muted)] leading-relaxed">
                      {body}
                    </p>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </div>
        </section>

        {/* ── WAITLIST FORM ── */}
        <section
          id="waitlist"
          aria-labelledby="waitlist-heading"
          className="bg-[var(--color-bg)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-8)] md:py-[var(--space-10)]"
        >
          <div className="container mx-auto max-w-lg">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-4)]"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-[var(--space-2)]">
                <h2
                  id="waitlist-heading"
                  className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]"
                >
                  Join the Waitlist
                </h2>
                <p className="text-base font-[family-name:var(--font-body)] text-[var(--color-text-muted)] leading-relaxed">
                  Reserve a numbered bag for Drop #3 — Ethiopia, 150 bags. Roasted when you order.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
                  role="status"
                  aria-live="polite"
                  className="p-[var(--space-4)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm flex flex-col gap-[var(--space-2)]"
                >
                  <p className="text-base font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]">
                    Reserved — roasted when you order.
                  </p>
                  <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">
                    {`We'll email details about Drop #3 and your shipping window.`}
                  </p>
                  <a
                    href="/manage"
                    className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-dark)] transition-colors duration-200"
                  >
                    Manage your reservation
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Join the Tindel waitlist"
                  className="flex flex-col gap-[var(--space-3)]"
                >
                  {alreadyOnList && (
                    <div
                      role="alert"
                      className="p-[var(--space-2)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm text-sm font-[family-name:var(--font-body)] text-[var(--color-text)]"
                    >
                      {`You are already on the waitlist for Drop #3.`}{" "}
                      <a
                        href="/manage"
                        className="font-semibold text-[var(--color-accent)] underline underline-offset-2"
                      >
                        Manage your reservation.
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col gap-[var(--space-1)]">
                    <label
                      htmlFor="email"
                      className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-describedby="email-error"
                      aria-invalid={emailError ? "true" : "false"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                    <p
                      id="email-error"
                      role="alert"
                      aria-live="polite"
                      className="form-helper text-[var(--color-accent)] text-xs font-[family-name:var(--font-body)]"
                    >
                      {emailError}
                    </p>
                  </div>

                  <div className="flex flex-col gap-[var(--space-1)]">
                    <label
                      htmlFor="roast-pref"
                      className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]"
                    >
                      Preferred roast{" "}
                      <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
                    </label>
                    <select
                      id="roast-pref"
                      name="roast-pref"
                      className="form-input"
                    >
                      <option value="">Select a roast</option>
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="dark">Dark</option>
                      <option value="single-origin">Single-origin</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-[var(--space-1)]">
                    <label
                      htmlFor="cadence-pref"
                      className="text-sm font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)]"
                    >
                      Preferred cadence{" "}
                      <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
                    </label>
                    <select
                      id="cadence-pref"
                      name="cadence-pref"
                      className="form-input"
                    >
                      <option value="">Select a cadence</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Every 2 weeks</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-[var(--space-1)]">
                    <div className="flex items-start gap-[var(--space-2)]">
                      <input
                        id="consent"
                        type="checkbox"
                        name="consent"
                        required
                        aria-required="true"
                        aria-describedby="consent-error"
                        aria-invalid={consentError ? "true" : "false"}
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[var(--color-accent)] cursor-pointer"
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm font-[family-name:var(--font-body)] text-[var(--color-text-muted)] leading-relaxed cursor-pointer"
                      >
                        I consent to receiving updates from Tindel. I understand my info will be stored for early access and marketing; I can unsubscribe at any time.
                      </label>
                    </div>
                    <p
                      id="consent-error"
                      role="alert"
                      aria-live="polite"
                      className="form-helper text-[var(--color-accent)] text-xs font-[family-name:var(--font-body)]"
                    >
                      {consentError}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-disabled={submitting}
                    className="btn-primary flex items-center justify-center gap-[var(--space-1)]"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-[var(--color-bg)] border-t-transparent rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        <span>Joining&hellip;</span>
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          aria-labelledby="faq-heading"
          className="bg-[var(--color-surface)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-8)]"
        >
          <div className="container mx-auto max-w-2xl">
            <motion.div
              variants={stagger}
              initial={reducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[var(--space-5)]"
            >
              <motion.h2
                id="faq-heading"
                variants={fadeUp}
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.dl variants={stagger} className="flex flex-col divide-y divide-[var(--color-border)]">
                {faqs.map((faq, i) => (
                  <motion.div key={i} variants={fadeUp} className="py-[var(--space-3)]">
                    <dt>
                      <button
                        type="button"
                        aria-expanded={faqOpen === i}
                        aria-controls={`faq-answer-${i}`}
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="w-full flex items-center justify-between gap-[var(--space-2)] text-left text-base font-[family-name:var(--font-body)] font-semibold text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                      >
                        <span>{faq.q}</span>
                        <span
                          aria-hidden="true"
                          className={`flex-shrink-0 w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`}
                        >
                          +
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-answer-${i}`}
                      hidden={faqOpen !== i}
                      className="mt-[var(--space-2)] text-base font-[family-name:var(--font-body)] text-[var(--color-text-muted)] leading-relaxed"
                    >
                      {faq.a}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        aria-label="Site footer"
        className="bg-[var(--color-bg)] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-5)]"
      >
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[var(--space-3)]">
          <div className="flex flex-col gap-[var(--space-1)]">
            <p className="text-xs font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">
              &copy; Tindel. All rights reserved.
            </p>
            <p className="text-xs font-[family-name:var(--font-body)] text-[var(--color-text-muted)]">
              For questions about drops or orders, visit{" "}
              <a
                href="/manage"
                className="underline underline-offset-2 hover:text-[var(--color-text)] transition-colors duration-200"
              >
                Manage Reservation
              </a>{" "}
              or contact our support team.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-[var(--space-3)] list-none">
              {[
                { label: "Terms", href: "/terms-privacy" },
                { label: "Privacy", href: "/terms-privacy" },
                { label: "Accessibility", href: "/accessibility" },
                { label: "Contact", href: "mailto:hello@tindel.co" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs font-[family-name:var(--font-body)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
