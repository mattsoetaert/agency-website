"use client";

import { useState, useCallback } from "react";

const PLAN_COST = 497;

type Period = "daily" | "weekly" | "monthly";

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-slate-300 font-medium text-sm">{label}</span>
        <span className="text-white font-bold text-xl">{display}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-indigo-500
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(99,102,241,0.2)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-shadow
            [&::-webkit-slider-thumb:hover]:shadow-[0_0_0_7px_rgba(99,102,241,0.25)]"
          style={{
            background: `linear-gradient(to right, #6366f1 ${pct}%, #1e293b ${pct}%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Calculator() {
  const [calls, setCalls] = useState(5);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(500);
  const [period, setPeriod] = useState<Period>("monthly");

  const daily = calls * (closeRate / 100) * dealValue;
  const weekly = daily * 7;
  const monthly = daily * 30;

  const amounts: Record<Period, number> = { daily, weekly, monthly };
  const heroVal = amounts[period];

  const roiMultiple = monthly > 0 ? monthly / PLAN_COST : 0;
  const roiBarPct = Math.min((roiMultiple / 20) * 100, 100);

  const periodLabels: Record<Period, string> = {
    daily: "lost every day from missed calls",
    weekly: "lost every week from missed calls",
    monthly: "lost every month from missed calls",
  };

  return (
    <section id="calculator" className="bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Revenue Leak Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How much is your phone{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              costing you?
            </span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Move the sliders to see exactly how much revenue walks out the door every time a call goes unanswered.
          </p>
        </div>

        {/* Sliders card */}
        <div className="rounded-2xl border border-white/5 bg-white/2 p-6 sm:p-8 mb-5">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-7">
            Your Numbers
          </p>

          <Slider
            label="Missed calls per day"
            value={calls}
            min={1}
            max={50}
            step={1}
            display={`${calls} calls`}
            onChange={setCalls}
          />
          <Slider
            label="Close rate on inbound calls"
            value={closeRate}
            min={1}
            max={100}
            step={1}
            display={`${closeRate}%`}
            onChange={setCloseRate}
          />
          <Slider
            label="Average value per new customer"
            value={dealValue}
            min={50}
            max={10000}
            step={50}
            display={fmt(dealValue)}
            onChange={setDealValue}
          />
        </div>

        {/* Results card */}
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 p-6 sm:p-8">

          {/* Period toggle */}
          <div className="flex bg-slate-900 border border-white/5 rounded-xl p-1 w-fit mb-8">
            {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  period === p
                    ? "bg-indigo-500 text-white shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Hero number */}
          <div className="mb-2">
            <span className="text-5xl sm:text-7xl font-black text-red-400 tracking-tight leading-none">
              {fmt(heroVal)}
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-8">{periodLabels[period]}</p>

          {/* Breakdown grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {([["Daily", daily], ["Weekly", weekly], ["Monthly", monthly]] as [string, number][]).map(
              ([label, val]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/5 bg-white/3 p-4 text-center"
                >
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-2">
                    {label}
                  </p>
                  <p className="text-lg font-bold text-red-400">{fmt(val)}</p>
                </div>
              )
            )}
          </div>

          {/* Formula */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl border border-white/5 bg-white/2 mb-6 text-sm">
            <span className="text-slate-500">Missed calls</span>
            <span className="font-bold text-white">{calls}</span>
            <span className="text-slate-600 text-base">×</span>
            <span className="text-slate-500">Close rate</span>
            <span className="font-bold text-white">{closeRate}%</span>
            <span className="text-slate-600 text-base">×</span>
            <span className="text-slate-500">Deal value</span>
            <span className="font-bold text-white">{fmt(dealValue)}</span>
            <span className="text-slate-600 text-base">=</span>
            <span className="font-bold text-red-400">{fmt(daily)}/day</span>
          </div>

          {/* ROI section */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-indigo-300 text-sm font-semibold">
                VoiceFlow AI — from ${PLAN_COST}/mo · ROI
              </span>
              <span className="text-indigo-300 font-bold text-lg">
                {roiMultiple >= 1 ? `${Math.round(roiMultiple)}× ROI` : "<1× ROI"}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500"
                style={{ width: `${roiBarPct}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              You lose{" "}
              <span className="text-indigo-300 font-semibold">{fmt(monthly)}/mo</span> from missed
              calls. Our service starts at{" "}
              <span className="text-indigo-300 font-semibold">${PLAN_COST}/mo</span> and pays for
              itself in days.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            Stop Losing Revenue — Book a Free Demo
          </a>
        </div>

      </div>
    </section>
  );
}
