import React from 'react';

/**
 * Template 6 — "Harvard Academic"
 * Style: Clean academic CV with ruled section titles.
 */

const T6Section = ({ section }) => {
    const items = section.items || [];

    const renderContent = () => {
        if (section.type === 'experience' || section.type === 'research') return items.map(item => (
            <div key={item.id} className="mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[0.82rem] font-bold text-gray-900">{item.role || item.title}</span>
                        <span className="text-[0.78rem] text-gray-700">{item.company && `, ${item.company}`}{item.institution && `, ${item.institution}`}{item.location && `, ${item.location}`}</span>
                    </div>
                    <span className="text-[0.75rem] text-gray-500 shrink-0 ml-4">{item.startDate} – {item.endDate}</span>
                </div>
                {item.description && <p className="mt-0.5 text-[0.75rem] text-gray-700 leading-relaxed">{item.description}</p>}
            </div>
        ));
        if (section.type === 'education') return items.map(item => (
            <div key={item.id} className="mb-4">
                <div className="flex justify-between">
                    <div>
                        <div className="text-[0.82rem] font-bold text-gray-900">{item.degree}</div>
                        <div className="text-[0.78rem] text-gray-700">{item.institution}</div>
                    </div>
                    <span className="text-[0.75rem] text-gray-500 shrink-0 ml-4">{item.endDate}</span>
                </div>
                {item.gpa && <div className="text-[0.72rem] text-gray-500">GPA: {item.gpa}</div>}
                {item.description && <div className="text-[0.75rem] text-gray-700 mt-0.5">{item.description}</div>}
            </div>
        ));
        if (section.type === 'publications') return items.map((item, i) => (
            <p key={item.id} className="mb-2 text-[0.75rem] text-gray-700 leading-relaxed">
                [{i + 1}] {item.authors && `${item.authors}. `}{item.title && `"${item.title}." `}{item.journal && <em>{item.journal}. </em>}{item.year && `${item.year}.`}
            </p>
        ));
        if (section.type === 'skills') return (
            <div className="grid grid-cols-1 gap-1">
                {items.map(item => (
                    <div key={item.id} className="text-[0.75rem] text-gray-700">
                        <span className="font-semibold">{item.category}:</span> {item.skills}
                    </div>
                ))}
            </div>
        );
        if (section.type === 'certifications') return items.map(item => (
            <div key={item.id} className="mb-2 flex justify-between text-[0.75rem]">
                <span className="font-semibold text-gray-900">{item.name}{item.issuer && ` · ${item.issuer}`}</span>
                {item.date && <span className="text-gray-500">{item.date}</span>}
            </div>
        ));
        if (section.type === 'achievements') return items.map(item => (
            <div key={item.id} className="mb-2">
                <div className="flex justify-between text-[0.75rem]">
                    <span className="font-semibold text-gray-900">{item.title}</span>
                    {item.date && <span className="text-gray-500">{item.date}</span>}
                </div>
                {item.description && <p className="text-[0.73rem] text-gray-600">{item.description}</p>}
            </div>
        ));
        return items.map(item => (
            <div key={item.id} className="text-[0.75rem] text-gray-700 mb-1">
                {item.description || item.title || item.role}
            </div>
        ));
    };

    return (
        <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gray-900 shrink-0">{section.title}</h2>
                <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            {renderContent()}
        </div>
    );
};

const Template6 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    const { name, email, phone, location, linkedin, website, summary } = personalInfo;
    const contacts = [email, phone, location, linkedin, website].filter(Boolean);

    return (
        <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: '"Times New Roman", Times, serif' }}>
            <div className="text-center mb-6">
                <h1 className="text-[1.8rem] font-bold text-gray-900 tracking-wide uppercase">{name}</h1>
                <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-[0.72rem] text-gray-600">
                    {contacts.map((c, i) => (
                        <React.Fragment key={i}>
                            <span>{c}</span>
                            {i < contacts.length - 1 && <span>·</span>}
                        </React.Fragment>
                    ))}
                </div>
                {summary && <p className="mt-4 text-[0.78rem] text-gray-700 leading-relaxed max-w-xl mx-auto text-left">{summary}</p>}
            </div>
            {sections.map(section => <T6Section key={section.id} section={section} />)}
        </div>
    );
};

export default Template6;
