import React from 'react';

const Skills = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {items.map((item) => (
                <div key={item.id} className="flex sm:flex-row flex-col sm:items-baseline text-sm">
                    {item.category && (
                        <span className="font-bold text-gray-900 w-32 shrink-0 sm:mb-0 mb-1">
                            {item.category}:
                        </span>
                    )}
                    <span className="text-gray-700 leading-relaxed flex-1">
                        {item.skills}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Skills;
