
import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const [search, setSearch] = useState("");

  const [openGroups, setOpenGroups] = useState({
    "Getting Started": true,
    "Machine Learning": true,
    Preprocessing: true,
    "API Reference": true,
  });

  const navigation = [
    {
      title: "Getting Started",
      items: [
        { name: "Introduction", page: "introduction" },
        { name: "Installation", page: "installation" },
        { name: "Quick Start", page: "quick-start" },
      ],
    },
    {
      title: "Machine Learning",
      items: [
        { name: "Linear Regression", page: "linear-regression" },
        { name: "Importing", page: "importing" },
        { name: "Training", page: "training" },
        { name: "Prediction", page: "prediction" },
      ],
    },
    {
      title: "Preprocessing",
      items: [
        { name: "StandardScalar", page: "standard-scalar" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { name: "Parameters", page: "parameters" },
        { name: "Methods", page: "methods" },
      ],
    },
  ];

  const toggleGroup = (title) => {
    setOpenGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  };

  const filteredNavigation = navigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="relative z-20 flex h-full w-60 shrink-0 flex-col overflow-hidden border-r border-neutral-800 bg-black">

      {/* SEARCH */}
      <div className="shrink-0 px-3 pb-4 pt-5">
        <div className="flex h-9 items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 px-3 focus-within:border-[#91d49b]">
          <Search size={14} className="shrink-0 text-neutral-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="w-full bg-transparent text-xs text-neutral-200 outline-none placeholder:text-neutral-600"
          />

          <span className="shrink-0 text-[10px] text-neutral-600">
            /
          </span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="min-h-0 flex-1 overflow-hidden px-3 pb-4">

        {filteredNavigation.map((group) => (
          <div key={group.title} className="mb-5">

            {/* GROUP HEADING */}
            <button
              onClick={() => toggleGroup(group.title)}
              className="mb-2 flex w-full items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-300"
            >
              <span>{group.title}</span>

              {openGroups[group.title] ? (
                <ChevronDown size={13} />
              ) : (
                <ChevronRight size={13} />
              )}
            </button>

            {/* GROUP ITEMS */}
            {openGroups[group.title] && (
              <div className="space-y-0.5">

                {group.items.map((item) => {
                  const isActive = activePage === item.page;

                  return (
                    <button
                      key={item.page}
                      onClick={() => setActivePage(item.page)}
                      className={`flex w-full items-center rounded-md px-3 py-2 text-left text-[13px] transition-colors duration-150 ${
                        isActive
                          ? "border-l-2 border-[#91d49b] bg-[#91d49b]/10 font-medium text-[#91d49b]"
                          : "border-l-2 border-transparent text-neutral-400 hover:bg-neutral-900 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}

              </div>
            )}

          </div>
        ))}

        {filteredNavigation.length === 0 && (
          <p className="px-2 py-4 text-xs text-neutral-500">
            No results found.
          </p>
        )}

      </nav>

      {/* FOOTER */}
      <div className="shrink-0 border-t border-neutral-800 px-4 py-3">
        <p className="text-[11px] font-medium text-neutral-400">
          Tratrophic Documentation
        </p>

        <p className="mt-1 text-[10px] text-neutral-600">
          Version 0.1.0
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
