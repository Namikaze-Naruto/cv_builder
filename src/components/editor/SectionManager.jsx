import React from 'react';
import { useCVStore } from '../../state/useCVStore';
import SectionEditor from './SectionEditor';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';

const SortableSection = ({ section }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative mb-3 rounded-md ${isDragging ? 'opacity-0 ring-2 ring-indigo-300 ring-dashed' : ''}`}
        >
            {/* Grab handle — separate from click area so expand/collapse still works */}
            <div
                {...attributes}
                {...listeners}
                className="absolute left-0 top-0 bottom-0 w-7 flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-300 hover:text-indigo-400 transition-colors touch-none z-10"
                aria-label="Drag to reorder section"
                title="Drag to reorder"
            >
                <GripVertical className="w-4 h-4" />
            </div>
            <div className="pl-7">
                <SectionEditor section={section} />
            </div>
        </div>
    );
};

const SectionManager = () => {
    const sections = useCVStore((state) => state.cvData.sections);
    const reorderSections = useCVStore((state) => state.reorderSections);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            const oldIndex = sections.findIndex((item) => item.id === active.id);
            const newIndex = sections.findIndex((item) => item.id === over.id);

            const newSections = arrayMove(sections, oldIndex, newIndex);
            reorderSections(newSections);
        }
    };

    const activeSection = activeId ? sections.find(s => s.id === activeId) : null;

    return (
        <div className="w-full">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {sections.map((section) => (
                        <SortableSection key={section.id} section={section} />
                    ))}
                </SortableContext>

                {/* Drag Overlay — shows a floating ghost while dragging */}
                <DragOverlay>
                    {activeSection ? (
                        <div className="rounded-md border border-indigo-300 bg-white shadow-2xl shadow-indigo-100 opacity-95 pl-7">
                            <SectionEditor section={activeSection} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default SectionManager;
