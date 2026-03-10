import React from 'react';
import { useCVStore } from '../state/useCVStore';

// Summary renders the professional summary from personalInfo.
// It is not item-based like other sections — it reads directly from the store.
const Summary = () => {
    const summary = useCVStore((state) => state.cvData.personalInfo.summary);

    if (!summary) return null;

    return (
        <p className="text-sm text-gray-700 leading-relaxed">
            {summary}
        </p>
    );
};

export default Summary;
