import React from 'react';
import { SectionRenderer } from '../sections/SectionRenderer';

/**
 * Template 4 — "Executive Wall Street"
 * Style: Corporate, classic, black-and-white, bold name, tight spacing.
 * Inspired by: Goldman Sachs, McKinsey resume formats.
 */

const T4Header = ({ personalInfo }) => {
    const { name, email, phone, location, linkedin, website } = personalInfo;
    const contacts = [email, phone, location, linkedin, website].filter(Boolean);

    return (
        <div className="text-center mb-5">
            <h1 className="text-[2rem] font-bold text-black tracking-[0.12em] uppercase">{name}</h1>
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-[0.7rem] text-gray-600 tracking-wide uppercase">
                {contacts.map((c, i) => (
                    <React.Fragment key={i}>
                        <span>{c}</span>
                        {i < contacts.length - 1 && <span className="text-gray-400">|</span>}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-3 border-t-2 border-black" />
            {personalInfo.summary && (
                <p className="mt-3 text-[0.78rem] leading-relaxed text-gray-700 text-left">{personalInfo.summary}</p>
            )}
        </div>
    );
};

const T4Section = ({ section }) => {
    if (!section || !section.items) return null;
    const items = section.items;

    return (
        <div className="mb-5">
            <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.15em] text-black border-b border-black pb-0.5 mb-3">{section.title}</h2>
            {section.type === 'experience' && items.map(item => (
                <div key={item.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[0.82rem] font-bold text-black">{item.role}</span>
                        <span className="text-[0.72rem] text-gray-600">{item.startDate} – {item.endDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[0.78rem] italic text-gray-700">{item.company}{item.location && `, ${item.location}`}</span>
                    </div>
                    {item.description && <p className="text-[0.75rem] text-gray-700 leading-relaxed">{item.description}</p>}
                </div>
            ))}
            {section.type === 'education' && items.map(item => (
                <div key={item.id} className="mb-3">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold text-black">{item.institution}</span>
                        <span className="text-[0.72rem] text-gray-600">{item.startDate} – {item.endDate}</span>
                    </div>
                    <div className="text-[0.78rem] italic text-gray-700">{item.degree}{item.gpa && ` | GPA: ${item.gpa}`}</div>
                </div>
            ))}
            {section.type === 'skills' && (
                <div className="grid grid-cols-2 gap-2">
                    {items.map(item => (
                        <div key={item.id} className="text-[0.75rem]">
                            <span className="font-bold text-black">{item.category}: </span>
                            <span className="text-gray-700">{item.skills}</span>
                        </div>
                    ))}
                </div>
            )}
            {section.type === 'projects' && items.map(item => (
                <div key={item.id} className="mb-3">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold">{item.title}</span>
                        <span className="text-[0.72rem] text-gray-600">{item.year}</span>
                    </div>
                    {item.technologies && <div className="text-[0.75rem] italic text-gray-600">{item.technologies}</div>}
                    {item.description && <p className="text-[0.75rem] text-gray-700 leading-relaxed">{item.description}</p>}
                </div>
            ))}
            {!['experience', 'education', 'skills', 'projects'].includes(section.type) && (
                <SectionRenderer section={section} />
            )}
        </div>
    );
};

const Template4 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    return (
        <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '18mm 20mm', fontFamily: 'Georgia, serif' }}>
            <T4Header personalInfo={personalInfo} />
            {sections.map(section => (
                <T4Section key={section.id} section={section} />
            ))}
        </div>
    );
};

export default Template4;
