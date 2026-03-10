import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { Target, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AIJobTargetingPanel = () => {
    const cvData = useCVStore((state) => state.cvData);
    const targetJob = cvData.targetJob;
    const setTargetJob = useCVStore((state) => state.setTargetJob);
    const updateScore = useCVStore((state) => state.updateScore);

    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleProcessJD = async () => {
        if (!targetJob.trim()) return;
        setIsProcessing(true);
        setErrorMsg('');
        setAnalysisResult(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/score`, {
                cvData: cvData,
                targetJob: targetJob
            });

            setAnalysisResult(response.data);
            if (response.data.score) {
                updateScore(response.data.score);
            }
        } catch (error) {
            console.error("AI API Error:", error);
            setErrorMsg("Failed to connect to AI backend. Please try again later.");
        } finally {
            setIsProcessing(false);
        }
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
                    setAnalysisResult(null);
                    setErrorMsg('');
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y mb-3"
                placeholder="Paste complete Job Description here..."
            />

            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-3 border border-red-200">
                    {errorMsg}
                </div>
            )}

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
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Resume against JD...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4" />
                        Generate Fit Score & Keywords
                    </>
                )}
            </button>

            {analysisResult && analysisResult.status === 'success' && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="font-semibold text-indigo-900 text-sm mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Analysis Complete</span>
                        <span className="text-lg font-bold bg-white px-2 py-0.5 rounded border border-indigo-200">{analysisResult.score?.total}/100</span>
                    </h4>

                    <div className="space-y-3 mt-3">
                        {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 && (
                            <div>
                                <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Missing Keywords</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {analysisResult.missingKeywords.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-white border border-indigo-300 text-indigo-700 font-medium text-xs rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                            <div className="pt-2 border-t border-indigo-200/50">
                                <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Actionable Suggestions</span>
                                <ul className="list-disc pl-4 mt-1 text-xs text-indigo-900 space-y-1">
                                    {analysisResult.suggestions.map((suggestion, idx) => (
                                        <li key={idx} className="leading-relaxed">{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIJobTargetingPanel;
