import { create } from 'zustand';
import { initialPersonalInfo, initialSections } from '../config/professions';

// Persist dark mode preference across sessions
const getInitialDarkMode = () => {
    try {
        const stored = localStorage.getItem('builderpro-dark');
        if (stored !== null) return stored === 'true';
    } catch (_) { }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

const applyDarkClass = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
};

// Apply on load
applyDarkClass(getInitialDarkMode());

// This is the core data store for the CV Builder.
// It handles all state related to the user's CV content, layout, and AI targeting.
export const useCVStore = create((set) => ({
    darkMode: getInitialDarkMode(),

    cvData: {
        template: 'Template1', // default layout
        targetJob: '', // Job description pasted by user for AI targeting
        score: null, // AI resume score
        personalInfo: initialPersonalInfo,
        sections: initialSections.General,
    },

    // Theme Actions
    toggleDarkMode: () =>
        set((state) => {
            const next = !state.darkMode;
            applyDarkClass(next);
            try { localStorage.setItem('builderpro-dark', String(next)); } catch (_) { }
            return { darkMode: next };
        }),

    // Layout Actions
    setTemplate: (templateId) =>
        set((state) => ({
            cvData: { ...state.cvData, template: templateId },
        })),

    // Personal Info Actions
    updatePersonalInfo: (field, value) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                personalInfo: { ...state.cvData.personalInfo, [field]: value },
            },
        })),

    // Section Management Actions
    addSection: (section) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                sections: [...state.cvData.sections, section],
            },
        })),

    removeSection: (sectionId) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                sections: state.cvData.sections.filter((s) => s.id !== sectionId),
            },
        })),

    reorderSections: (newSections) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                sections: newSections,
            },
        })),

    updateSectionItem: (sectionId, updatedItems) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                sections: state.cvData.sections.map((sec) =>
                    sec.id === sectionId ? { ...sec, items: updatedItems } : sec
                ),
            },
        })),

    // AI / Job Targeting Actions
    setTargetJob: (jobDescription) =>
        set((state) => ({
            cvData: { ...state.cvData, targetJob: jobDescription }
        })),

    updateScore: (newScoreStats) =>
        set((state) => ({
            cvData: { ...state.cvData, score: newScoreStats }
        })),

    // Presets
    loadProfessionPreset: (professionKey) =>
        set((state) => ({
            cvData: {
                ...state.cvData,
                sections: initialSections[professionKey] || initialSections.General,
            },
        })),
}));

