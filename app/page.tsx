'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { ProcessSection } from '@/components/ProcessSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ProjectEstimator } from '@/components/ProjectEstimator';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  const [inquiryScope, setInquiryScope] = useState('');

  const handleScopeSelected = (scope: string) => {
    setInquiryScope(scope);
  };

  return (
    <div className="relative overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* 01. Hero & Value Proposition */}
      <Hero />

      {/* 02. Selected Projects & Architectural Case Studies */}
      <ProjectsSection />

      {/* 03. Core Capabilities & Services */}
      <CapabilitiesSection />

      {/* 04. Philosophy: Why No Fake Reviews */}
      <PhilosophySection />

      {/* 05. 4-Step Engineering Protocol */}
      <ProcessSection />

      {/* 06. Tech Stack & Standards */}
      <TechStackSection />

      {/* 07. Interactive Scope & Cost Estimator */}
      <ProjectEstimator onSelectScope={handleScopeSelected} />

      {/* 08. Direct Contact & Hire Inquiry */}
      <ContactSection initialMessage={inquiryScope} />
    </div>
  );
}
