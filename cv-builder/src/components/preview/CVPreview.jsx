import React, { useRef, useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { templates } from '../../templates/registry';
import { useReactToPrint } from 'react-to-print';
import { Download, LayoutTemplate, Activity, Minimize2, Maximize2, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { useOverflowDetection } from '../../hooks/useOverflowDetection';

const CVPreview = () => {
    const cvData = useCVStore((state) => state.cvData);
    const setTemplate = useCVStore((state) => state.setTemplate);
    const printRef = useRef();
    const [showTemplates, setShowTemplates] = useState(false);
    const [compactMode, setCompactMode] = useState(false);

    // Overflow detection — measures the actual rendered CV height vs. A4
    const { pageRef, isOverflowing, percentage } = useOverflowDetection(cvData);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `${cvData.personalInfo.name || 'My'}_Resume`,
        pageStyle: `
            @page { size: A4; margin: 0; }
            @media print { body { -webkit-print-color-adjust: exact; } }
        `
    });

    const TemplateComponent = templates[cvData.template] || Object.values(templates)[0];

    // Overflow status helpers
    const overflowColor = percentage > 105 ? 'red' : percentage > 100 ? 'orange' : 'green';
    const overflowLabel = percentage > 105 ? 'Overflow' : percentage > 100 ? 'Near Limit' : 'Fits';
    const OverflowIcon = percentage > 100 ? AlertTriangle : CheckCircle2;

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-100 overflow-hidden">

            {/* Utility Bar */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10 gap-3">
                <div className="flex items-center gap-2 flex-wrap">

                    {/* Template Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors"
                        >
                            <LayoutTemplate className="w-4 h-4" />
                            Template
                        </button>
                        {showTemplates && (
                            <div className="absolute top-10 left-0 w-64 bg-white border border-gray-200 shadow-xl rounded-md p-2 z-50 max-h-80 overflow-y-auto">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Layouts</div>
                                {Object.keys(templates).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => { setTemplate(t); setShowTemplates(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${cvData.template === t ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Score Badge */}
                    <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Activity className="w-3.5 h-3.5" />
                        Score: {cvData.score?.total ?? '—'}
                    </button>

                    {/* Compact Mode Toggle */}
                    <button
                        onClick={() => setCompactMode(c => !c)}
                        title={compactMode ? 'Switch to Normal mode' : 'Switch to Compact mode (fits more on page)'}
                        className={`px-3 py-1.5 border rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${compactMode ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                    >
                        {compactMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        {compactMode ? 'Compact ON' : 'Compact'}
                    </button>

                    {/* Page Fill Meter */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
                        <OverflowIcon className={`w-3.5 h-3.5 ${overflowColor === 'green' ? 'text-green-500' : overflowColor === 'orange' ? 'text-amber-500' : 'text-red-500'}`} />
                        <div className="flex flex-col gap-0.5 min-w-[90px]">
                            <div className="flex justify-between">
                                <span className="text-[10px] font-semibold text-gray-600">{overflowLabel}</span>
                                <span className="text-[10px] font-bold text-gray-700">{percentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${overflowColor === 'green' ? 'bg-green-500' : overflowColor === 'orange' ? 'bg-amber-400' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePrint}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </button>
            </div>

            {/* Overflow Warning Banner */}
            {isOverflowing && (
                <div className={`shrink-0 flex items-start gap-3 px-5 py-2.5 text-sm border-b ${percentage > 105 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <span className="font-semibold">CV exceeds one page ({percentage}% full). </span>
                        <span className="text-xs">Try: switching to Compact mode, shortening descriptions, or removing sections.</span>
                    </div>
                    <button
                        onClick={() => setCompactMode(true)}
                        className={`shrink-0 text-xs font-semibold px-2 py-1 rounded ${percentage > 105 ? 'bg-red-100 hover:bg-red-200 text-red-800' : 'bg-amber-100 hover:bg-amber-200 text-amber-800'}`}
                    >
                        Auto-Fix
                    </button>
                </div>
            )}

            {/* Fits on page success bar */}
            {!isOverflowing && percentage >= 85 && (
                <div className="shrink-0 flex items-center gap-2 px-5 py-1.5 text-xs bg-green-50 border-b border-green-100 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Great! Your CV fits on one A4 page ({percentage}% full).</span>
                </div>
            )}

            {/* Preview Area */}
            <div className="flex-1 overflow-auto p-6 bg-gray-100 flex justify-center items-start">
                {/* Printable reference — full unscaled */}
                <div style={{ display: 'none' }}>
                    <div ref={printRef}>
                        <TemplateComponent cvData={cvData} compactMode={compactMode} />
                    </div>
                </div>

                {/* Visible scaled preview */}
                <div
                    className="shadow-2xl bg-white print:shadow-none transition-all origin-top relative"
                    style={{ width: '210mm', minHeight: '297mm', transform: 'scale(0.82)', transformOrigin: 'top center' }}
                >
                    {/* A4 Boundary Guide */}
                    <div
                        ref={pageRef}
                        className="w-full"
                        style={{ minHeight: '297mm' }}
                    >
                        <TemplateComponent cvData={cvData} compactMode={compactMode} />
                    </div>

                    {/* A4 Overflow marker line */}
                    <div
                        className="absolute left-0 w-full border-t-2 border-dashed border-red-400 z-50 pointer-events-none"
                        style={{ top: '297mm' }}
                        title="A4 page boundary"
                    >
                        <span className="absolute right-2 -top-4 text-[9px] bg-red-400 text-white px-1 rounded">A4 End</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVPreview;
