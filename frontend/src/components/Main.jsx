
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LinearRegression from "../LinearRegression/LinearRegression";
import Installation from "../installations/Installation";
import {
  BookOpen,
  Code2,
  Cpu,
  ChevronDown,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
function Main() {
  const [activePage, setActivePage] = useState(() => {
    return (
      sessionStorage.getItem("tratrophic-active-page") ||
      "introduction"
    );
  });

  const handlePageChange = (page) => {
    setActivePage(page);
    sessionStorage.setItem("tratrophic-active-page", page);
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#090b09] text-neutral-100">

      {/* ==============================
          TOP NAVBAR
      ============================== */}

      <header className="relative z-50 flex h-[68px] w-full shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#090b09]/95 px-5 backdrop-blur-xl md:px-8">

        {/* LEFT: BRAND */}
        <div className="flex min-w-0 items-center gap-4">

          {/* LOGO */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#91d49b]/30 bg-[#91d49b]/10 shadow-[0_0_20px_rgba(145,212,155,0.08)]">
              <span className="text-xl font-black text-[#91d49b]">
                <img src="/T.png" alt="Tratrophic Logo" />
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[16px] font-bold tracking-tight text-white">
                Tratrophic
              </span>

              <span className="text-[10px] tracking-[0.16em] text-neutral-500">
                MACHINE LEARNING
              </span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden h-8 w-px bg-neutral-800 sm:block" />

          {/* DOCUMENTATION LABEL */}
          <div className="hidden items-center gap-2 sm:flex">
            <BookOpen
              size={15}
              className="text-[#91d49b]"
            />

            <span className="text-sm font-medium text-neutral-300">
              Documentation
            </span>
          </div>

        </div>

        {/* RIGHT: NAVBAR ITEMS */}
        <div className="flex shrink-0 items-center gap-3 md:gap-5">

          {/* FRAMEWORK TYPE */}
          <div className="hidden items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 lg:flex">
            

            <span>
              <a
                href="https://github.com/mahanandhan/tratrophic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  size={20}
                  className="text-neutral-400 hover:text-white cursor-pointer"
                />
              </a>
            </span>
          </div>

          {/* VERSION */}
          <div className="flex items-center gap-2 rounded-md border border-[#91d49b]/20 bg-[#91d49b]/[0.07] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#91d49b] shadow-[0_0_8px_#91d49b]" />

            <span className="text-[11px] font-semibold tracking-wide text-[#91d49b]">
              v0.1.0
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="hidden h-7 w-px bg-neutral-800 md:block" />

          {/* API LABEL */}
          <div className="hidden items-center gap-2 text-neutral-400 transition-colors hover:text-white md:flex">
            <Code2 size={15} />

            <span className="text-xs font-medium">
              Python API
            </span>
          </div>

        </div>
      </header>

      {/* ==============================
          MAIN LAYOUT
      ============================== */}

      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* LEFT SIDEBAR */}
        <Sidebar
          activePage={activePage}
          setActivePage={handlePageChange}
        />

        {/* CENTER DOCUMENTATION */}
        <main
          key={activePage}
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        >
          <div className="w-full px-6 py-8 md:px-8 xl:px-10 2xl:px-12">

            {activePage === "linear-regression" && (
              <LinearRegression />
            )}

            {activePage === "introduction" && (
              <div className="mx-auto w-full max-w-5xl py-6">

                <div className="mb-5 flex items-center gap-2 text-xs text-neutral-500">
                  <BookOpen size={14} />
                  <span>Getting Started</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Introduction
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-400">
                  Welcome to Tratrophic documentation.
                  Learn how to build and train machine learning
                  models using Tratrophic.
                </p>

              </div>
            )}
            {activePage === "installation" && (
              <Installation />
            )}

            {activePage !== "linear-regression" &&
              activePage !== "introduction" &&
              activePage !== "installation" && (
                <div className="py-6">

                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    {activePage
                      .split("-")
                      .map((word) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h1>

                  <p className="mt-5 text-lg text-neutral-400">
                    Documentation for this section is coming soon.
                  </p>

                </div>
              )}

          </div>
        </main>

      </div>
    </div>
  );
}

export default Main;
