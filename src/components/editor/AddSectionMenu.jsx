import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { Plus, X } from 'lucide-react';

const availableSections = [
    { type: 'experience', label: 'Work Experience' },
    { type: 'education', label: 'Education' },
    { type: 'projects', label: 'Projects' },
    { type: 'skills', label: 'Skills' },
];

const AddSectionMenu = () => {
    const addSection = useCVStore((state) => state.addSection);
    const [isOpen, setIsOpen] = useState(false);

    const handleAdd = (type, title) => {
        addSection({
            id: `sec-${crypto.randomUUID()}`,
            type,
            title,
            items: [],
        });
        setIsOpen(false);
    };

    return (
        <div className="relative mb-6">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-3 border-2 border-dashed border-primary-300 rounded-md text-primary-600 font-semibold flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors bg-white shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add Section
                </button>
            ) : (
                <div className="bg-white border rounded-lg shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">Choose Section</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {availableSections.map((sec) => (
                            <button
                                key={sec.type}
                                onClick={() => handleAdd(sec.type, sec.label)}
                                className="px-4 py-3 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 hover:border-primary-200 rounded-md text-sm font-medium transition-colors text-left"
                            >
                                {sec.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSectionMenu;
