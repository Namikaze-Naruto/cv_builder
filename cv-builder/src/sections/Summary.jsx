import React from 'react';
import { useCVStore } from '../state/useCVStore';

const Summary = () => {
    const summary = useCVStore((state) => state.cvData.personalInfo.summary);

    if (!summary) return null;

    return (
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary}
        </div>
    );
};

export default Summary;
