
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

/* --------------------------------
   SCROLL REVEAL ANIMATION
--------------------------------- */

function Reveal({ children, className = "", delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* --------------------------------
   FRAMEWORK LEARNING CARDS
--------------------------------- */

const frameworkSteps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learn the Fundamentals",
    description:
      "Understand the mathematics, equations, and concepts behind machine learning algorithms before writing code.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Implement Algorithms",
    description:
      "Write algorithms from scratch using Python and NumPy. Understand every calculation, parameter, and operation.",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "Build Your Framework",
    description:
      "Bring your implementations together into a reusable machine learning framework that you understand and control.",
  },
];

/* --------------------------------
   START PAGE
--------------------------------- */

function StartPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b08] text-white selection:bg-green-400 selection:text-black">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(145,212,155,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(145,212,155,0.4) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute -top-60 left-1/2 h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-green-500/[0.055] blur-[150px]" />

        <div className="absolute -left-64 top-[50%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.035] blur-[130px]" />

        <div className="absolute -right-64 top-[75%] h-[400px] w-[400px] rounded-full bg-green-500/[0.035] blur-[130px]" />

      </div>

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080b08]/85 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 md:px-12">

          {/* BRAND */}

          <Link to="/" className="group flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-green-400/20 bg-green-400/[0.06] transition group-hover:border-green-400/50">

              <img
                src="/T.png"
                alt="Tratrophic"
                className="h-full w-full object-contain"
              />

            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Tratrophic
              </h2>

              <p className="text-[9px] tracking-[0.22em] text-neutral-500">
                INTELLIGENCE FRAMEWORK
              </p>
            </div>

          </Link>

          {/* NAVIGATION */}

          <nav className="flex items-center gap-5 md:gap-8">

            <Link
              to="/documentation"
              className="hidden text-sm text-neutral-400 transition hover:text-green-400 sm:block"
            >
              Documentation
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden text-neutral-400 transition hover:text-green-400 sm:block"
            >
              <FaGithub size={20} />
            </a>

            <Link
              to="/documentation"
              className="group flex items-center gap-2 rounded-lg border border-green-400/25 bg-green-400/[0.07] px-4 py-2.5 text-sm font-semibold text-green-300 transition hover:border-green-400/50 hover:bg-green-400/[0.12]"
            >
              Explore

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </nav>

        </div>
      </header>

      <main className="relative z-10">

        {/* HERO SECTION */}

        <section className="mx-auto flex min-h-[720px] max-w-[1400px] flex-col items-center px-6 pb-24 pt-20 text-center md:pt-24">

          {/* LABEL */}

          <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.05] px-4 py-2">

            <Sparkles size={13} className="text-green-400" />

            <span className="text-[10px] font-semibold tracking-[0.2em] text-green-300 sm:text-xs">
              LEARN · BUILD · EXPERIMENT
            </span>

          </div>

          {/* LOGO */}

          <div className="hero-logo relative mx-auto mt-8 w-full max-w-[570px]">

            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/[0.07] blur-[100px]" />

            <img
              src="/T.png"
              alt="Tratrophic Logo"
              draggable="false"
              className="relative mx-auto h-auto w-full select-none object-contain"
            />

          </div>

          {/* HEADING */}

          <h1 className="hero-enter mt-5 max-w-5xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[82px]">

            Build Your Own

            <span className="mt-2 block bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
              Intelligence.
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="hero-enter mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
            Go beyond using artificial intelligence. Understand how
            it works, explore the mathematics behind it, implement
            algorithms from scratch, and build your own intelligent
            models with Tratrophic.
          </p>

          {/* CTA BUTTONS */}

          <div className="hero-enter mt-10 flex flex-col items-center gap-4 sm:flex-row">

            <Link
              to="/documentation"
              className="group flex min-w-[190px] items-center justify-center gap-3 rounded-lg bg-green-400 px-7 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-green-300"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/documentation"
              className="flex min-w-[190px] items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.025] px-7 py-4 text-sm font-semibold text-neutral-300 transition duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:text-green-300"
            >
              <BookOpen size={18} />

              Documentation
            </Link>

          </div>

          {/* BOTTOM LABEL */}

          <div className="mt-16 flex items-center gap-3 text-[10px] tracking-[0.18em] text-neutral-600 sm:text-xs">

            <span className="h-px w-8 bg-neutral-800" />

            BUILT FOR LEARNING AND CREATIVITY

            <span className="h-px w-8 bg-neutral-800" />

          </div>

        </section>

        {/* DIVIDER */}

        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />

        {/* FRAMEWORK IMPLEMENTATION SECTION */}

        <section className="mx-auto max-w-[1200px] px-6 py-28 md:px-12">

          {/* SECTION HEADING */}

          <Reveal className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-semibold tracking-[0.25em] text-green-400">
              BUILD FROM THE GROUND UP
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">

              Learn how to implement

              <span className="block text-green-400">
                a machine learning framework.
              </span>

            </h2>

            <p className="mt-6 text-base leading-8 text-neutral-500">
              Don't just import libraries and call functions.
              Learn how machine learning algorithms work internally,
              implement them using Python and NumPy, and gradually
              build your own machine learning framework with Tratrophic.
            </p>

          </Reveal>

          {/* FRAMEWORK CARDS */}

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">

            {frameworkSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.number} delay={index * 140}>

                  <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c100c] p-8 transition duration-300 hover:-translate-y-2 hover:border-green-400/30 hover:bg-[#101610]">

                    {/* CARD TOP */}

                    <div className="flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-green-400/20 bg-green-400/[0.06]">
                        <Icon
                          size={23}
                          className="text-green-400"
                        />
                      </div>

                      <span className="text-sm font-semibold tracking-widest text-neutral-700">
                        {step.number}
                      </span>

                    </div>

                    {/* CARD CONTENT */}

                    <h3 className="mt-8 text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-neutral-500">
                      {step.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-green-400 transition group-hover:text-green-300">

                      Learn more

                      <MoveUpRight size={14} />

                    </div>

                  </div>

                </Reveal>
              );
            })}

          </div>

          {/* SECTION BUTTON */}

          <Reveal className="mt-12 text-center">

            <Link
              to="/documentation"
              className="group inline-flex items-center gap-3 rounded-lg bg-green-400 px-7 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-green-300"
            >
              Learn with Tratrophic

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </Reveal>

        </section>

        {/* FINAL CTA SECTION */}

        <section className="relative overflow-hidden border-t border-white/[0.06] px-6 py-28 text-center">

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.05] blur-[120px]" />

          <Reveal className="relative mx-auto max-w-3xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/[0.06]">

              <Sparkles size={25} className="text-green-400" />

            </div>

            <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-5xl">

              Start building

              <span className="mt-2 block text-green-400">
                your intelligence.
              </span>

            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-neutral-500">
              Begin with the fundamentals. Understand the algorithms.
              Build something of your own.
            </p>

            <Link
              to="/documentation"
              className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-green-400 px-8 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-green-300"
            >
              Start Learning

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </Reveal>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/[0.07] bg-[#050705]">

        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row md:px-12">

          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-green-400/20 bg-green-400/[0.06]">

              <img
                src="/T.png"
                alt=""
                className="h-full w-full object-contain"
              />

            </div>

            <span className="text-sm font-bold text-neutral-300">
              Tratrophic
            </span>

          </Link>

          <p className="text-center text-xs text-neutral-600">
            Artificial Intelligence & Machine Learning Framework
          </p>

          <span className="text-xs tracking-wider text-neutral-700">
            VERSION 0.1.0
          </span>

        </div>

      </footer>

      {/* ANIMATIONS */}

      <style>{`

        /* SCROLL REVEAL */

        .reveal {
          opacity: 0;
          transform: translateY(32px);

          transition:
            opacity 750ms ease,
            transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* HERO ANIMATION */

        .hero-enter {
          animation: heroEnter 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .hero-logo {
          animation: logoEnter 1200ms ease-out both;
        }

        @keyframes heroEnter {

          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes logoEnter {

          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }

        /* REDUCED MOTION */

        @media (prefers-reduced-motion: reduce) {

          .reveal,
          .reveal.is-visible,
          .hero-enter,
          .hero-logo {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

        }

      `}</style>

    </div>
  );
}

export default StartPage;
