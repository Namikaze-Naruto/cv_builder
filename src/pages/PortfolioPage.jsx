import React from 'react';
import { Link } from 'react-router-dom';
import { useCVStore } from '../state/useCVStore';
import { ExternalLink, Mail, Phone, MapPin, Globe, Linkedin, Edit3 } from 'lucide-react';

const WebSection = ({ section }) => {
    if (!section.items || section.items.length === 0) return null;

    return (
        <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="block w-6 h-px bg-indigo-300" />
                {section.title}
            </h2>

            {(section.type === 'experience' || section.type === 'research' || section.type === 'residency') && section.items.map(item => (
                <div key={item.id} className="mb-6 pl-4 border-l-2 border-gray-100 hover:border-indigo-300 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-gray-900">{item.role}</h3>
                        <span className="text-sm text-gray-400">{item.startDate} – {item.endDate}</span>
                    </div>
                    <div className="text-sm font-medium text-indigo-600 mt-0.5">{item.company || item.institution || item.hospital}</div>
                    {item.location && <div className="text-xs text-gray-400">{item.location}</div>}
                    {item.description && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>}
                </div>
            ))}

            {section.type === 'education' && section.items.map(item => (
                <div key={item.id} className="mb-4 pl-4 border-l-2 border-gray-100 hover:border-indigo-300 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-gray-900">{item.degree}</h3>
                        <span className="text-sm text-gray-400">{item.endDate}</span>
                    </div>
                    <div className="text-sm text-indigo-600">{item.institution}</div>
                    {item.gpa && <div className="text-xs text-gray-400">GPA: {item.gpa}</div>}
                    {item.description && <p className="mt-1 text-sm text-gray-600">{item.description}</p>}
                </div>
            ))}

            {section.type === 'projects' && (
                <div className="grid sm:grid-cols-2 gap-4">
                    {section.items.map(item => (
                        <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all bg-white">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                            {item.technologies && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {item.technologies.split(',').map(t => (
                                        <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium">{t.trim()}</span>
                                    ))}
                                </div>
                            )}
                            {item.description && <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {section.type === 'skills' && (
                <div className="flex flex-col gap-2">
                    {section.items.map(item => (
                        <div key={item.id} className="flex items-baseline gap-3 text-sm">
                            <span className="font-semibold text-gray-700 w-28 shrink-0">{item.category}</span>
                            <div className="flex flex-wrap gap-1">
                                {(item.skills || '').split(',').map(s => (
                                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{s.trim()}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {section.type === 'publications' && section.items.map((item, i) => (
                <div key={item.id} className="mb-3 flex gap-3 text-sm text-gray-700">
                    <span className="text-gray-400 shrink-0 font-mono">[{i + 1}]</span>
                    <span>
                        {item.authors && <span className="text-gray-500">{item.authors}. </span>}
                        {item.title && <span className="font-medium">"{item.title}." </span>}
                        {item.journal && <em className="text-gray-600">{item.journal}. </em>}
                        {item.year && item.year}
                    </span>
                </div>
            ))}

            {section.type === 'certifications' && section.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                    <div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                        {item.issuer && <span className="text-indigo-600 ml-2">· {item.issuer}</span>}
                    </div>
                    {item.date && <span className="text-gray-400 text-xs">{item.date}</span>}
                </div>
            ))}

            {section.type === 'achievements' && section.items.map(item => (
                <div key={item.id} className="mb-3 pl-4 border-l-2 border-gray-100">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                        <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                        {item.date && <span className="text-xs text-gray-400">{item.date}</span>}
                    </div>
                    {item.issuer && <div className="text-xs text-indigo-600">{item.issuer}</div>}
                    {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                </div>
            ))}
        </div>
    );
};

const PortfolioPage = () => {
    const cvData = useCVStore(state => state.cvData);
    const { personalInfo, sections } = cvData;

    const hasContent = personalInfo.name || sections.length > 0;

    if (!hasContent) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No resume data found</h2>
                    <p className="text-gray-500 mb-6">Build your resume first to view your portfolio.</p>
                    <Link to="/build" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Go to Builder →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Nav */}
            <nav className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">CV</div>
                    <span className="font-bold text-gray-800">Portfolio</span>
                </div>
                <Link
                    to="/build"
                    className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Resume
                </Link>
            </nav>

            {/* Hero Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 py-14">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                        {personalInfo.name || 'Your Name'}
                    </h1>

                    {personalInfo.summary && (
                        <p className="mt-4 text-lg text-gray-500 leading-relaxed max-w-2xl">
                            {personalInfo.summary}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-4 mt-6">
                        {personalInfo.email && (
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                                <Mail className="w-4 h-4" />
                                {personalInfo.email}
                            </a>
                        )}
                        {personalInfo.phone && (
                            <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                {personalInfo.phone}
                            </span>
                        )}
                        {personalInfo.location && (
                            <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {personalInfo.location}
                            </span>
                        )}
                        {personalInfo.linkedin && (
                            <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                                <Linkedin className="w-4 h-4" />
                                {personalInfo.linkedin}
                            </a>
                        )}
                        {personalInfo.website && (
                            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                                <Globe className="w-4 h-4" />
                                {personalInfo.website}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                {sections.map(section => (
                    <WebSection key={section.id} section={section} />
                ))}
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
                Built with <span className="text-indigo-500 font-medium">BuilderPro</span> ·{' '}
                <Link to="/" className="hover:text-indigo-500 transition-colors">Create yours →</Link>
            </footer>
        </div>
    );
};

export default PortfolioPage;
