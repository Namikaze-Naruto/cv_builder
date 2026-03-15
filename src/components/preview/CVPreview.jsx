import React, { useRef, useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { templates, templateMeta } from '../../templates/registry';
import { useReactToPrint } from 'react-to-print';
import { Download, LayoutTemplate, Activity } from 'lucide-react';

const CVPreview = () => {
    const cvData = useCVStore((state) => state.cvData);
    const setTemplate = useCVStore((state) => state.setTemplate);
    const componentRef = useRef();

    const [showTemplates, setShowTemplates] = useState(false);

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
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden min-h-0">

            {/* Utility Bar */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors min-h-[44px]"
                            aria-label="Change template"
                            aria-expanded={showTemplates}
                        >
                            <LayoutTemplate className="w-4 h-4" />
                            <span className="hidden sm:inline">Change Template</span>
                            <span className="sm:hidden">Template</span>
                        </button>

                        {showTemplates && (
                            <div className="absolute top-12 left-0 w-56 bg-white border border-gray-200 shadow-xl rounded-md p-2 z-50">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Available Layouts</div>
                                {Object.keys(templates).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => { setTemplate(t); setShowTemplates(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${cvData.template === t ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {templateMeta[t]?.label || t}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Resume Score */}
                    <button
                        title="Paste a job description in the editor and click Generate to calculate your score"
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-md text-sm font-medium flex items-center gap-2 transition-colors min-h-[44px]"
                        aria-label="Resume ATS score"
                    >
                        <Activity className="w-4 h-4" />
                        <span>Score: {cvData.score ? cvData.score.total : 'Uncalculated'}</span>
                    </button>
                </div>

                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors hover:shadow-md min-h-[44px]"
                    aria-label="Download resume as PDF"
                >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                </button>
            </div>

            {/* Preview Area — independently scrollable, full A4 page at real size */}
            <div className="flex-1 overflow-auto custom-scrollbar bg-gray-100 p-4 sm:p-8">
                <div className="flex justify-center">
                    <div
                        ref={componentRef}
                        className="bg-white shadow-2xl print:shadow-none"
                        style={{ width: '210mm', minHeight: '297mm' }}
                    >
                        <TemplateComponent cvData={cvData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVPreview;
