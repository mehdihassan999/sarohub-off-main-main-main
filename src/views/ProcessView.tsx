import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, FileText, Grid, Code, Globe, TrendingUp, 
  CheckCircle2, ArrowRight, Layers, ShieldCheck, Zap 
} from 'lucide-react';
import { api } from '../api';
import { ProcessStep } from '../types';
import SEOHead from '../components/seo/SEOHead';
import Breadcrumbs from '../components/seo/Breadcrumbs';
import RollText from '../components/common/RollText';
import DiagonalArrow from '../components/common/DiagonalArrow';

const DEFAULT_PROCESS_STEPS = [
  {
    id: 1,
    stepNumber: '01',
    title: '1. Discover',
    shortDescription: 'Understand your business, your users, and your goals.',
    detailedDescription: 'Before writing any code, we listen carefully to your goals, learn about your customers, and plan out exactly what your website or app needs to accomplish.',
    activities: [
      'Friendly discussions to understand your business goals',
      'Identifying who your customers are and what they need',
      'Reviewing any existing accounts or tools you want to connect',
      'Picking the most important features to build first'
    ],
    deliverables: ['Project Overview Plan', 'Feature Checklist', 'Clear Project Timeline']
  },
  {
    id: 2,
    stepNumber: '02',
    title: '2. Plan',
    shortDescription: 'Organize the project strategy and system structure.',
    detailedDescription: 'We organize the system structure, pick the best tools, design clean data storage, and set clear milestones from start to finish.',
    activities: [
      'Organizing safe, secure data storage for your users',
      'Planning how different screens communicate with the server',
      'Selecting fast, reliable cloud servers to run your system',
      'Creating a clear week-by-week work schedule'
    ],
    deliverables: ['System Blueprint', 'Data Organization Plan', 'Delivery Schedule']
  },
  {
    id: 3,
    stepNumber: '03',
    title: '3. Design',
    shortDescription: 'Create the user experience and visual screens.',
    detailedDescription: 'Our designers create clean, beautiful screen mockups that are comfortable and easy to use on both mobile phones and computers.',
    activities: [
      'Simple layout sketches of key screens',
      'Clickable, full-color interactive prototypes you can test',
      'Choosing readable fonts, clean colors, and friendly buttons',
      'Testing across mobile phones, tablets, and laptops'
    ],
    deliverables: ['Clickable Demo Prototype', 'Brand Design Guide', 'Ready-to-Code Visuals']
  },
  {
    id: 4,
    stepNumber: '04',
    title: '4. Build',
    shortDescription: 'Develop, connect, and test the software.',
    detailedDescription: 'Our experienced developers write clean, bug-free code and thoroughly test every button, form, and screen so everything works reliably.',
    activities: [
      'Building the interactive screens and menus',
      'Building the secure background server and database connections',
      'Connecting payments, notification alerts, and smart AI features',
      'Thorough automated testing to catch and fix bugs early'
    ],
    deliverables: ['Complete, Tested Code', 'Working Prototype Demos', 'Quality Test Results']
  },
  {
    id: 5,
    stepNumber: '05',
    title: '5. Launch',
    shortDescription: 'Publish the website or app live for the public.',
    detailedDescription: 'We launch your website or app on secure online servers, connect your custom domain (like yourcompany.com), set up the security padlock (SSL), and make sure everything is running smoothly.',
    activities: [
      'Setting up fast, secure live cloud servers',
      'Connecting your domain name with full security (SSL)',
      'Final walkthrough and testing before opening to the public',
      '24/7 uptime monitoring to ensure the site stays online'
    ],
    deliverables: ['Live Website or App URL', 'Admin Login Details', 'User Guide & Documentation']
  },
  {
    id: 6,
    stepNumber: '06',
    title: '6. Support & Growth',
    shortDescription: 'Maintain, improve, and add new features.',
    detailedDescription: 'Great software continues to improve over time. We provide ongoing support, routine backups, security updates, and help you add new features as your business grows.',
    activities: [
      '24/7 uptime checks and automatic daily backups',
      'Speed optimizations to keep pages loading instantly',
      'Listening to user feedback and adding useful improvements',
      'Regular security updates and system health checks'
    ],
    deliverables: ['Monthly Health Reports', 'Ongoing Support & Backups', 'New Feature Updates']
  }
];

