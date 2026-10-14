import React, { useState } from 'react';
import { EXPERIENCE_LIST, ExperienceItem } from '../data/resumeData';
import { Search, ArrowUpRight, Filter } from 'lucide-react';

interface ExperienceSectionProps {
  isDark: boolean;
  onSelectExperience: (item: ExperienceItem) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  isDark,
  onSelectExperience,
}) => {
  const [roleFilter, setRoleFilter] = useState<'all' | ExperienceItem['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperience = EXPERIENCE_LIST.filter((item) => {
    const matchesCategory = roleFilter === 'all' || item.category === roleFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.role.toLowerCase().includes(q) ||
      (item.subRole && item.subRole.toLowerCase().includes(q)) ||
      item.company.toLowerCase().includes(q) ||
      item.shortSummary.toLowerCase().includes(q) ||
      item.techProcesses.some((tp) => tp.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-2">
              01. Кар’єрний літопис (2015 — 2026)
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-balance">
              Досвід роботи в закладах Одеси
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Натисніть на будь-яку картку закладу, щоб відкрити модальне вікно з детальним описом обов’язків, технологічних процесів та досягнень на зміні.
          </p>
        </div>

        {/* Interactive Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Category Segmented Controls */}
          <div
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200/80'
            }`}
            role="tablist"
            aria-label="Фільтр досвіду за посадою"
          >
            {[
              { id: 'all', label: `Усі місця (${EXPERIENCE_LIST.length})` },
              { id: 'sushi', label: 'Сушист / Старший зміни' },
              { id: 'chef', label: 'Шеф-повар / Старший сушист' },
              { id: 'universal', label: 'Кухар / Кондитер / Мангал' },
            ].map((tab) => {
              const active = roleFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setRoleFilter(tab.id as typeof roleFilter)}
                  role="tab"
                  aria-selected={active}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук закладу (Каппи, Osava, СушиХата)..."
              className={`w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500'
                  : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
              }`}
            />
          </div>
        </div>

        {/* Experience Cards List */}
        {filteredExperience.length === 0 ? (
          <div
            className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            <p className="text-base font-medium mb-2">За вашим запитом закладів не знайдено</p>
            <p className="text-xs text-zinc-500 mb-4">
              Спробуйте скинути фільтр категорії або очистити пошуковий рядок.
            </p>
            <button
              onClick={() => {
                setRoleFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
            >
              Показати всі 11 місць роботи
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredExperience.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => onSelectExperience(item)}
                className={`group relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isDark
                    ? 'bg-zinc-900/40 border-zinc-800/90 hover:border-zinc-600 hover:bg-zinc-900/80'
                    : 'bg-white border-zinc-200/90 hover:border-zinc-400 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Quiet 1-line unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-zinc-500 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span>{item.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.duration}</span>
                    </div>
                    <span>{item.city}</span>
                  </div>

                  {/* Role & Company */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        {item.role} {item.subRole ? `· ${item.subRole}` : ''}
                      </h3>
                      <p className="text-base font-editorial italic text-zinc-700 dark:text-zinc-300">
                        {item.company} — <span className="text-xs not-italic font-sans text-zinc-500">{item.industry}</span>
                      </p>
                    </div>
                    <span
                      className={`p-2 rounded-lg border transition-colors shrink-0 ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-950 text-zinc-400 group-hover:text-white group-hover:border-rose-500/50'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-500 group-hover:text-zinc-900 group-hover:border-rose-500/50'
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                    {item.shortSummary}
                  </p>
                </div>

                {/* Bottom Unboxed Tech Processes & Action */}
                <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {item.techProcesses.slice(0, 3).join(' · ')}
                  </div>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap shrink-0 group-hover:underline">
                    Детальніше →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
