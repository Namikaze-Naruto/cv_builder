import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { AlignJustify, Trash2, Plus, GripVertical, ChevronDown, ChevronUp, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

const SectionEditor = ({ section }) => {
    const targetJob = useCVStore((state) => state.cvData.targetJob);
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
        } else if (section.type === 'research') {
            newItem.role = 'Research Title';
            newItem.institution = 'Institution';
            newItem.startDate = 'Jan 2022';
            newItem.endDate = 'Present';
            newItem.description = 'Research description...';
        } else if (section.type === 'publications') {
            newItem.title = 'Publication Title';
            newItem.authors = 'Author A, Author B';
            newItem.journal = 'Journal Name';
            newItem.year = '2023';
        } else if (section.type === 'residency') {
            newItem.role = 'Residency Program';
            newItem.hospital = 'Hospital Name';
            newItem.location = 'City, Country';
            newItem.startDate = 'Jul 2022';
            newItem.endDate = 'Present';
            newItem.description = '';
        } else if (section.type === 'certifications') {
            newItem.name = 'Certification Name';
            newItem.issuer = 'Issuing Body';
            newItem.date = '2023';
        } else if (section.type === 'achievements') {
            newItem.title = 'Achievement Title';
            newItem.issuer = 'Organization';
            newItem.date = '2023';
            newItem.description = '';
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

    const [optimizingId, setOptimizingId] = useState(null);

    const handleOptimizeDescription = async (itemId, currentText) => {
        if (!currentText || currentText.length < 5) return;
        setOptimizingId(itemId);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/optimize`, {
                bulletPoint: currentText,
                targetJob: targetJob || 'General Professional'
            });

            if (response.data?.optimized) {
                handleUpdateItem(itemId, 'description', response.data.optimized);
            }
        } catch (error) {
            console.error("Optimize error:", error);
            // Fallback UI or toast could go here
        } finally {
            setOptimizingId(null);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mb-3 overflow-hidden transition-all duration-200 shadow-sm hover:shadow group">
            {/* Section Header */}
            <div
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2">
                    <div className="text-gray-400 hover:text-gray-600 cursor-grab px-1" onClick={(e) => e.stopPropagation()}>
                        <GripVertical className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 capitalize flex items-center gap-2">
                        <AlignJustify className="w-4 h-4 text-primary-500" />
                        {section.title}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-2 py-0.5 rounded-full ml-2">
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
                <div className="p-4 bg-white dark:bg-gray-800 space-y-4">
                    {section.items.map((item, index) => (
                        <div key={item.id} className="relative p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 group/item">
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center justify-between mb-3 pr-8">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Item {index + 1}</h4>
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
                                        <div className="sm:col-span-2 relative">
                                            <textarea className="input-field w-full min-h-[80px] pb-10" placeholder="Description of achievements..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                            <button
                                                onClick={() => handleOptimizeDescription(item.id, item.description)}
                                                disabled={optimizingId === item.id || !item.description}
                                                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md transition-colors disabled:opacity-50"
                                            >
                                                {optimizingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                                Optimize with AI
                                            </button>
                                        </div>
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
                                        <div className="sm:col-span-2 relative">
                                            <textarea className="input-field w-full min-h-[80px] pb-10" placeholder="Project description..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                            <button
                                                onClick={() => handleOptimizeDescription(item.id, item.description)}
                                                disabled={optimizingId === item.id || !item.description}
                                                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md transition-colors disabled:opacity-50"
                                            >
                                                {optimizingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                                Optimize with AI
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Skill Fields */}
                                {section.type === 'skills' && (
                                    <>
                                        <input className="input-field" placeholder="Category (e.g. Languages)" value={item.category || ''} onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)} />
                                        <textarea className="input-field min-h-[60px]" placeholder="Comma separated skills (e.g. JS, Python, React)" value={item.skills || ''} onChange={(e) => handleUpdateItem(item.id, 'skills', e.target.value)} />
                                    </>
                                )}

                                {/* Research Fields */}
                                {section.type === 'research' && (
                                    <>
                                        <input className="input-field sm:col-span-2" placeholder="Research Title / Role" value={item.role || ''} onChange={(e) => handleUpdateItem(item.id, 'role', e.target.value)} />
                                        <input className="input-field" placeholder="Institution" value={item.institution || ''} onChange={(e) => handleUpdateItem(item.id, 'institution', e.target.value)} />
                                        <input className="input-field" placeholder="Location" value={item.location || ''} onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)} />
                                        <input className="input-field" placeholder="Supervisor (Optional)" value={item.supervisor || ''} onChange={(e) => handleUpdateItem(item.id, 'supervisor', e.target.value)} />
                                        <div className="flex gap-2">
                                            <input className="input-field w-1/2" placeholder="Start" value={item.startDate || ''} onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                            <input className="input-field w-1/2" placeholder="End" value={item.endDate || ''} onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                        </div>
                                        <textarea className="input-field sm:col-span-2 min-h-[70px]" placeholder="Research description..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Publications Fields */}
                                {section.type === 'publications' && (
                                    <>
                                        <input className="input-field sm:col-span-2" placeholder="Publication Title" value={item.title || ''} onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)} />
                                        <input className="input-field sm:col-span-2" placeholder="Authors (e.g. Smith J, Doe A)" value={item.authors || ''} onChange={(e) => handleUpdateItem(item.id, 'authors', e.target.value)} />
                                        <input className="input-field" placeholder="Journal / Conference" value={item.journal || ''} onChange={(e) => handleUpdateItem(item.id, 'journal', e.target.value)} />
                                        <input className="input-field" placeholder="Year" value={item.year || ''} onChange={(e) => handleUpdateItem(item.id, 'year', e.target.value)} />
                                        <input className="input-field sm:col-span-2" placeholder="DOI / URL (Optional)" value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Residency Fields */}
                                {section.type === 'residency' && (
                                    <>
                                        <input className="input-field sm:col-span-2" placeholder="Residency Program / Role" value={item.role || ''} onChange={(e) => handleUpdateItem(item.id, 'role', e.target.value)} />
                                        <input className="input-field" placeholder="Hospital / Institution" value={item.hospital || ''} onChange={(e) => handleUpdateItem(item.id, 'hospital', e.target.value)} />
                                        <input className="input-field" placeholder="Location" value={item.location || ''} onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)} />
                                        <input className="input-field sm:col-span-2" placeholder="Specialty (Optional)" value={item.specialty || ''} onChange={(e) => handleUpdateItem(item.id, 'specialty', e.target.value)} />
                                        <div className="flex gap-2 sm:col-span-2">
                                            <input className="input-field w-1/2" placeholder="Start" value={item.startDate || ''} onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                            <input className="input-field w-1/2" placeholder="End" value={item.endDate || ''} onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                        </div>
                                        <textarea className="input-field sm:col-span-2 min-h-[70px]" placeholder="Description..." value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                                {/* Certifications Fields */}
                                {section.type === 'certifications' && (
                                    <>
                                        <input className="input-field sm:col-span-2" placeholder="Certification Name" value={item.name || ''} onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)} />
                                        <input className="input-field" placeholder="Issuing Organization" value={item.issuer || ''} onChange={(e) => handleUpdateItem(item.id, 'issuer', e.target.value)} />
                                        <input className="input-field" placeholder="Date Obtained" value={item.date || ''} onChange={(e) => handleUpdateItem(item.id, 'date', e.target.value)} />
                                        <input className="input-field" placeholder="Expiry Date (Optional)" value={item.expiry || ''} onChange={(e) => handleUpdateItem(item.id, 'expiry', e.target.value)} />
                                        <input className="input-field" placeholder="Credential ID (Optional)" value={item.credentialId || ''} onChange={(e) => handleUpdateItem(item.id, 'credentialId', e.target.value)} />
                                    </>
                                )}

                                {/* Achievements Fields */}
                                {section.type === 'achievements' && (
                                    <>
                                        <input className="input-field sm:col-span-2" placeholder="Achievement / Award Title" value={item.title || ''} onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)} />
                                        <input className="input-field" placeholder="Issuing Organization" value={item.issuer || ''} onChange={(e) => handleUpdateItem(item.id, 'issuer', e.target.value)} />
                                        <input className="input-field" placeholder="Date" value={item.date || ''} onChange={(e) => handleUpdateItem(item.id, 'date', e.target.value)} />
                                        <textarea className="input-field sm:col-span-2 min-h-[60px]" placeholder="Description (Optional)" value={item.description || ''} onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)} />
                                    </>
                                )}

                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddItem}
                        className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 font-medium text-sm flex items-center justify-center gap-2 hover:border-primary-500 hover:text-primary-600 transition-colors bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
