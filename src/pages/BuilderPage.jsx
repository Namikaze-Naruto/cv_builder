import React, { useState } from 'react';
import EditorPanel from '../components/editor/EditorPanel';
import CVPreview from '../components/preview/CVPreview';
import { useCVStore } from '../state/useCVStore';
import { Briefcase, Sun, Moon, ExternalLink, LogIn, PenLine, Eye } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import { Link } from 'react-router-dom';

const BuilderPage = () => {
    const loadProfessionPreset = useCVStore((state) => state.loadProfessionPreset);
    const darkMode = useCVStore((state) => state.darkMode);
    const toggleDarkMode = useCVStore((state) => state.toggleDarkMode);
    const [authOpen, setAuthOpen] = useState(false);
    // Mobile tab: 'edit' | 'preview'
    const [mobileTab, setMobileTab] = useState('edit');

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">

            {/* SaaS App Header — glassmorphism */}
            <header className="h-14 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/60 dark:border-gray-700/60 shrink-0 flex items-center justify-between px-4 sm:px-6 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                        CV
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white tracking-tight text-lg font-outfit">Builder<span className="text-indigo-600">Pro</span></span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Profession Presets Dropdown */}
                    <div className="group relative hidden sm:block">
                        <button
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2 min-h-[44px]"
                            aria-label="Load a profession preset"
                            aria-haspopup="menu"
                        >
                            <Briefcase className="w-4 h-4" /> <span className="hidden md:inline">Load Preset</span>
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50" role="menu" aria-label="Profession presets">
                            {['General', 'Engineering', 'Research', 'Medical', 'Student'].map(preset => (
                                <button
                                    key={preset}
                                    onClick={() => loadProfessionPreset(preset)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 min-h-[44px]"
                                    role="menuitem"
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                    {/* Portfolio Link */}
                    <Link
                        to="/port"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2 min-h-[44px] hidden sm:flex"
                        title="View your web portfolio"
                        aria-label="View your web portfolio"
                    >
                        <ExternalLink className="w-4 h-4" /> <span className="hidden md:inline">Portfolio</span>
                    </Link>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="w-11 h-11 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                    <button
                        onClick={() => setAuthOpen(true)}
                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors items-center gap-1.5 min-h-[44px] hidden sm:flex"
                        aria-label="Log in to your account"
                    >
                        <LogIn className="w-4 h-4" /> Log in
                    </button>
                    <button
                        onClick={() => setAuthOpen(true)}
                        className="px-3 py-2 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors min-h-[44px]"
                        aria-label="Sign up for an account"
                    >
                        Sign up
                    </button>
                </div>
            </header>

            {/* Mobile Tab Switcher — only visible on small screens */}
            <div className="md:hidden flex shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-10">
                <button
                    onClick={() => setMobileTab('edit')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors min-h-[44px] ${mobileTab === 'edit' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    aria-label="Switch to edit tab"
                    aria-pressed={mobileTab === 'edit'}
                >
                    <PenLine className="w-4 h-4" /> Edit
                </button>
                <button
                    onClick={() => setMobileTab('preview')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors min-h-[44px] ${mobileTab === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    aria-label="Switch to preview tab"
                    aria-pressed={mobileTab === 'preview'}
                >
                    <Eye className="w-4 h-4" /> Preview
                </button>
            </div>

            {/* Main Workspace Area: Left Editor + Right Preview */}
            <main className="flex-1 flex overflow-hidden">
                {/* Editor: full width on mobile (hidden when preview tab active), fixed width on desktop */}
                <div className={`${mobileTab === 'edit' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-auto`}>
                    <EditorPanel />
                </div>
                {/* Preview: full width on mobile (hidden when edit tab active), fills remaining space on desktop */}
                <div className={`${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0`}>
                    <CVPreview />
                </div>
            </main>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
    );
};

export default BuilderPage;

