import React, { useState } from 'react';
import { SKILLS_LIST, TOOLS_MASTERY, SkillItem, ToolMasteryItem } from '../data/resumeData';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';

interface SkillsAndToolsSectionProps {
  isDark: boolean;
}

export const SkillsAndToolsSection: React.FC<SkillsAndToolsSectionProps> = ({ isDark }) => {
  const [skillFilter, setSkillFilter] = useState<'all' | SkillItem['category']>('all');
  const [toolFilter, setToolFilter] = useState<'all' | ToolMasteryItem['category']>('all');
  const [animateSeed, setAnimateSeed] = useState<number>(1);
  const [selectedToolId, setSelectedToolId] = useState<string>(TOOLS_MASTERY[0].id);

  const filteredSkills =
    skillFilter === 'all'
      ? SKILLS_LIST
      : SKILLS_LIST.filter((s) => s.category === skillFilter);

  const filteredTools =
    toolFilter === 'all'
      ? TOOLS_MASTERY
      : TOOLS_MASTERY.filter((t) => t.category === toolFilter);

  const handleReplayAnimations = () => {
    setAnimateSeed((prev) => prev + 1);
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-2">
              02. Компетенції та Інструментарій
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-balance">
              Професійні навички та шкали володіння обладнанням
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Інтерактивна фільтрація за спеціалізацією: від філірування охолодженого лосося та роботи за тех. картами до проведення переобліків і закупівель.
          </p>
        </div>

        {/* Part 1: Interactive Skills Grid with Filter Tabs */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">
              Матриця кулінарних та управлінських навичок ({filteredSkills.length})
            </h3>

            {/* Interactive Segmented Filter Controls */}
            <div
              className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
                isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200/80'
              }`}
              role="tablist"
              aria-label="Фільтр навичок"
            >
              {[
                { id: 'all', label: 'Усі навички' },
                { id: 'sushi_tech', label: 'Японська кухня' },
                { id: 'management', label: 'Облік та Управління' },
                { id: 'hot_pastry', label: 'Універсал / Кондитер' },
                { id: 'soft_skills', label: 'Робота в команді' },
              ].map((tab) => {
                const active = skillFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSkillFilter(tab.id as typeof skillFilter)}
                    role="tab"
                    aria-selected={active}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? isDark
                          ? 'bg-zinc-800 text-white shadow-sm'
                          : 'bg-white text-zinc-900 shadow-sm'
                        : isDark
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={`${skill.id}-${animateSeed}`}
                className={`p-5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h4 className="text-base font-semibold">{skill.name}</h4>
                  <span className="text-sm font-mono-tabular font-bold text-rose-600 dark:text-rose-400 shrink-0">
                    {skill.level}%
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  <span>{skill.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{skill.yearsText}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Animated Compositor Scale Bar (uses transform scaleX for smooth 60fps animation) */}
                <div
                  className={`w-full h-2 rounded-full overflow-hidden ${
                    isDark ? 'bg-zinc-800' : 'bg-zinc-100'
                  }`}
                >
                  <div
                    className="h-full bg-rose-600 dark:bg-rose-500 origin-left transition-transform duration-700 ease-out"
                    style={{
                      transform: `scaleX(${skill.level / 100})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Animated Tool & Kitchen Equipment Mastery Scales */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50/70 border-zinc-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                Анімовані шкали володіння професійним інструментом
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Натисніть на будь-який інструмент або оберіть категорію для перегляду технічних деталей роботи на станції.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`inline-flex items-center gap-1 p-1 rounded-lg border ${
                  isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                {[
                  { id: 'all', label: 'Усі інструменти' },
                  { id: 'knives', label: 'Ножі та Макісу' },
                  { id: 'equipment', label: 'Теплове обладнання' },
                  { id: 'accounting', label: 'Облік та Тех. карти' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setToolFilter(t.id as typeof toolFilter)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      toolFilter === t.id
                        ? 'bg-rose-600 text-white'
                        : isDark
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleReplayAnimations}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                    : 'border-zinc-300 hover:bg-white text-zinc-700'
                }`}
                title="Оновити анімацію шкал"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Анімувати шкали
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {filteredTools.map((tool) => {
              const isSelected = selectedToolId === tool.id;
              return (
                <div
                  key={`${tool.id}-${animateSeed}`}
                  onClick={() => setSelectedToolId(tool.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-zinc-900 border-rose-500/60'
                        : 'bg-white border-rose-500/60 shadow-sm'
                      : isDark
                      ? 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-white/70 border-zinc-200/80 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm sm:text-base font-semibold">{tool.name}</span>
                      <span className="text-xs font-editorial italic text-zinc-500 dark:text-zinc-400">
                        {tool.japaneseName}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono-tabular">
                      <span className="text-zinc-500 dark:text-zinc-400">{tool.dailyUsage}</span>
                      <span className="font-bold text-sm text-rose-600 dark:text-rose-400">
                        {tool.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Scale */}
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden mb-2.5 ${
                      isDark ? 'bg-zinc-800' : 'bg-zinc-200/80'
                    }`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-amber-500 origin-left transition-transform duration-700 ease-out"
                      style={{
                        transform: `scaleX(${tool.proficiency / 100})`,
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{tool.details}</span>
                    <span className="font-mono-tabular text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0">
                      Категорія: {tool.categoryLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
