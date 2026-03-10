import React from 'react';
import EditorPanel from '../components/editor/EditorPanel';
import CVPreview from '../components/preview/CVPreview';
import { useCVStore } from '../state/useCVStore';
import { Briefcase } from 'lucide-react';

const BuilderPage = () => {
    const loadProfessionPreset = useCVStore((state) => state.loadProfessionPreset);

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50">

            {/* SaaS App Header */}
            <header className="h-14 bg-white border-b border-gray-200 shrink-0 flex items-center justify-between px-6 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                        CV
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight text-lg">Builder<span className="text-indigo-600">Pro</span></span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Profession Presets Dropdown */}
                    <div className="group relative">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">
                            <Briefcase className="w-4 h-4" /> Load Preset
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            {['General', 'Engineering', 'Research', 'Medical', 'Student'].map(preset => (
                                <button
                                    key={preset}
                                    onClick={() => loadProfessionPreset(preset)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</button>
                    <button className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-sm font-medium shadow-sm transition-colors">Sign up</button>
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
