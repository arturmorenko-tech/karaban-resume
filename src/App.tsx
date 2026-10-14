import React, { useState, useEffect } from 'react';
import {
  CANDIDATE_PROFILE,
  EXPERIENCE_LIST,
  ExperienceItem,
  CulinaryProject,
} from './data/resumeData';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsAndToolsSection } from './components/SkillsAndToolsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceModal, ProjectModal, OfferModal } from './components/Modals';
import { Sun, Moon, Printer, ArrowUpRight, ExternalLink, GraduationCap, Globe } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('chef_resume_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<CulinaryProject | null>(null);
  const [offerModalOpen, setOfferModalOpen] = useState<boolean>(false);
  const [offerPrefillRole, setOfferPrefillRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem('chef_resume_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const currentExpIndex = selectedExpId
    ? EXPERIENCE_LIST.findIndex((item) => item.id === selectedExpId)
    : -1;
  const selectedExperience =
    currentExpIndex >= 0 ? EXPERIENCE_LIST[currentExpIndex] : null;

  const handleOpenOffer = (role?: string) => {
    setOfferPrefillRole(role);
    setOfferModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#09090B] text-zinc-100' : 'bg-[#FAF9F6] text-zinc-900'
      }`}
    >
      {/* Strict 3-Zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#09090B]/90 border-zinc-800/80'
            : 'bg-[#FAF9F6]/90 border-zinc-200/80'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title, one line */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight whitespace-nowrap shrink-0"
          >
            Шеф-Сушист Одеса
          </a>

          {/* Zone 2: 4–5 Nav Links, single-line */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#experience"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Досвід (11)
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Навички та Інструменти
            </a>
            <a
              href="#projects"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Кулінарні Кейси
            </a>
            <a
              href="#education"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Освіта
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleOpenOffer('Сушист / Суші-кухар')}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Запропонувати вакансію
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Workspace Control Strip (Theme Switcher, Resume Date, Print/PDF) */}
      <div
        id="top"
        className={`border-b ${
          isDark ? 'bg-zinc-950/60 border-zinc-800/70' : 'bg-zinc-100/70 border-zinc-200/70'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <span>Резюме оновлено: {CANDIDATE_PROFILE.resumeDate}</span>
            <span aria-hidden="true">·</span>
            <span>{CANDIDATE_PROFILE.privacyLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Місто: {CANDIDATE_PROFILE.city}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isDark
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                  : 'bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-50'
              }`}
              aria-label="Перемкнути темну або світлу тему"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Світла тема</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Темна тема</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isDark
                  ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
                  : 'border-zinc-300 hover:bg-white text-zinc-700'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Друк резюме</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {/* Split-Screen Hero Section */}
        <section className="py-12 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-rose-600 dark:text-rose-400">
                    <span>Розглядає посади: {CANDIDATE_PROFILE.targetRoles}</span>
                    <span aria-hidden="true">·</span>
                    <span>{CANDIDATE_PROFILE.employmentType}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-balance">
                    Професійний Сушист, Старший зміни та Шеф-кухар з 11-річним досвідом
                  </h1>

                  <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                    Практичний шлях у 10+ відомих закладах готельно-ресторанного бізнесу Одеси: від класичного суші-бару та управління зміною в{' '}
                    <span className="font-semibold text-zinc-900 dark:text-white">Каппи, Бенто, Osava, Osaka</span>{' '}
                    до позиції Шеф-кухаря в <span className="font-semibold text-zinc-900 dark:text-white">СушиХата</span> та роботи у преміальному готелі «Лондонська».
                  </p>
                </div>

                {/* Primary Hero Actions */}
                <div className="space-y-6 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenOffer('Сушист / Суші-кухар')}
                      className="px-5 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Запропонувати роботу ({CANDIDATE_PROFILE.expectedSalary})
                    </button>
                    <button
                      onClick={() => setSelectedExpId(EXPERIENCE_LIST[1].id)}
                      className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isDark
                          ? 'border-zinc-700 hover:bg-zinc-900 text-zinc-200'
                          : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      <span>Останній досвід: Каппи (2 р. 7 міс.)</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Спеціалізація: Технологічні карти та калькуляції · Переобліки та закупівлі · Планування графіків роботи · Дотримання санітарних норм
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Container */}
              <div className="lg:col-span-5">
                <div className="relative h-80 sm:h-96 lg:h-full min-h-[340px] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
                  <img
                    src={CANDIDATE_PROFILE.heroImage}
                    alt="Робоча станція шеф-сушиста"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-xs font-mono-tabular text-zinc-300 mb-1">
                      Одеса · HoReCa · 2015 — 2026
                    </div>
                    <p className="text-lg font-editorial italic text-zinc-100">
                      «Якісна робота за технологічними картами, бездоганна чистота станції та чітка організація зміни»
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Key Metrics Row Below Hero Split */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 p-6 sm:p-8 rounded-2xl border ${
                isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Очікувана зарплата
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-rose-600 dark:text-rose-400">
                  35 000 грн/міс
                </div>
                <div className="text-xs text-zinc-500 mt-1">Повна зайнятість · Одеса</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Сумарний стаж на кухні
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular">
                  11+ років
                </div>
                <div className="text-xs text-zinc-500 mt-1">Безперервно з березня 2015</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Управлінський досвід
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular">
                  4+ роки
                </div>
                <div className="text-xs text-zinc-500 mt-1">Шеф-повар, Старший сушист та зміни</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Профільний диплом
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular">
                  ДНЗ ОВПУ МТС
                </div>
                <div className="text-xs text-zinc-500 mt-1">Повар, повар-кондитер (2014–2016)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          className={`py-3 border-b overflow-hidden select-none ${
            isDark ? 'bg-zinc-950 border-zinc-800/80 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
          }`}
          aria-hidden="true"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono-tabular">
            <span>КАППИ (2 РОКИ 7 МІС.)</span>
            <span>·</span>
            <span>БЕНТО (1 РІК 2 МІС.)</span>
            <span>·</span>
            <span>ДОСТАВКА РИС (СТАРШИЙ СУШИСТ)</span>
            <span>·</span>
            <span>СУШИХАТА (ШЕФ-ПОВАР)</span>
            <span>·</span>
            <span>OSAVA (2 РОКИ)</span>
            <span>·</span>
            <span>FOG FACTORY</span>
            <span>·</span>
            <span>OSAKA</span>
            <span>·</span>
            <span>АЙВА МЕРЕЖА РЕСТОРАНІВ</span>
            <span>·</span>
            <span>ОТЕЛЬ ЛОНДОНСКАЯ</span>
            <span>·</span>
            <span>TOPCAFE</span>
            <span>·</span>
            <span>КАППИ (2 РОКИ 7 МІС.)</span>
            <span>·</span>
            <span>БЕНТО (1 РІК 2 МІС.)</span>
            <span>·</span>
            <span>ДОСТАВКА РИС (СТАРШИЙ СУШИСТ)</span>
            <span>·</span>
            <span>СУШИХАТА (ШЕФ-ПОВАР)</span>
            <span>·</span>
            <span>OSAVA (2 РОКИ)</span>
          </div>
        </div>

        {/* 01. Interactive Experience Timeline with Modals */}
        <ExperienceSection
          isDark={isDark}
          onSelectExperience={(item: ExperienceItem) => setSelectedExpId(item.id)}
        />

        {/* 02. Interactive Skills Filter & Animated Tool Mastery Scales */}
        <SkillsAndToolsSection isDark={isDark} />

        {/* 03. Culinary Projects / Case Studies with Lightbox Modal */}
        <ProjectsSection
          isDark={isDark}
          onSelectProject={(proj: CulinaryProject) => setSelectedProject(proj)}
        />

        {/* 04. Education, Soft Skills & Languages Section */}
        <section id="education" className="py-16 sm:py-24 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-10">
              <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-2">
                04. Профільна Освіта та Особисті Якості
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Фундаментальна підготовка та цінності в роботі
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Education Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400">
                    {CANDIDATE_PROFILE.education.period}
                  </span>
                  <GraduationCap className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold mb-1">
                  ДНЗ ОВПУ МТС, м. Одеса
                </h3>
                <p className="text-base font-editorial italic text-zinc-600 dark:text-zinc-300 mb-4">
                  Спеціальність: «{CANDIDATE_PROFILE.education.specialty}»
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {CANDIDATE_PROFILE.education.level}. Класична технологія приготування страв, кондитерська справа, калькуляція, санітарія та організація виробництва в закладах ресторанного господарства.
                </p>
              </div>

              {/* Personal Qualities from PDF */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400 mb-4">
                  Особисті та командні якості (з резюме)
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Дисципліна та командний дух
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  Самостійність · Здатність до навчання · Доброзичливість · Робота в команді · Бажання вчитися і розвиватися · Чесність · Працелюбність
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Відповідальний і комунікабельний фахівець, який любить свою роботу та легко адаптується до нових технологічних карт і стандартів компанії.
                </p>
              </div>

              {/* Languages & Original Work.ua Link */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-tabular text-rose-600 dark:text-rose-400">
                      Володіння мовами та верифікація
                    </span>
                    <Globe className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Українська — Середній рівень
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    Вільне читання та ведення технологічних і калькуляційних карт, бланків інвентаризації, графіків змін та робочої документації.
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={CANDIDATE_PROFILE.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <span>Оригінал резюме на Work.ua</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleOpenOffer('Сушист / Старший зміни')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Зв’язатися
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            Інтерактивне портфоліо кандидата · Сушист / Суші-кухар · м. Одеса · {CANDIDATE_PROFILE.expectedSalary}
          </div>
          <div className="flex items-center gap-6">
            <a
              href={CANDIDATE_PROFILE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Work.ua #5629256
            </a>
            <button
              onClick={() => handleOpenOffer()}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Запропонувати вакансію
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Догори ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ExperienceModal
        item={selectedExperience}
        onClose={() => setSelectedExpId(null)}
        onPrev={() => {
          if (currentExpIndex > 0) {
            setSelectedExpId(EXPERIENCE_LIST[currentExpIndex - 1].id);
          }
        }}
        onNext={() => {
          if (currentExpIndex >= 0 && currentExpIndex < EXPERIENCE_LIST.length - 1) {
            setSelectedExpId(EXPERIENCE_LIST[currentExpIndex + 1].id);
          }
        }}
        hasPrev={currentExpIndex > 0}
        hasNext={currentExpIndex >= 0 && currentExpIndex < EXPERIENCE_LIST.length - 1}
        currentIndex={currentExpIndex}
        totalCount={EXPERIENCE_LIST.length}
        isDark={isDark}
        onOpenOffer={handleOpenOffer}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDark={isDark}
      />

      <OfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        initialRole={offerPrefillRole}
        isDark={isDark}
      />
    </div>
  );
}
