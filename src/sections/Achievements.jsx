import React from 'react';

const Achievements = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {items.map((item) => (
                <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-sm text-gray-900">{item.title}</span>
                        {item.date && (
                            <span className="text-xs text-gray-500 shrink-0 ml-4">{item.date}</span>
                        )}
                    </div>
                    {item.issuer && (
                        <div className="text-xs text-primary-700 mt-0.5">{item.issuer}</div>
                    )}
                    {item.description && (
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Achievements;
