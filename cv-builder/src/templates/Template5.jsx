import React from 'react';

/**
 * Template 5 — "Creative Indigo"
 * Style: Bold, colored left column with white text. Right column has clean content.
 * Inspired by: Creative agency, Digital Marketing, and Design professional CVs.
 */

const T5Header = ({ personalInfo }) => {
    const { name, email, phone, location, linkedin, website, summary } = personalInfo;
    return (
        <div className="bg-indigo-700 text-white p-8">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">{name}</h1>
            {summary && <p className="mt-3 text-indigo-100 text-[0.8rem] leading-relaxed max-w-lg">{summary}</p>}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] text-indigo-200">
                {email && <span>✉ {email}</span>}
                {phone && <span>☎ {phone}</span>}
                {location && <span>⊙ {location}</span>}
                {linkedin && <span>in {linkedin}</span>}
                {website && <span>🌐 {website}</span>}
            </div>
        </div>
    );
};

const AccentLine = () => <div className="w-8 h-1 bg-indigo-600 mb-3 rounded-full" />;
const SectionTitle = ({ title }) => (
    <div className="mb-3">
        <AccentLine />
        <h2 className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-indigo-700">{title}</h2>
    </div>
);

const T5Section = ({ section }) => {
    const items = section.items || [];
    return (
        <div className="mb-6">
            <SectionTitle title={section.title} />
            {section.type === 'experience' && items.map(item => (
                <div key={item.id} className="mb-4 pl-3 border-l-2 border-indigo-100">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[0.84rem] font-bold text-gray-900">{item.role}</span>
                        <span className="text-[0.7rem] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium shrink-0 ml-2">{item.startDate} – {item.endDate}</span>
                    </div>
                    <span className="text-[0.78rem] font-semibold text-indigo-600">{item.company}{item.location && ` · ${item.location}`}</span>
                    {item.description && <p className="mt-1 text-[0.75rem] text-gray-600 leading-relaxed">{item.description}</p>}
                </div>
            ))}
            {section.type === 'education' && items.map(item => (
                <div key={item.id} className="mb-3 pl-3 border-l-2 border-indigo-100">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold text-gray-900">{item.degree}</span>
                        <span className="text-[0.7rem] text-gray-500">{item.endDate}</span>
                    </div>
                    <span className="text-[0.75rem] text-indigo-600 font-medium">{item.institution}</span>
                    {item.gpa && <div className="text-[0.7rem] text-gray-500">GPA: {item.gpa}</div>}
                </div>
            ))}
            {section.type === 'skills' && (
                <div className="flex flex-col gap-2">
                    {items.map(item => (
                        <div key={item.id} className="text-[0.75rem]">
                            <span className="font-bold text-gray-800">{item.category}: </span>
                            <span className="text-gray-600">{item.skills}</span>
                        </div>
                    ))}
                </div>
            )}
            {section.type === 'projects' && items.map(item => (
                <div key={item.id} className="mb-3 pl-3 border-l-2 border-indigo-100">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold text-gray-900">{item.title}</span>
                        <span className="text-[0.7rem] text-gray-500">{item.year}</span>
                    </div>
                    {item.technologies && <div className="flex flex-wrap gap-1 mt-1">{item.technologies.split(',').map(t => <span key={t} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[0.65rem] rounded font-medium">{t.trim()}</span>)}</div>}
                    {item.description && <p className="mt-1 text-[0.75rem] text-gray-600 leading-relaxed">{item.description}</p>}
                </div>
            ))}
        </div>
    );
};

const Template5 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    const sidebarTypes = ['skills', 'education', 'certifications', 'languages'];
    const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type));
    const mainSections = sections.filter(s => !sidebarTypes.includes(s.type));

    return (
        <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, sans-serif' }}>
            <T5Header personalInfo={personalInfo} />
            <div className="flex">
                {/* Main */}
                <div className="flex-1 p-8 border-r border-gray-100">
                    {mainSections.map(s => <T5Section key={s.id} section={s} />)}
                </div>
                {/* Sidebar */}
                <div className="w-[35%] p-6 bg-gray-50">
                    {sidebarSections.map(s => <T5Section key={s.id} section={s} />)}
                </div>
            </div>
        </div>
    );
};

export default Template5;
