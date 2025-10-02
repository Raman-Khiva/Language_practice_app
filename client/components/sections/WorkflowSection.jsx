"use client";

import React from "react";

const taskGroups = [
  {
    title: "Planning",
    accent: "Priority",
    items: [
      { label: "Define project scope", status: "High", tone: "bg-rose-100 text-rose-700" },
      { label: "Finalize budget proposal", status: "Medium", tone: "bg-amber-100 text-amber-700" },
      { label: "Kickoff meeting scheduled", status: "Low", tone: "bg-emerald-100 text-emerald-700" }
    ]
  },
  {
    title: "Execution",
    accent: "Assignee",
    items: [
      { label: "Design wireframes", avatar: "Dana" },
      { label: "Develop core backend", avatar: "Daniel" },
      { label: "Collaborate with partners", avatar: "Evelyn" }
    ]
  },
  {
    title: "Review & Launch",
    accent: "Progress",
    items: [
      { label: "Final QA checklist", progress: 60 },
      { label: "Go live 🚀", progress: 90 },
      { label: "Update marketing materials", progress: 20 }
    ]
  }
];

const quickHighlights = [
  {
    title: "Built for fast-moving teams.",
    description: "Collaborate in real time with live edits and comments.",
    pill: "Alex assigning task to Dana",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    title: "Precision-driven portfolio growth",
    description: "View tasks as lists, boards, calendars, or timelines.",
    pill: "Dana · UX Designer",
    badgeColor: "bg-emerald-100 text-emerald-700"
  }
];

const bottomFlow = [
  { title: "Design Key Visuals", note: "AI suggests Amber", tag: "Amber" },
  { title: "Build Landing Page", note: "AI suggests Alex", tag: "Alex" },
  { title: "Plan Social Media Schedule", note: "AI suggests Chloe", tag: "Chloe" },
  { title: "Write Email Sequence", note: "AI suggests Sophia", tag: "Sophia" }
];

const WorkflowSection = () => {
  return (
    <section className="w-full bg-[#f7f8fb] py-24 px-6 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="relative flex h-full flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Stay organized, effortlessly.</h3>
              <p className="mt-2 text-base text-slate-500">
                Easily track tasks, assignees, and statuses in one place.
              </p>
            </div>
            <div className="flex-1 rounded-2xl bg-slate-50 p-6">
              <div className="flex flex-col gap-6">
                {taskGroups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-700">{group.title}</h4>
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{group.accent}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.items.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
                        >
                          <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          {item.status && (
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                              {item.status}
                            </span>
                          )}
                          {item.avatar && (
                            <span className="text-sm font-semibold text-slate-500">{item.avatar}</span>
                          )}
                          {typeof item.progress === "number" && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-400">{item.progress}%</span>
                              <div className="h-2 w-16 rounded-full bg-slate-200">
                                <div
                                  className="h-2 rounded-full bg-emerald-500"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="lg:col-span-2 grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              {quickHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{highlight.title}</h3>
                    <p className="mt-3 text-base text-slate-500">{highlight.description}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${highlight.badgeColor}`}
                    >
                      {highlight.pill}
                    </span>
                    <div className="mt-4 h-24 rounded-2xl border border-dashed border-slate-200 bg-white" />
                  </div>
                </article>
              ))}
            </div>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Precision-driven portfolio growth</h3>
                  <p className="mt-2 text-base text-slate-500">
                    Let AI suggest assignments, priorities, and deadlines.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {bottomFlow.map((step) => (
                      <div key={step.title} className="rounded-2xl border border-white bg-white/80 p-5 shadow-inner">
                        <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{step.note}</p>
                        <span className="mt-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {step.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
