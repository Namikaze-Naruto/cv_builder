import React from 'react';

/**
 * Template 9 — "Bold Two-Tone Header"
 * Style: Split header (emerald). Modern 2024–2025 job board format.
 */

const T9Section = ({ section }) => {
    const items = section.items || [];
    return (
        <div className="mb-5">
            <h2 className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-emerald-700 border-b border-emerald-100 pb-1 mb-3">{section.title}</h2>
            {section.type === 'experience' && items.map(item => (
                <div key={item.id} className="mb-4">
                    <div className="flex justify-between">
                        <span className="text-[0.83rem] font-bold text-gray-900">{item.role}</span>
                        <span className="text-[0.7rem] font-mono text-gray-400">{item.startDate} – {item.endDate}</span>
                    </div>
                    <span className="text-[0.76rem] text-emerald-700 font-semibold">{item.company}</span>
                    {item.location && <span className="text-[0.7rem] text-gray-400"> · {item.location}</span>}
                    {item.description && <p className="mt-1 text-[0.74rem] text-gray-600 leading-relaxed">{item.description}</p>}
                </div>
            ))}
            {section.type === 'education' && items.map(item => (
                <div key={item.id} className="mb-3">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold text-gray-900">{item.degree}</span>
                        <span className="text-[0.7rem] text-gray-400">{item.endDate}</span>
                    </div>
                    <div className="text-[0.75rem] text-emerald-700">{item.institution}{item.gpa && ` · GPA: ${item.gpa}`}</div>
                </div>
            ))}
            {section.type === 'skills' && (
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {items.map(item => (
                        <div key={item.id} className="text-[0.73rem]">
                            <span className="font-semibold text-gray-800">{item.category}: </span>
                            <span className="text-gray-600">{item.skills}</span>
                        </div>
                    ))}
                </div>
            )}
            {section.type === 'projects' && items.map(item => (
                <div key={item.id} className="mb-3">
                    <div className="flex justify-between">
                        <span className="text-[0.82rem] font-bold text-gray-900">{item.title}</span>
                        <span className="text-[0.7rem] text-gray-400">{item.year}</span>
                    </div>
                    {item.technologies && (
                        <div className="flex flex-wrap gap-1 my-1">
                            {item.technologies.split(',').map(t => (
                                <span key={t} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[0.62rem] rounded font-medium border border-emerald-100">{t.trim()}</span>
                            ))}
                        </div>
                    )}
                    {item.description && <p className="text-[0.73rem] text-gray-600 leading-relaxed">{item.description}</p>}
                </div>
            ))}
            {section.type === 'certifications' && items.map(item => (
                <div key={item.id} className="mb-2 flex justify-between text-[0.75rem]">
                    <span className="font-semibold text-gray-900">{item.name}{item.issuer && <span className="text-emerald-700"> · {item.issuer}</span>}</span>
                    {item.date && <span className="text-gray-400">{item.date}</span>}
                </div>
            ))}
            {section.type === 'achievements' && items.map(item => (
                <div key={item.id} className="mb-2">
                    <div className="flex justify-between text-[0.75rem]">
                        <span className="font-semibold text-gray-900">{item.title}</span>
                        {item.date && <span className="text-gray-400">{item.date}</span>}
                    </div>
                    {item.issuer && <div className="text-[0.7rem] text-emerald-700">{item.issuer}</div>}
                    {item.description && <p className="text-[0.73rem] text-gray-600">{item.description}</p>}
                </div>
            ))}
        </div>
    );
};

const Template9 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    const { name, email, phone, location, linkedin, website, summary } = personalInfo;

    return (
        <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, sans-serif' }}>
            <div className="flex">
                <div className="w-1/2 bg-emerald-700 px-8 py-7">
                    <h1 className="text-[1.8rem] font-extrabold text-white leading-tight tracking-tight">{name}</h1>
                    {summary && <p className="mt-3 text-[0.73rem] text-emerald-100 leading-relaxed">{summary}</p>}
                </div>
                <div className="w-1/2 bg-emerald-50 px-7 py-7 flex flex-col justify-center gap-2">
                    {email && <div className="text-[0.72rem] text-gray-600"><span className="font-semibold text-gray-800">Email  </span>{email}</div>}
                    {phone && <div className="text-[0.72rem] text-gray-600"><span className="font-semibold text-gray-800">Phone  </span>{phone}</div>}
                    {location && <div className="text-[0.72rem] text-gray-600"><span className="font-semibold text-gray-800">Location  </span>{location}</div>}
                    {linkedin && <div className="text-[0.72rem] text-gray-600"><span className="font-semibold text-gray-800">LinkedIn  </span>{linkedin}</div>}
                    {website && <div className="text-[0.72rem] text-gray-600"><span className="font-semibold text-gray-800">Website  </span>{website}</div>}
                </div>
            </div>
            <div className="px-10 py-7">
                {sections.map(s => <T9Section key={s.id} section={s} />)}
            </div>
        </div>
    );
};

export default Template9;
