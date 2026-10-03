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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="mono-tag">{project.categoryLabel}</span>
              <span className="text-xs font-mono text-zinc-400">{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded border border-white/15 bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all text-xs font-mono"
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
              className="p-3 rounded border border-white/10 bg-white/[0.02] text-center"
            >
              <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                {m.value}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                {m.label}
              </div>
              <div className="text-[9px] text-zinc-400 mt-0.5">{m.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border border-white/10 bg-white/[0.01] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              The Business Problem
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded border border-white/15 bg-white/[0.03] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white" />
              The Engineering Solution
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architectural Flow Diagram */}
        <div className="p-4 rounded border border-white/10 bg-black/60 space-y-3 font-mono text-xs">
          <div className="text-zinc-400 uppercase tracking-wider text-[11px]">
            [ Architectural Blueprint ]
          </div>
          <div className="space-y-2">
            {project.architecture.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-zinc-300">
                <span className="text-zinc-400 select-none">[{i + 1}]</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Key Capabilities */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Verified Deliverables & Capabilities
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-white font-bold select-none">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
            Tech Stack Employed
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                View Repository ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                Inspect Live System ↗
              </a>
            )}
          </div>
          <button onClick={onClose} className="btn-secondary text-xs">
            Close Technical Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
