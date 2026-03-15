import React from 'react';

const Publications = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {items.map((item, index) => (
                <div key={item.id} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="text-gray-400 font-medium shrink-0 mt-0.5">[{index + 1}]</span>
                    <div>
                        {item.authors && (
                            <span className="text-gray-600">{item.authors}. </span>
                        )}
                        {item.title && (
                            <span className="font-semibold text-gray-900">"{item.title}." </span>
                        )}
                        {item.journal && (
                            <span className="italic text-gray-700">{item.journal}. </span>
                        )}
                        {item.year && <span className="text-gray-600">{item.year}.</span>}
                        {item.description && (
                            <p className="mt-1 text-gray-500 text-xs">{item.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Publications;
