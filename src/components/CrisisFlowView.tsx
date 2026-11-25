import React, { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Instagram, RefreshCw } from 'lucide-react';
import { CRISIS_FLOW_STEPS, CRISIS_INFO_ITEMS } from '../data/crisisData';
import { CrisisInfoItem, CrisisPillar } from '../types/crisis';

interface CrisisFlowViewProps {
  onSelectCategoryAndGoHome: (category: CrisisPillar) => void;
  onOpenDetail: (item: CrisisInfoItem) => void;
}

export const CrisisFlowView: React.FC<CrisisFlowViewProps> = ({
  onSelectCategoryAndGoHome,
  onOpenDetail,
}) => {
  const [activeStepId, setActiveStepId] = useState<string>('step-4');

  const activeStep =
    CRISIS_FLOW_STEPS.find((step) => step.id === activeStepId) || CRISIS_FLOW_STEPS[0];

  const featuredPosts = CRISIS_INFO_ITEMS.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header Intro */}
      <section className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-neutral-900">
              Alur Pengelolaan Komunikasi Krisis Gojek
            </h2>
            <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
              Tahapan strategis penyusunan, pengelompokan 3 layanan utama, hingga evaluasi respons publik melalui Instagram @gojekindonesia.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00AA13] bg-[#00AA13]/8 px-3 py-2 rounded-xl shrink-0 self-start sm:self-center">
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>@gojekindonesia</span>
          </div>
        </div>

        {/* Interactive Flowchart Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Step List */}
          <div className="lg:col-span-7 space-y-2.5">
            {CRISIS_FLOW_STEPS.map((step, index) => {
              const selected = step.id === activeStepId;
              return (
                <div key={step.id}>
                  <button
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      selected
                        ? 'bg-[#00AA13]/6 border-[#00AA13] shadow-xs'
                        : 'bg-[#F5F5F5]/60 border-neutral-200/80 hover:bg-white hover:border-neutral-300'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5 ${
                        selected
                          ? 'bg-[#00AA13] text-white'
                          : 'bg-white text-neutral-700 border border-neutral-200'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-display text-sm font-bold leading-snug ${
                          selected ? 'text-[#00AA13]' : 'text-neutral-900'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </button>
                  {index < CRISIS_FLOW_STEPS.length - 1 && (
                    <div className="flex justify-center py-0.5 text-neutral-300" aria-hidden="true">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Active Step Detail & 3 Pillar Links */}
          <div className="lg:col-span-5 bg-[#F5F5F5] rounded-2xl p-5 border border-neutral-200/80 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-[#00AA13]">
                Tahap {activeStep.stepNumber} dari 08
              </span>
              <span className="capitalize font-medium text-neutral-700">
                Fase {activeStep.stageType}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-neutral-900 leading-snug">
              {activeStep.title}
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">{activeStep.description}</p>

            {activeStep.highlightPillars && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-neutral-800">
                  3 Kelompok Informasi Layanan:
                </p>
                <div className="space-y-2">
                  {(
                    [
                      { id: 'kegiatan' as CrisisPillar, label: activeStep.highlightPillars[0] },
                      { id: 'kebijakan' as CrisisPillar, label: activeStep.highlightPillars[1] },
                      { id: 'j3k' as CrisisPillar, label: activeStep.highlightPillars[2] },
                    ]
                  ).map((pillar) => (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => onSelectCategoryAndGoHome(pillar.id)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-[#00AA13] text-xs font-semibold text-neutral-800 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                    >
                      <span>{pillar.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#00AA13] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep.decisionNote && (
              <div className="bg-white rounded-xl p-3.5 border border-neutral-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                  <RefreshCw className="w-3.5 h-3.5 text-[#00AA13]" aria-hidden="true" />
                  <span>Mekanisme Evaluasi &amp; Perbaikan</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeStep.decisionNote}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-200/80 flex items-center gap-2 text-xs text-neutral-600">
              <CheckCircle2 className="w-4 h-4 text-[#00AA13] shrink-0" aria-hidden="true" />
              <span>Klik tahap lain di samping untuk menelusuri alur komunikasi.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Highlights */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900">
            Sorotan Publikasi @gojekindonesia
          </h3>
          <span className="text-xs text-neutral-500">3 Pilar Utama</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onOpenDetail(post)}
              className="text-left bg-white rounded-2xl border border-neutral-200/90 p-4 hover:border-[#00AA13] transition-colors cursor-pointer flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-[#00AA13]">{post.categoryLabel}</span>
                  <span className="tabular-nums">{post.timestamp}</span>
                </div>
                <h4 className="font-display text-sm font-bold text-neutral-900 leading-snug">
                  {post.title}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#00AA13] inline-flex items-center gap-1">
                <span>Lihat Detail Konten</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
