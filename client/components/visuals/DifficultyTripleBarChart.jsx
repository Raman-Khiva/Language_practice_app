'use client'

import React from 'react';

const chartData = [
  { id: 'a1-early', level: 'A1', stage: 'Early', total: 42, attempted: 32, passed: 18 },
  { id: 'a1-pro', level: 'A1', stage: 'Pro', total: 50, attempted: 37, passed: 24 },
  { id: 'a2-early', level: 'A2', stage: 'Early', total: 36, attempted: 28, passed: 19 },
  { id: 'a2-pro', level: 'A2', stage: 'Pro', total: 54, attempted: 44, passed: 29 },
  { id: 'b1-early', level: 'B1', stage: 'Early', total: 46, attempted: 35, passed: 22 },
  { id: 'b1-pro', level: 'B1', stage: 'Pro', total: 58, attempted: 47, passed: 31 },
  { id: 'b2-early', level: 'B2', stage: 'Early', total: 48, attempted: 39, passed: 27 },
  { id: 'b2-pro', level: 'B2', stage: 'Pro', total: 61, attempted: 52, passed: 34 },
  { id: 'c1-early', level: 'C1', stage: 'Early', total: 45, attempted: 33, passed: 20 },
  { id: 'c1-pro', level: 'C1', stage: 'Pro', total: 55, attempted: 41, passed: 26 },
  { id: 'c2-early', level: 'C2', stage: 'Early', total: 38, attempted: 28, passed: 17 },
  { id: 'c2-pro', level: 'C2', stage: 'Pro', total: 52, attempted: 40, passed: 24 },
];

const DifficultyTripleBarChart = () => {
  const maxTotal = Math.max(...chartData.map((item) => item.total));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col   pr-2 ">
        {chartData.map((item) => {
          const totalWidth = Math.max((item.total / maxTotal) * 100, 6);
          const attemptedWidth = Math.max((item.attempted / maxTotal) * 100, 6);
          const passedWidth = Math.max((item.passed / maxTotal) * 100, 6);

          return (
            <div key={item.id} className="flex items-center ">
              <div className="w-16 -rotate-25 relative bottom-1 left-2 text-[10px] sm:text-xs font-semibold text-slate-500">
                <p>{item.level}-
                 <span className="uppercase tracking-[0.08em] text-[9px] text-slate-400">{item.stage}</span>
                </p>
              </div>
              <div className="flex-1 flex items-center gap-0.5 h-8">
                <span
                  className="inline-flex h-[18%] min-h-[4px] rounded-full bg-rose-500"
                  style={{ width: `${passedWidth}%` }}
                  title={`Passed lessons: ${item.passed}`}
                />
                <span
                  className="inline-flex h-[18%] min-h-[4px] rounded-full  bg-indigo-500"
                  style={{ width: `${attemptedWidth}%` }}
                  title={`Attempted lessons: ${item.attempted}`}
                />
                <span
                  className="inline-flex h-[18%] min-h-[4px] rounded-full bg-indigo-100 "
                  style={{ width: `${totalWidth}%` }}
                  title={`Total lessons: ${item.total}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
        <LegendSwatch className="bg-indigo-100 " label="Total" />
        <LegendSwatch className="bg-indigo-500  " label="Attempted" />
        <LegendSwatch className="bg-rose-500" label="Passed" />
      </div>
    </div>
  );
};

const LegendSwatch = ({ className, label }) => (
  <div className="flex items-center gap-2">
    <span className={`h-2.5 w-6 rounded-full  ${className}`} />
    <span className="uppercase tracking-wide">{label}</span>
  </div>
);

export default DifficultyTripleBarChart;
