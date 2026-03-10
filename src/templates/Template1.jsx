import React from 'react';
import Header from '../sections/Header';
import { SectionRenderer } from '../sections/SectionRenderer';

const Template1 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;

    return (
        <div className="bg-white mx-auto shadow-sm" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
            <Header personalInfo={personalInfo} />

            <div className="flex flex-col gap-2 relative z-10">
                {sections.map((section) => (
                    <SectionRenderer key={section.id} section={section} />
                ))}
            </div>
        </div>
    );
};

export default Template1;