export default function ProcessView() {
  const [steps, setSteps] = useState<any[]>(DEFAULT_PROCESS_STEPS);

  useEffect(() => {
    api.getProcessSteps()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
          setSteps(sorted.map((s, idx) => ({
            ...DEFAULT_PROCESS_STEPS[idx],
            ...s
          })));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090E] text-white">
      <SEOHead
        title="Our Engineering Process | How We Work | SaroHub Technologies"
        description="Explore how SaroHub builds scalable digital solutions through a structured 6-phase engineering process: Discover, Plan, Design, Build, Launch, and Scale."
      />

      {/* Hero Header */}
      <div className="py-20 lg:py-28 border-b border-white/[0.08] text-center bg-[#0A0D15] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#FF5C00]/8 blur-[120px] pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-6 flex justify-center">
            <Breadcrumbs items={[{ label: 'Process', path: '/process' }]} />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] mb-4 block flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
            How We Work
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal -tracking-[2.5px] text-white mb-6 leading-tight font-display">
            How We <span className="italic text-[#FF5C00]">Deliver Results</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            Great software doesn't happen by accident. Our simple 6-step process ensures clear communication, on-time delivery, and high-quality results for your business.
          </p>

          <Link
            to="/contact"
            id="process-hero-cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF5C00] via-[#FF6C00] to-[#FF8526] hover:shadow-[0_0_24px_rgba(255,92,0,0.5)] text-white font-mono text-xs uppercase tracking-wider rounded-full transition-all font-bold border border-[#FFA566]/30"
          >
            <RollText>START A PROJECT WITH US</RollText>
            <DiagonalArrow size={16} />
          </Link>
        </div>
      </div>

      {/* 6 Steps List */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 space-y-16">
        {steps.map((step, idx) => (
          <div
            key={step.id || idx}
            id={`step-${step.stepNumber}`}
            className="rounded-3xl border border-white/[0.08] bg-[#0E121E] p-8 sm:p-14 hover:border-[#FF5C00]/40 hover:shadow-[0_0_30px_rgba(255,92,0,0.08)] transition-all duration-300 relative overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Number, Title & Description */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FF7A1A]">
                    {step.stepNumber}
                  </span>
                  <div className="h-6 w-[1px] bg-white/20" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Phase 0{idx + 1}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-normal -tracking-[1px] text-white font-display">
                  {step.title}
                </h2>

                <p className="text-base text-slate-200 leading-relaxed font-normal">
                  {step.shortDescription}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {step.detailedDescription}
                </p>
              </div>

              {/* Right Column: Key Activities & Deliverables */}
              <div className="lg:col-span-6 space-y-6 lg:border-l lg:pl-12 border-white/[0.08]">
                {step.activities && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF7A1A] mb-3 flex items-center gap-2 font-semibold">
                      <Layers className="size-4 text-[#FF5C00]" />
                      Key Activities
                    </h3>
                    <ul className="space-y-2.5">
                      {step.activities.map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-normal">
                          <CheckCircle2 className="size-4 text-[#FF5C00] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.deliverables && (
                  <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#141828]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-3 font-semibold">
                      Phase Deliverables
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((del: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="py-20 lg:py-28 border-t border-white/[0.08] text-center bg-[#0A0D15] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF5C00]/10 blur-[100px] pointer-events-none -z-10" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] mb-3 block">
            Proven Engineering Cadence
          </span>
          <h3 className="text-3xl sm:text-4xl font-normal -tracking-[1px] text-white mb-4 font-display">
            Ready to Put This Process to Work for You?
          </h3>
          <p className="text-base text-slate-300 mb-8 leading-relaxed font-normal">
            Schedule an initial discovery call with our technical leadership. We'll explore your requirements and map out clear next steps.
          </p>
          <Link
            to="/contact"
            id="process-bottom-cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C00] via-[#FF6C00] to-[#FF8526] hover:shadow-[0_0_24px_rgba(255,92,0,0.5)] text-white font-mono text-xs uppercase tracking-wider transition-all font-bold border border-[#FFA566]/30"
          >
            <RollText>START A PROJECT</RollText>
            <DiagonalArrow size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
