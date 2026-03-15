import React from 'react';
import Header from '../sections/Header';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Summary from '../sections/Summary';

const componentsMap = {
    summary: Summary,
    experience: Experience,
    education: Education,
    projects: Projects,
    skills: Skills,
    research: Experience, // Use Experience as a base for research
    publications: Projects, // Use Projects as a base for publications
    residency: Experience,
    certifications: Projects,
    achievements: Projects,
};

// SectionRenderer dynamically renders the correct component based on type
export const SectionRenderer = ({ section }) => {
    const Component = componentsMap[section.type];

    if (!Component) {
        return (
            <div className="text-red-500 my-4">
                Unknown section type: {section.type}
            </div>
        );
    }

    return (
        <div className="mb-6 page-break-inside-avoid">
            {/* Section Title */}
            {section.title && (
                <h2 className="text-lg font-bold text-gray-900 border-b-2 border-primary-500 pb-1 mb-4 uppercase tracking-wider">
                    {section.title}
                </h2>
            )}
            {/* Section Content Items */}
            <Component items={section.items} />
        </div>
    );
};
