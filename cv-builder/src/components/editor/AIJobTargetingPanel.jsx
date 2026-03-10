import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { Target, Sparkles, AlertCircle } from 'lucide-react';

const AIJobTargetingPanel = () => {
    const targetJob = useCVStore((state) => state.cvData.targetJob);
    const setTargetJob = useCVStore((state) => state.setTargetJob);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleProcessJD = () => {
        if (!targetJob.trim()) return;

        setIsProcessing(true);
        // Simulate AI processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setShowAnalysis(true);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-indigo-200 p-5 mb-6 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

            <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">AI Job Targeting</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded ml-auto flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Pro
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Paste the job description below to get AI-tailored suggestions for your resume.
            </p>

            <textarea
                value={targetJob}
                onChange={(e) => {
                    setTargetJob(e.target.value);
                    setShowAnalysis(false);
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y mb-3"
                placeholder="Paste complete Job Description here..."
            />

            <button
                onClick={handleProcessJD}
                disabled={isProcessing || !targetJob.trim()}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${isProcessing || !targetJob.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
            >
                {isProcessing ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Job Description...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4" />
                        Extract Keywords & Analyze
                    </>
                )}
            </button>

            {/* Mock AI Analysis Result */}
            {showAnalysis && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="font-semibold text-indigo-900 text-sm mb-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Analysis Complete
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Required Skills</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'REST APIs'].map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-white border border-indigo-200 text-indigo-700 text-xs rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-indigo-700 leading-relaxed">
                            We highly recommend ensuring these keywords appear naturally in your Experience and Skills sections before downloading.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIJobTargetingPanel;
