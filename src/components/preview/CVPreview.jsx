import React, { useRef, useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { templates } from '../../templates/registry';
import { useReactToPrint } from 'react-to-print';
import { Download, LayoutTemplate, Activity } from 'lucide-react';

const CVPreview = () => {
    const cvData = useCVStore((state) => state.cvData);
    const setTemplate = useCVStore((state) => state.setTemplate);
    const componentRef = useRef();

    const [showTemplates, setShowTemplates] = useState(false);

    // A4 size in pixels at 96 DPI is usually considered around 794x1123, 
    // but using physical units like mm in CSS is better for printing.

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${cvData.personalInfo.name || 'My'}_Resume`,
        pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `
    });

    const TemplateComponent = templates[cvData.template] || templates['Template1'];

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-100 overflow-hidden">

            {/* Utility Bar */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors"
                        >
                            <LayoutTemplate className="w-4 h-4" />
                            Change Template
                        </button>

                        {showTemplates && (
                            <div className="absolute top-12 left-0 w-48 bg-white border border-gray-200 shadow-xl rounded-md p-2 z-50">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Available Layouts</div>
                                {Object.keys(templates).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => { setTemplate(t); setShowTemplates(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-primary-50 hover:text-primary-700 transition-colors ${cvData.template === t ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SAAS Feature: Resume Score CTA */}
                    <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                        <Activity className="w-4 h-4" />
                        Score: {cvData.score ? cvData.score.total : 'Uncalculated'}
                    </button>
                </div>

                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>

            {/* Preview Area (A4 Canvas Wrapper) */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 custom-scrollbar bg-gray-100 flex justify-center">
                {/* The scaled wrapper ensures it fits nicely on varied screens while maintaining aspect ratio, but printing ignores scale */}
                <div className="shadow-2xl bg-white aspect-[210/297] print:shadow-none transition-transform origin-top"
                    style={{ width: '210mm', minHeight: '297mm', transform: 'scale(0.95)' }}>

                    <div ref={componentRef} className="w-full relative h-full">
                        <TemplateComponent cvData={cvData} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CVPreview;
