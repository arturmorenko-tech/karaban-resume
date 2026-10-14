import React, { useState } from 'react';
import { CULINARY_PROJECTS, CulinaryProject } from '../data/resumeData';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  isDark: boolean;
  onSelectProject: (project: CulinaryProject) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isDark,
  onSelectProject,
}) => {
  const [projectFilter, setProjectFilter] = useState<'all' | CulinaryProject['category']>('all');

  const filteredProjects =
    projectFilter === 'all'
      ? CULINARY_PROJECTS
      : CULINARY_PROJECTS.filter((p) => p.category === projectFilter);

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-2">
              03. Виробничі Кейси та Кулінарні Проекти
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-balance">
              Практичні результати на кухні та суші-барі
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200/80'
            }`}
            role="tablist"
            aria-label="Фільтр кулінарних проектів"
          >
            {[
              { id: 'all', label: 'Усі кейси' },
              { id: 'station_ops', label: 'Управління зміною' },
              { id: 'menu_launch', label: 'Шеф-повар та Закупівлі' },
              { id: 'fusion_craft', label: 'Універсал та Кондитер' },
            ].map((tab) => {
              const active = projectFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id as typeof projectFilter)}
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

        {/* Media-First Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            const isWide = projectFilter === 'all' && idx === 0;
            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group rounded-2xl border overflow-hidden transition-all cursor-pointer flex flex-col ${
                  isWide ? 'lg:col-span-7' : projectFilter === 'all' ? 'lg:col-span-5' : 'lg:col-span-6'
                } ${
                  isDark
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                    : 'bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-md'
                }`}
              >
                <div className="relative h-64 sm:h-72 w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <div className="text-xs font-mono-tabular text-zinc-300 mb-1">
                        {project.categoryLabel} · {project.venue} · {project.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className="p-2 rounded-lg bg-white/15 backdrop-blur-md text-white group-hover:bg-rose-600 transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-2">
                      {project.metrics}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 truncate">
                      {project.keyDishes.join(' · ')}
                    </span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap shrink-0 group-hover:underline">
                      Відкрити кейс →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
