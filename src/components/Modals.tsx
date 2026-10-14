import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Calendar, MapPin, Briefcase, Award, Send } from 'lucide-react';
import { ExperienceItem, CulinaryProject, CANDIDATE_PROFILE } from '../data/resumeData';

interface ExperienceModalProps {
  item: ExperienceItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
  isDark: boolean;
  onOpenOffer: (prefillRole?: string) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
  isDark,
  onOpenOffer,
}) => {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exp-modal-title"
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl border p-6 sm:p-8 shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-zinc-900 border-zinc-800 text-zinc-100'
            : 'bg-white border-zinc-200 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with index and close */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-zinc-500 dark:text-zinc-400">
            <span>Етап кар’єри {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span>{item.period}</span>
            <span aria-hidden="true">·</span>
            <span>{item.duration}</span>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'
            }`}
            aria-label="Закрити вікно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Venue */}
        <div className="mb-6">
          <div className="text-xs font-medium text-rose-600 dark:text-rose-400 mb-1">
            {item.industry} · {item.city}
          </div>
          <h3 id="exp-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            {item.role} {item.subRole ? `— ${item.subRole}` : ''}
          </h3>
          <p className="text-lg font-editorial italic text-zinc-600 dark:text-zinc-300">
            Заклад: {item.company}
          </p>
        </div>

        {/* Metrics row */}
        <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl mb-6 border ${
          isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200/80'
        }`}>
          {item.stationMetrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">{metric.label}</div>
              <div className="text-base sm:text-lg font-bold font-mono-tabular">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Detailed responsibilities */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Ключові обов’язки та виробничі задачі
            </h4>
            <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-600 dark:text-rose-400 font-bold select-none mt-0.5">—</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Технологічні процеси на станції
            </h4>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.techProcesses.join(' · ')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">
              Результати та досягнення
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {item.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
                  : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Попереднє місце
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
                  : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
              }`}
            >
              Наступне місце
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenOffer(item.role);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Запросити на схожу посаду
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: CulinaryProject | null;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDark }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proj-modal-title"
    >
      <div
        className={`relative w-full max-w-3xl rounded-2xl border overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-80 w-full bg-zinc-950 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="text-xs font-mono-tabular text-zinc-300 mb-1">
              {project.categoryLabel} · {project.venue} · {project.year}
            </div>
            <h3 id="proj-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-xs sm:text-sm font-mono-tabular text-rose-600 dark:text-rose-400">
            {project.metrics}
          </div>

          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1.5">
                Виробнича задача
              </h4>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1.5">
                Реалізоване рішення
              </h4>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.solution}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
              Ключові позиції та процеси
            </h4>
            <div className="text-sm text-zinc-800 dark:text-zinc-200">
              {project.keyDishes.join(' · ')}
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              Ефективність: {project.costEfficiency}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                isDark ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200' : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
              }`}
            >
              Закрити огляд
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
  isDark: boolean;
}

export const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, initialRole, isDark }) => {
  const [role, setRole] = useState(initialRole || 'Сушист / Старший зміни');
  const [venueName, setVenueName] = useState('');
  const [shiftsPerMonth, setShiftsPerMonth] = useState(20);
  const [ratePerShift, setRatePerShift] = useState(1750);
  const [contactPhone, setContactPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialRole) setRole(initialRole);
  }, [initialRole]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const estimatedMonthly = shiftsPerMonth * ratePerShift;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-modal-title"
    >
      <div
        className={`relative w-full max-w-xl rounded-2xl border p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
              Одеса · Повна зайнятість · Очікування: {CANDIDATE_PROFILE.expectedSalary}
            </div>
            <h3 id="offer-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
              Запропонувати вакансію або стажування
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'
            }`}
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Запрошення сформовано та збережено</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Пропозиція для посади «{role}» ({venueName || 'Ваш заклад'}, орієнтовно{' '}
              <span className="font-mono-tabular font-semibold text-zinc-900 dark:text-white">
                {estimatedMonthly.toLocaleString('uk-UA')} грн/міс
              </span>
              ) готова. Ви також можете перейти до оригіналу резюме на Work.ua для відкриття контактів.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href={CANDIDATE_PROFILE.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                Відкрити резюме на Work.ua
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                Повернутися до портфоліо
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                  Посада, яку пропонуєте
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                >
                  <option value="Сушист">Сушист</option>
                  <option value="Суші-кухар">Суші-кухар</option>
                  <option value="Старший сушист / Старший зміни">Старший сушист / Старший зміни</option>
                  <option value="Шеф-повар суші-напрямку">Шеф-повар суші-напрямку</option>
                  <option value="Кухар-універсал">Кухар-універсал</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                  Назва ресторану / доставки (Одеса)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Напр., Ресторан Omakase"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                />
              </div>
            </div>

            {/* Interactive shift calculator */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Калькулятор зміни та місячного доходу
                </span>
                <span className="text-sm font-bold font-mono-tabular text-rose-600 dark:text-rose-400">
                  {estimatedMonthly.toLocaleString('uk-UA')} грн / міс
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Змін на місяць:</span>
                    <span className="font-mono-tabular font-semibold">{shiftsPerMonth} змін</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={26}
                    value={shiftsPerMonth}
                    onChange={(e) => setShiftsPerMonth(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Ставка за зміну:</span>
                    <span className="font-mono-tabular font-semibold">{ratePerShift} грн</span>
                  </div>
                  <input
                    type="range"
                    min={1200}
                    max={2500}
                    step={50}
                    value={ratePerShift}
                    onChange={(e) => setRatePerShift(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                Контактний телефон або Telegram HR / Шеф-кухаря
              </label>
              <input
                type="text"
                required
                placeholder="+380 (__) ___-__-__ або @username"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className={`w-full px-3.5 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                Умови графіку та локація в Одесі
              </label>
              <textarea
                rows={2}
                placeholder="Напр., Графік 4/2 або 5/2, з 10:00 до 22:00, Центр / Аркадія / Таїрова..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full px-3.5 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Надіслати запрошення
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
