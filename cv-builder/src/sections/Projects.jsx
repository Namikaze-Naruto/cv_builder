import React from 'react';

const Projects = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            {items.map((item) => (
                <div key={item.id} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                            {item.title}
                            {item.link && (
                                <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </h3>
                        <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">
                            {item.year}
                        </span>
                    </div>

                    {item.technologies && (
                        <div className="text-sm font-medium text-primary-700 mb-2 italic">
                            {item.technologies}
                        </div>
                    )}

                    {item.description && (
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {item.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Projects;
