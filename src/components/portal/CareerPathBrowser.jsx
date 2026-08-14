"use client";

import { useMemo, useState } from "react";
import { HiArrowRight, HiAdjustmentsHorizontal, HiChevronDown } from "react-icons/hi2";
import { careerCategories, careerPaths } from "@/data/studentPortal";

// Category tabs + the filtered grid of career cards.
export default function CareerPathBrowser() {
  const [activeCategory, setActiveCategory] = useState("all");

  const visiblePaths = useMemo(
    () =>
      activeCategory === "all"
        ? careerPaths
        : careerPaths.filter((path) => path.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      {/* Category tabs — Filters sits in its own box, as in the design. */}
      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-border bg-white p-2 shadow-sm">
          {careerCategories.map(({ id, label, icon: Icon }, index) => {
            const isActive = id === activeCategory;
            return (
              <div key={id} className="flex shrink-0 items-center">
                {index > 0 && <span aria-hidden="true" className="mr-1 h-6 w-px bg-border" />}
                <button
                  type="button"
                  onClick={() => setActiveCategory(id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-body hover:bg-surface hover:text-heading"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                  {label}
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-medium text-body shadow-sm hover:bg-surface"
        >
          <HiAdjustmentsHorizontal aria-hidden="true" className="h-5 w-5" />
          Filters
          <HiChevronDown aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {/* Career cards */}
      {visiblePaths.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface py-14 text-center text-sm text-body">
          No career paths in this category yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {visiblePaths.map(({ id, title, icon: Icon, jobs, salary, level, accent, button, titleColor, art }) => (
            <li
              key={id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              {/* Career photo stand-in */}
              <div className={`relative h-32 bg-gradient-to-br ${art}`}>
                <span
                  className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full ${accent} text-white shadow-md ring-2 ring-white/30`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center px-3 py-4 text-center">
                <h3 className={`text-sm font-bold leading-snug ${titleColor}`}>{title}</h3>
                <dl className="mt-2 flex-1 space-y-1 text-xs text-body">
                  <div>
                    <dt className="sr-only">Open roles</dt>
                    <dd className="font-medium text-heading">{jobs}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Salary range</dt>
                    <dd>{salary}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Level</dt>
                    <dd>{level}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg ${button} px-3 py-2 text-xs font-semibold text-white transition-colors`}
                >
                  View Path
                  <HiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View All Career Paths
          <HiArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
