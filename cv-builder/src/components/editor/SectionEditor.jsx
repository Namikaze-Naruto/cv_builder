import React, { useState } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { AlignJustify, Trash2, Plus, GripVertical, ChevronDown, ChevronUp, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { CHAR_LIMITS, ITEM_LIMITS, getCharStatus, getItemStatus } from '../../config/onepage';

// ── Reusable component: character count display ───────────────────────────
const CharCounter = ({ text, limitKey }) => {
    const limit = CHAR_LIMITS[limitKey];
    if (!limit) return null;
    const len = (text || '').length;
    const status = getCharStatus(text, limit);
    const color = status === 'danger' ? 'text-red-500' : status === 'warning' ? 'text-amber-500' : 'text-gray-400';
    return (
        <span className={`text-[10px] font-mono ${color} ml-auto mt-0.5 block text-right`}>
            {len}/{limit}
        </span>
    );
};

// ── Reusable: textarea with AI optimize button and char counter ───────────
const DescTextarea = ({ value, onChange, limitKey, placeholder, onOptimize, optimizing }) => {
    const limit = CHAR_LIMITS[limitKey];
    const status = getCharStatus(value, limit);
    const borderColor = status === 'danger' ? 'focus:ring-red-400 border-red-300' : status === 'warning' ? 'focus:ring-amber-400 border-amber-300' : 'focus:ring-indigo-500 border-gray-300';

    return (
        <div className="relative sm:col-span-2">
            <textarea
                className={`input-field w-full min-h-[80px] pb-7 ${borderColor}`}
                placeholder={placeholder}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                maxLength={limit ? limit + 50 : undefined}
            />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <button
                    onClick={onOptimize}
                    disabled={optimizing || !value}
                    className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-medium rounded-md transition-colors disabled:opacity-40"
                >
                    {optimizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    AI Optimize
                </button>
                <span className={`text-[10px] font-mono ${status === 'danger' ? 'text-red-500' : status === 'warning' ? 'text-amber-500' : 'text-gray-400'}`}>
                    {(value || '').length}/{limit}
                </span>
            </div>
        </div>
    );
};

// ── Item count badge ──────────────────────────────────────────────────────
const ItemCountBadge = ({ count, sectionType }) => {
    const status = getItemStatus(Array({ length: count }), sectionType);
    const limit = ITEM_LIMITS[sectionType];
    if (!limit) return <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full ml-2">{count} items</span>;
    const color = status === 'danger' ? 'bg-red-100 text-red-700' : status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-600';
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-medium ${color}`}>
            {count}/{limit}
            {status !== 'ok' && <AlertTriangle className="w-3 h-3 inline ml-1" />}
        </span>
    );
};

// ── Main SectionEditor ────────────────────────────────────────────────────
const SectionEditor = ({ section }) => {
    const targetJob = useCVStore((state) => state.cvData.targetJob);
    const updateSectionItem = useCVStore((state) => state.updateSectionItem);
    const removeSection = useCVStore((state) => state.removeSection);
    const [expanded, setExpanded] = useState(false);
    const [optimizingId, setOptimizingId] = useState(null);

    const handleAddItem = () => {
        const limit = ITEM_LIMITS[section.type];
        if (limit && section.items.length >= limit + 1) return; // soft cap: 1 extra max before hard block

        const newItem = { id: Date.now().toString() };
        if (section.type === 'experience') { newItem.role = 'New Role'; newItem.company = 'Company'; newItem.startDate = 'Jan 2024'; newItem.endDate = 'Present'; newItem.description = ''; }
        else if (section.type === 'education') { newItem.degree = 'Degree'; newItem.institution = 'University'; newItem.startDate = '2020'; newItem.endDate = '2024'; }
        else if (section.type === 'projects') { newItem.title = 'Project Name'; newItem.technologies = ''; newItem.year = '2024'; newItem.description = ''; }
        else if (section.type === 'skills') { newItem.category = 'Category'; newItem.skills = ''; }
        updateSectionItem(section.id, [...section.items, newItem]);
    };

    const handleUpdateItem = (itemId, field, value) => {
        const updated = section.items.map(item => item.id === itemId ? { ...item, [field]: value } : item);
        updateSectionItem(section.id, updated);
    };

    const handleDeleteItem = (itemId) => {
        updateSectionItem(section.id, section.items.filter(i => i.id !== itemId));
    };

    const handleOptimize = async (itemId, currentText) => {
        if (!currentText || currentText.length < 5) return;
        setOptimizingId(itemId);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/optimize`, {
                bulletPoint: currentText, targetJob: targetJob || 'General Professional'
            });
            if (res.data?.optimized) handleUpdateItem(itemId, 'description', res.data.optimized);
        } catch (e) {
            console.error('Optimize error:', e);
        } finally {
            setOptimizingId(null);
        }
    };

    const itemLimitStatus = getItemStatus(section.items, section.type);

    return (
        <div className="bg-white border rounded-md mb-3 overflow-hidden transition-all duration-200 shadow-sm hover:shadow group">
            {/* Section Header */}
            <div
                className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <div className="text-gray-400 hover:text-gray-600 cursor-grab px-1 shrink-0" onClick={e => e.stopPropagation()}>
                        <GripVertical className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-800 flex items-center gap-2 text-sm truncate">
                        <AlignJustify className="w-4 h-4 text-indigo-500 shrink-0" />
                        {section.title}
                    </span>
                    <ItemCountBadge count={section.items.length} sectionType={section.type} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        title="Delete Section"
                        onClick={e => { e.stopPropagation(); removeSection(section.id); }}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {expanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
            </div>

            {/* Item limit warning */}
            {expanded && itemLimitStatus !== 'ok' && (
                <div className={`px-4 py-2 text-xs flex items-center gap-2 ${itemLimitStatus === 'danger' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    {itemLimitStatus === 'danger'
                        ? `Too many items! Recommended max: ${ITEM_LIMITS[section.type]} for a one-page CV.`
                        : `At the recommended limit of ${ITEM_LIMITS[section.type]} items. Adding more may cause overflow.`}
                </div>
            )}

            {/* Expanded Content */}
            {expanded && (
                <div className="p-4 bg-white space-y-4">
                    {section.items.map((item, index) => (
                        <div key={item.id} className="relative p-3 border border-gray-200 rounded-md bg-gray-50 group/item">
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 bg-white rounded-md border shadow-sm z-10"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Item {index + 1}</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                {/* ── Experience ──────────────────────────── */}
                                {section.type === 'experience' && (<>
                                    <div>
                                        <input className="input-field w-full" placeholder="Role (e.g. Frontend Engineer)" value={item.role || ''} maxLength={CHAR_LIMITS.role} onChange={e => handleUpdateItem(item.id, 'role', e.target.value)} />
                                        <CharCounter text={item.role} limitKey="role" />
                                    </div>
                                    <div>
                                        <input className="input-field w-full" placeholder="Company (e.g. Google)" value={item.company || ''} maxLength={CHAR_LIMITS.company} onChange={e => handleUpdateItem(item.id, 'company', e.target.value)} />
                                        <CharCounter text={item.company} limitKey="company" />
                                    </div>
                                    <input className="input-field" placeholder="Location" value={item.location || ''} onChange={e => handleUpdateItem(item.id, 'location', e.target.value)} />
                                    <div className="flex gap-2">
                                        <input className="input-field w-1/2" placeholder="Start" value={item.startDate || ''} onChange={e => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                        <input className="input-field w-1/2" placeholder="End" value={item.endDate || ''} onChange={e => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                    </div>
                                    <DescTextarea
                                        value={item.description} limitKey="experiencedesc"
                                        placeholder="Use bullet points (•) for each achievement. E.g: • Increased API performance by 40%"
                                        onChange={val => handleUpdateItem(item.id, 'description', val)}
                                        onOptimize={() => handleOptimize(item.id, item.description)}
                                        optimizing={optimizingId === item.id}
                                    />
                                </>)}

                                {/* ── Education ───────────────────────────── */}
                                {section.type === 'education' && (<>
                                    <div>
                                        <input className="input-field w-full" placeholder="Degree (e.g. B.S. CS)" value={item.degree || ''} onChange={e => handleUpdateItem(item.id, 'degree', e.target.value)} />
                                        <CharCounter text={item.degree} limitKey="degree" />
                                    </div>
                                    <div>
                                        <input className="input-field w-full" placeholder="Institution (e.g. MIT)" value={item.institution || ''} onChange={e => handleUpdateItem(item.id, 'institution', e.target.value)} />
                                        <CharCounter text={item.institution} limitKey="institution" />
                                    </div>
                                    <input className="input-field" placeholder="Location" value={item.location || ''} onChange={e => handleUpdateItem(item.id, 'location', e.target.value)} />
                                    <div className="flex gap-2">
                                        <input className="input-field w-1/2" placeholder="Start" value={item.startDate || ''} onChange={e => handleUpdateItem(item.id, 'startDate', e.target.value)} />
                                        <input className="input-field w-1/2" placeholder="End" value={item.endDate || ''} onChange={e => handleUpdateItem(item.id, 'endDate', e.target.value)} />
                                    </div>
                                    <input className="input-field sm:col-span-2" placeholder="GPA (Optional)" value={item.gpa || ''} onChange={e => handleUpdateItem(item.id, 'gpa', e.target.value)} />
                                    <div className="sm:col-span-2">
                                        <textarea className="input-field w-full min-h-[60px]" placeholder="Honors, minor, relevant coursework..." value={item.description || ''} maxLength={CHAR_LIMITS.educationdesc} onChange={e => handleUpdateItem(item.id, 'description', e.target.value)} />
                                        <CharCounter text={item.description} limitKey="educationdesc" />
                                    </div>
                                </>)}

                                {/* ── Projects ────────────────────────────── */}
                                {section.type === 'projects' && (<>
                                    <div>
                                        <input className="input-field w-full" placeholder="Project Title" value={item.title || ''} onChange={e => handleUpdateItem(item.id, 'title', e.target.value)} />
                                        <CharCounter text={item.title} limitKey="title" />
                                    </div>
                                    <input className="input-field" placeholder="Link / GitHub URL" value={item.link || ''} onChange={e => handleUpdateItem(item.id, 'link', e.target.value)} />
                                    <div>
                                        <input className="input-field w-full" placeholder="Tech Stack (e.g. React, Python)" value={item.technologies || ''} onChange={e => handleUpdateItem(item.id, 'technologies', e.target.value)} />
                                        <CharCounter text={item.technologies} limitKey="technologies" />
                                    </div>
                                    <input className="input-field" placeholder="Year" value={item.year || ''} onChange={e => handleUpdateItem(item.id, 'year', e.target.value)} />
                                    <DescTextarea
                                        value={item.description} limitKey="projectdesc"
                                        placeholder="Use bullet points (•) for each feature. E.g: • Reduced load time by 60%"
                                        onChange={val => handleUpdateItem(item.id, 'description', val)}
                                        onOptimize={() => handleOptimize(item.id, item.description)}
                                        optimizing={optimizingId === item.id}
                                    />
                                </>)}

                                {/* ── Skills ──────────────────────────────── */}
                                {section.type === 'skills' && (<>
                                    <div>
                                        <input className="input-field w-full" placeholder="Category (e.g. Languages)" value={item.category || ''} onChange={e => handleUpdateItem(item.id, 'category', e.target.value)} />
                                        <CharCounter text={item.category} limitKey="skillscategory" />
                                    </div>
                                    <div>
                                        <textarea className="input-field min-h-[60px]" placeholder="Comma-separated skills: JS, Python, React" value={item.skills || ''} onChange={e => handleUpdateItem(item.id, 'skills', e.target.value)} />
                                        <CharCounter text={item.skills} limitKey="skillslist" />
                                    </div>
                                </>)}

                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddItem}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 font-medium text-sm flex items-center justify-center gap-2 hover:border-indigo-400 hover:text-indigo-600 transition-colors bg-gray-50 hover:bg-white"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
