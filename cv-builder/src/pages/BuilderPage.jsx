import React from 'react';
import EditorPanel from '../components/editor/EditorPanel';
import CVPreview from '../components/preview/CVPreview';
import { useCVStore } from '../state/useCVStore';
import { Briefcase, Sun, Moon } from 'lucide-react';
import { initialSections } from '../config/professions';

const BuilderPage = () => {
    const loadProfessionPreset = useCVStore((state) => state.loadProfessionPreset);
    const darkMode = useCVStore((state) => state.darkMode);
    const toggleDarkMode = useCVStore((state) => state.toggleDarkMode);

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">

            {/* SaaS App Header */}
            <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shrink-0 flex items-center justify-between px-6 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                        CV
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white tracking-tight text-lg">Builder<span className="text-indigo-600">Pro</span></span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Profession Presets Dropdown */}
                    <div className="group relative">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                            <Briefcase className="w-4 h-4" /> Load Preset
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto custom-scrollbar">
                            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 pt-3 pb-1">Industry Templates</div>
                            {Object.keys(initialSections).map(preset => (
                                <button
                                    key={preset}
                                    onClick={() => loadProfessionPreset(preset)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                    <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Log in</button>
                    <button className="px-3 py-1.5 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors">Sign up</button>
                </div>
            </header>

            {/* Main Workspace Area: Left Editor + Right Preview */}
            <main className="flex-1 flex overflow-hidden">
                <EditorPanel />
                <CVPreview />
            </main>

        </div>
    );
};

export default BuilderPage;
