import React from 'react';

const Experience = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            {items.map((item) => (
                <div key={item.id} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1 text-gray-900">
                        <h3 className="text-md font-bold text-gray-900">{item.role}</h3>
                        <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">
                            {item.startDate} – {item.endDate}
                        </span>
                    </div>

                    <div className="flex justify-between items-baseline mb-2 text-sm">
                        <span className="font-semibold text-primary-700">{item.company}</span>
                        {item.location && <span className="text-gray-500 italic shrink-0 ml-4">{item.location}</span>}
                    </div>

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

export default Experience;
