import React from 'react';

const Education = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {items.map((item) => (
                <div key={item.id} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-md font-bold text-gray-900">{item.degree}</h3>
                        <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">
                            {item.startDate} – {item.endDate}
                        </span>
                    </div>

                    <div className="flex justify-between items-baseline mb-2 text-sm">
                        <span className="font-semibold text-primary-700">{item.institution}</span>
                        {item.location && <span className="text-gray-500 italic shrink-0 ml-4">{item.location}</span>}
                    </div>

                    {(item.gpa || item.description) && (
                        <div className="text-sm text-gray-700 leading-relaxed">
                            {item.gpa && <div className="mb-1"><span className="font-medium">GPA:</span> {item.gpa}</div>}
                            {item.description && <div className="whitespace-pre-wrap">{item.description}</div>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Education;
