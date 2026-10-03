'use client';

import React from 'react';
import { Project } from '@/lib/types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-black text-rose-600 uppercase">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-bold text-slate-400">{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 font-black text-xs transition-colors"
            aria-label="Close dialog"
          >
            ESC ✕
          </button>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-rose-600">
                {m.value}
              </div>
              <div className="text-xs font-black text-slate-700 uppercase mt-0.5">
                {m.label}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 mt-0.5">{m.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              The Business Problem
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-rose-600 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              The Engineering Solution
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architectural Flow Diagram */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-xs">
          <div className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">
            [ Architectural Blueprint ]
          </div>
          <div className="space-y-2">
            {project.architecture.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-slate-200">
                <span className="text-rose-400 select-none">[{i + 1}]</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Key Capabilities */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Verified Deliverables &amp; Capabilities
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-rose-500 font-black select-none">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-2">
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
            Tech Stack Employed
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fun-outline !py-2 !px-4 text-xs"
              >
                View Repository ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fun-pink !py-2 !px-4 text-xs"
              >
                Inspect Live System ↗
              </a>
            )}
          </div>
          <button onClick={onClose} className="btn-fun-outline !py-2 !px-4 text-xs">
            Close Technical Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
