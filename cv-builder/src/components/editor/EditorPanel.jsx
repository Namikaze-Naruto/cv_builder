import React from 'react';
import PersonalInfoEditor from './PersonalInfoEditor';
import SectionManager from './SectionManager';
import AddSectionMenu from './AddSectionMenu';
import AIJobTargetingPanel from './AIJobTargetingPanel';
import { useCVStore } from '../../state/useCVStore';

const EditorPanel = () => {
    const targetJob = useCVStore((state) => state.cvData.targetJob);
    const score = useCVStore((state) => state.cvData.score);

    return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-gray-200 w-full lg:w-[480px] xl:w-[540px] shrink-0 overflow-y-auto custom-scrollbar">
            <div className="p-6">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">CV Builder Pro</h1>
                        <p className="text-sm text-gray-500 mt-1">Live editing and ATS optimization</p>
                    </div>
                </div>

                {/* AI SaaS Integration */}
                <AIJobTargetingPanel />

                {/* Core Editor Forms */}
                <PersonalInfoEditor />

                <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                    Resume Sections
                    <span className="text-xs font-normal text-gray-500">(Drag to reorder)</span>
                </h2>

                <SectionManager />
                <AddSectionMenu />

            </div>
        </div>
    );
};

export default EditorPanel;
