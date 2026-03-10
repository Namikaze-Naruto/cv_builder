import React from 'react';
import Header from '../sections/Header';
import { SectionRenderer } from '../sections/SectionRenderer';

const Template2 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;

    // Filter sections into main and sidebar
    // Sidebar usually holds Skills, Education, Certifications, Contact
    const sidebarTypes = ['skills', 'education', 'certifications', 'languages'];
    const sidebarSections = sections.filter(sec => sidebarTypes.includes(sec.type));
    const mainSections = sections.filter(sec => !sidebarTypes.includes(sec.type));

    return (
        <div className="bg-white mx-auto shadow-sm flex flex-col" style={{ width: '210mm', minHeight: '297mm' }}>
            {/* Full width header but styled distinctly */}
            <div className="bg-slate-800 text-white p-8">
                <Header personalInfo={personalInfo} isDark={true} />
            </div>

            <div className="flex flex-1">
                {/* Main Content Area */}
                <div className="w-2/3 p-8 border-r border-gray-100 flex flex-col gap-4">
                    {mainSections.map((section) => (
                        <div key={section.id} className="mb-2">
                            <SectionRenderer section={section} />
                        </div>
                    ))}
                </div>

                {/* Sidebar Area */}
                <div className="w-1/3 p-6 bg-slate-50 flex flex-col gap-6">
                    {sidebarSections.map((section) => (
                        <div key={section.id} className="mb-2">
                            <SectionRenderer section={section} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Template2;
