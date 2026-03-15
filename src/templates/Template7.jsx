import React from 'react';

/**
 * Template 7 — "Technical Timeline"
 * Style: Dark sidebar + timeline experience view. For engineers.
 */

const T7Sidebar = ({ personalInfo, sidebarSections }) => {
    const { name, email, phone, location, linkedin, website } = personalInfo;
    return (
        <div className="w-[38%] bg-slate-900 text-white p-7 flex flex-col gap-6 min-h-full">
            <div>
                <h1 className="text-[1.5rem] font-extrabold tracking-tight leading-tight text-white">{name}</h1>
                <div className="mt-4 flex flex-col gap-2">
                    {email && <div className="flex items-center gap-2 text-[0.7rem] text-slate-300"><span className="text-slate-500">✉</span>{email}</div>}
                    {phone && <div className="flex items-center gap-2 text-[0.7rem] text-slate-300"><span className="text-slate-500">☎</span>{phone}</div>}
                    {location && <div className="flex items-center gap-2 text-[0.7rem] text-slate-300"><span className="text-slate-500">⊙</span>{location}</div>}
                    {linkedin && <div className="flex items-center gap-2 text-[0.7rem] text-slate-300"><span className="text-slate-500">in</span>{linkedin}</div>}
                    {website && <div className="flex items-center gap-2 text-[0.7rem] text-slate-300"><span className="text-slate-500">🌐</span>{website}</div>}
                </div>
            </div>
            {sidebarSections.map(section => (
                <div key={section.id}>
                    <h2 className="text-[0.65rem] uppercase font-bold tracking-[0.2em] text-slate-400 mb-3 border-b border-slate-700 pb-1">{section.title}</h2>
                    {section.type === 'skills' && section.items.map(item => (
                        <div key={item.id} className="mb-3">
                            <div className="text-[0.72rem] font-semibold text-slate-200 mb-1">{item.category}</div>
                            <div className="flex flex-wrap gap-1">
                                {(item.skills || '').split(',').map(sk => (
                                    <span key={sk} className="px-2 py-0.5 bg-slate-700 text-slate-200 text-[0.62rem] rounded font-mono">{sk.trim()}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {section.type === 'education' && section.items.map(item => (
                        <div key={item.id} className="mb-3 text-[0.72rem]">
                            <div className="text-slate-200 font-semibold">{item.degree}</div>
                            <div className="text-slate-400">{item.institution}</div>
                            <div className="text-slate-500">{item.endDate}{item.gpa && ` | GPA ${item.gpa}`}</div>
                        </div>
                    ))}
                    {section.type === 'certifications' && section.items.map(item => (
                        <div key={item.id} className="mb-2 text-[0.72rem]">
                            <div className="text-slate-200 font-semibold">{item.name}</div>
                            {item.issuer && <div className="text-slate-400">{item.issuer}</div>}
                            {item.date && <div className="text-slate-500">{item.date}</div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const T7Main = ({ personalInfo, mainSections }) => {
    return (
        <div className="flex-1 p-7 bg-white">
            {personalInfo.summary && (
                <div className="mb-6">
                    <h2 className="text-[0.72rem] uppercase font-bold tracking-[0.15em] text-slate-500 mb-2">About</h2>
                    <p className="text-[0.78rem] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                </div>
            )}
            {mainSections.map(section => (
                <div key={section.id} className="mb-6">
                    <h2 className="text-[0.72rem] uppercase font-bold tracking-[0.15em] text-slate-500 mb-4">{section.title}</h2>
                    {section.type === 'experience' && (
                        <div className="relative border-l-2 border-slate-200 pl-5 ml-1">
                            {section.items.map(item => (
                                <div key={item.id} className="mb-5 relative">
                                    <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-slate-800 border-2 border-white ring-2 ring-slate-300"></div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-[0.83rem] font-bold text-slate-900">{item.role}</div>
                                            <div className="text-[0.75rem] text-slate-500">{item.company}{item.location && ` · ${item.location}`}</div>
                                        </div>
                                        <span className="text-[0.68rem] text-slate-400 shrink-0 ml-3 mt-0.5 font-mono">{item.startDate}–{item.endDate}</span>
                                    </div>
                                    {item.description && <p className="mt-1.5 text-[0.73rem] text-gray-600 leading-relaxed">{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                    {section.type === 'projects' && (
                        <div className="grid grid-cols-1 gap-4">
                            {section.items.map(item => (
                                <div key={item.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[0.82rem] font-bold text-slate-900">{item.title}</span>
                                        <span className="text-[0.68rem] text-slate-400 font-mono">{item.year}</span>
                                    </div>
                                    {item.technologies && (
                                        <div className="flex flex-wrap gap-1 mb-1.5">
                                            {item.technologies.split(',').map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[0.62rem] rounded font-medium">{t.trim()}</span>
                                            ))}
                                        </div>
                                    )}
                                    {item.description && <p className="text-[0.73rem] text-gray-600 leading-relaxed">{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                    {!['experience', 'projects'].includes(section.type) && section.items.map(item => (
                        <div key={item.id} className="text-[0.75rem] text-gray-700 mb-1">
                            {item.description || item.title || item.role}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const Template7 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    const sidebarTypes = ['skills', 'education', 'certifications', 'languages'];
    const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type));
    const mainSections = sections.filter(s => !sidebarTypes.includes(s.type));

    return (
        <div className="bg-white mx-auto flex" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
            <T7Sidebar personalInfo={personalInfo} sidebarSections={sidebarSections} />
            <T7Main personalInfo={personalInfo} mainSections={mainSections} />
        </div>
    );
};

export default Template7;
