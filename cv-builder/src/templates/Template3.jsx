import React from 'react';
import { SectionRenderer } from '../sections/SectionRenderer';
import { Phone, Mail, MapPin, Globe, Linkedin } from 'lucide-react';

const CompactHeader = ({ personalInfo }) => (
    <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
        <h1 className="text-3xl font-serif font-bold text-slate-900 uppercase tracking-wider mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600 font-medium font-sans">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {personalInfo.linkedin}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {personalInfo.website}</span>}
        </div>
    </div>
);

const Template3 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;

    return (
        <div className="bg-white mx-auto shadow-sm" style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}>
            <CompactHeader personalInfo={personalInfo} />

            <div className="flex flex-col gap-1.5 relative z-10 text-[0.85rem] leading-snug">
                {sections.map((section) => (
                    <div key={section.id} className="mb-2">
                        <SectionRenderer section={section} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Template3;
