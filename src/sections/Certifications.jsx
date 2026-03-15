import React from 'react';

const Certifications = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                    <div>
                        <span className="font-semibold text-sm text-gray-900">{item.name}</span>
                        {item.issuer && (
                            <span className="text-sm text-primary-700 ml-2">· {item.issuer}</span>
                        )}
                        {item.credentialId && (
                            <div className="text-xs text-gray-400 mt-0.5">ID: {item.credentialId}</div>
                        )}
                        {item.expiry && (
                            <div className="text-xs text-gray-400">Expires: {item.expiry}</div>
                        )}
                    </div>
                    {item.date && (
                        <span className="text-sm text-gray-500 shrink-0 ml-4">{item.date}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Certifications;
