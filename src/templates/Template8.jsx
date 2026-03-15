import React from 'react';

/**
 * Template 8 — "Elegant Teal Accent"
 * Style: Off-white, teal accents. Premium Management / Business Analyst format.
 */

const TEAL = '#0d9488';

const T8SectionTitle = ({ title }) => (
    <div className="flex items-center gap-3 mb-4">
        <h2 style={{ color: TEAL, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{title}</h2>
        <div style={{ flex: 1, height: '1.5px', backgroundColor: TEAL, opacity: 0.3 }} />
    </div>
);

const T8Section = ({ section }) => {
    const items = section.items || [];
    return (
        <div className="mb-6">
            <T8SectionTitle title={section.title} />
            {section.type === 'experience' && items.map(item => (
                <div key={item.id} className="mb-4 flex gap-4">
                    <div className="text-right shrink-0 w-[80px]">
                        <span style={{ fontSize: '0.68rem', color: TEAL, fontWeight: 600 }}>{item.startDate}</span>
                        <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>to</div>
                        <span style={{ fontSize: '0.68rem', color: TEAL, fontWeight: 600 }}>{item.endDate}</span>
                    </div>
                    <div className="flex-1 border-l-2 pl-4" style={{ borderColor: '#ccfbf1' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>{item.role}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 500, color: TEAL }}>{item.company}{item.location && ` · ${item.location}`}</div>
                        {item.description && <p style={{ marginTop: '4px', fontSize: '0.73rem', color: '#4b5563', lineHeight: 1.6 }}>{item.description}</p>}
                    </div>
                </div>
            ))}
            {section.type === 'education' && items.map(item => (
                <div key={item.id} className="mb-3 flex gap-4">
                    <div className="text-right shrink-0 w-[80px]">
                        <span style={{ fontSize: '0.68rem', color: TEAL, fontWeight: 600 }}>{item.endDate}</span>
                    </div>
                    <div className="flex-1 border-l-2 pl-4" style={{ borderColor: '#ccfbf1' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>{item.degree}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.institution}{item.gpa && ` · GPA: ${item.gpa}`}</div>
                    </div>
                </div>
            ))}
            {section.type === 'skills' && (
                <div className="grid grid-cols-2 gap-2 pl-1">
                    {items.map(item => (
                        <div key={item.id}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151' }}>{item.category}</div>
                            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{item.skills}</div>
                        </div>
                    ))}
                </div>
            )}
            {section.type === 'projects' && items.map(item => (
                <div key={item.id} className="mb-3 flex gap-4">
                    <div className="text-right shrink-0 w-[80px]">
                        <span style={{ fontSize: '0.68rem', color: TEAL, fontWeight: 600 }}>{item.year}</span>
                    </div>
                    <div className="flex-1 border-l-2 pl-4" style={{ borderColor: '#ccfbf1' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>{item.title}</div>
                        {item.technologies && <div style={{ fontSize: '0.7rem', color: '#6b7280', fontStyle: 'italic' }}>{item.technologies}</div>}
                        {item.description && <p style={{ marginTop: '3px', fontSize: '0.73rem', color: '#4b5563', lineHeight: 1.6 }}>{item.description}</p>}
                    </div>
                </div>
            ))}
            {section.type === 'certifications' && items.map(item => (
                <div key={item.id} className="mb-2 flex gap-4">
                    <div className="text-right shrink-0 w-[80px]">
                        <span style={{ fontSize: '0.68rem', color: TEAL, fontWeight: 600 }}>{item.date}</span>
                    </div>
                    <div className="flex-1 border-l-2 pl-4" style={{ borderColor: '#ccfbf1' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>{item.name}</div>
                        {item.issuer && <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{item.issuer}</div>}
                    </div>
                </div>
            ))}
            {section.type === 'achievements' && items.map(item => (
                <div key={item.id} className="mb-3">
                    <div className="flex justify-between" style={{ fontSize: '0.78rem' }}>
                        <span style={{ fontWeight: 700, color: '#111827' }}>{item.title}</span>
                        {item.date && <span style={{ color: TEAL, fontWeight: 600 }}>{item.date}</span>}
                    </div>
                    {item.issuer && <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{item.issuer}</div>}
                    {item.description && <p style={{ marginTop: '3px', fontSize: '0.73rem', color: '#4b5563', lineHeight: 1.6 }}>{item.description}</p>}
                </div>
            ))}
        </div>
    );
};

const Template8 = ({ cvData }) => {
    const { personalInfo, sections } = cvData;
    const { name, email, phone, location, linkedin, website, summary } = personalInfo;

    return (
        <div className="bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: 'Georgia, serif', backgroundColor: '#fdfcfb' }}>
            <div className="mb-8">
                <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#111827', fontFamily: 'Georgia, serif' }}>{name}</h1>
                <div style={{ width: '60px', height: '3px', backgroundColor: TEAL, margin: '8px 0 12px' }} />
                <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontSize: '0.72rem', color: '#6b7280' }}>
                    {email && <span>{email}</span>}
                    {phone && <span>{phone}</span>}
                    {location && <span>{location}</span>}
                    {linkedin && <span>{linkedin}</span>}
                    {website && <span>{website}</span>}
                </div>
                {summary && <p style={{ marginTop: '12px', fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.8, fontStyle: 'italic', borderLeft: `3px solid ${TEAL}`, paddingLeft: '12px' }}>{summary}</p>}
            </div>
            {sections.map(s => <T8Section key={s.id} section={s} />)}
        </div>
    );
};

export default Template8;
