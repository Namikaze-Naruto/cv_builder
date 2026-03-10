import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { AlignJustify, Trash2, Plus, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

const SectionEditor = ({ section }) => {
    const updateSectionItem = useCVStore((state) => state.updateSectionItem);
    const removeSection = useCVStore((state) => state.removeSection);
    const [expanded, setExpanded] = useState(false);

    // Helper to add a new generic item to this section
    const handleAddItem = () => {
        const newItem = { id: Date.now().toString() };
        if (section.type === 'experience') {
            newItem.role = 'New Role';
            newItem.company = 'Company Name';
            newItem.startDate = 'Jan 2023';
            newItem.endDate = 'Present';
            newItem.description = 'Role description...';
        } else if (section.type === 'education') {
            newItem.degree = 'Degree Name';
            newItem.institution = 'University';
            newItem.startDate = '2019';
            newItem.endDate = '2023';
        } else if (section.type === 'projects') {
            newItem.title = 'Project Name';
            newItem.technologies = 'Tech Stack';
            newItem.year = '2023';
            newItem.description = 'Project outcome...';
        } else if (section.type === 'skills') {
            newItem.category = 'Category';
            newItem.skills = 'Skill 1, Skill 2';
        }
        updateSectionItem(section.id, [...section.items, newItem]);
    };

    const handleUpdateItem = (itemId, field, value) => {
        const updatedItems = section.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
        );
        updateSectionItem(section.id, updatedItems);
    };

    const handleDeleteItem = (itemId) => {
        const updatedItems = section.items.filter((item) => item.id !== itemId);
        updateSectionItem(section.id, updatedItems);
    };

    return (
        <div className="bg-white border rounded-md mb-3 overflow-hidden transition-all duration-200 shadow-sm hover:shadow group">
            {/* Section Header */}
            <div
                className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2">
                    <div className="text-gray-400 hover:text-gray-600 cursor-grab px-1" onClick={(e) => e.stopPropagation()}>
                        <GripVertical className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-800 capitalize flex items-center gap-2">
                        <AlignJustify className="w-4 h-4 text-primary-500" />
                        {section.title}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full ml-2">
                        {section.items.length} items
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        title="Delete Section"
                        onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {expanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
            </div>

            {/* Expanded Content Editor */}
            {expanded && (
                <div className="p-4 bg-white space-y-4">
                    {section.items.map((item, index) => (
                        <div key={item.id} className="relative p-3 border border-gray-200 rounded-md bg-gray-50 group/item">
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 bg-white rounded-md border shadow-sm"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center justify-between mb-3 pr-8">
                                <h4 className="text-sm font-semibold text-gray-700">Item {index + 1}</h4>
                            </div>

                            {/* Dynamic Inputs based on section type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                {/* Experience Fields */}
                                {section.type === 'experience' && (
                                    <>
                                        <input className="input-field" placeholder="Role (e.g. Frontend Engineer)" value={item.role || ''} onChange={(e) => handleUpdateItem(item.id, 'role', e.target.value)} />
                                        <input className="input-field" placeholder="Company (e.g. Google)" value={item.company || ''} onChange={(e) => handleUpdateItem(item.id, 'company', e.target.value)} />
                                        <input className="input-field" placeholder="Location" value={item.location || ''} onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)} />
                                        <div className="flex gap-2">
                                            <input className="input-field w-1/2" placeholder="Start (e.g. Jan 2022)" value={item.startDate || ''} onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                            <input className="input-field w-1/2" placeholder="End (e.g. Present)" value={item.endDate || ''} onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                        </div>
                                        <textarea className="input-field sm:col-span-2 min-h-[80px]" placeholder="Description of achievements..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Education Fields */}
                                {section.type === 'education' && (
                                    <>
                                        <input className="input-field" placeholder="Degree (e.g. B.S. Computer Science)" value={item.degree || ''} onChange={(e) => handleUpdateItem(item.id, 'degree', e.target.value)} />
                                        <input className="input-field" placeholder="Institution (e.g. MIT)" value={item.institution || ''} onChange={(e) => handleUpdateItem(item.id, 'institution', e.target.value)} />
                                        <input className="input-field" placeholder="Location" value={item.location || ''} onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)} />
                                        <div className="flex gap-2">
                                            <input className="input-field w-1/2" placeholder="Start Year" value={item.startDate || ''} onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                            <input className="input-field w-1/2" placeholder="End Year" value={item.endDate || ''} onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                        </div>
                                        <input className="input-field sm:col-span-2" placeholder="GPA (Optional)" value={item.gpa || ''} onChange={(e) => handleUpdateItem(item.id, 'gpa', e.target.value)} />
                                        <textarea className="input-field sm:col-span-2 min-h-[60px]" placeholder="Description or honors..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Project Fields */}
                                {section.type === 'projects' && (
                                    <>
                                        <input className="input-field" placeholder="Project Title" value={item.title || ''} onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)} />
                                        <input className="input-field" placeholder="Link / URL" value={item.link || ''} onChange={(e) => handleUpdateItem(item.id, 'link', e.target.value)} />
                                        <input className="input-field" placeholder="Technologies used" value={item.technologies || ''} onChange={(e) => handleUpdateItem(item.id, 'technologies', e.target.value)} />
                                        <input className="input-field" placeholder="Year" value={item.year || ''} onChange={(e) => handleUpdateItem(item.id, 'year', e.target.value)} />
                                        <textarea className="input-field sm:col-span-2 min-h-[80px]" placeholder="Project description..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Skill Fields */}
                                {section.type === 'skills' && (
                                    <>
                                        <input className="input-field" placeholder="Category (e.g. Languages)" value={item.category || ''} onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)} />
                                        <textarea className="input-field min-h-[60px]" placeholder="Comma separated skills (e.g. JS, Python, React)" value={item.skills || ''} onChange={(e) => handleUpdateItem(item.id, 'skills', e.target.value)} />
                                    </>
                                )}

                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddItem}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 font-medium text-sm flex items-center justify-center gap-2 hover:border-primary-500 hover:text-primary-600 transition-colors bg-gray-50 hover:bg-white"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
