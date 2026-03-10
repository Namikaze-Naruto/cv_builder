/**
 * One-Page CV Rules Engine
 * 
 * Central config for character limits, item limits, and overflow handling.
 * All templates and editor components should reference this file.
 */

// ── Character limits per field ─────────────────────────────────────────────
export const CHAR_LIMITS = {
    summary: 300,
    experiencedesc: 200,
    projectdesc: 160,
    educationdesc: 120,
    skillscategory: 40,
    skillslist: 100,
    role: 50,
    company: 50,
    title: 60,
    degree: 60,
    institution: 60,
    technologies: 80,
};

// ── Max recommended items per section type ────────────────────────────────
export const ITEM_LIMITS = {
    experience: 3,
    education: 2,
    projects: 3,
    skills: 6,
    certifications: 4,
    publications: 5,
    awards: 3,
    achievements: 3,
    research: 3,
};

// Returns a warning level: 'ok' | 'warning' | 'danger'
export function getCharStatus(text = '', limit) {
    const len = (text || '').length;
    if (len > limit) return 'danger';
    if (len > limit * 0.85) return 'warning';
    return 'ok';
}

export function getItemStatus(items = [], sectionType) {
    const limit = ITEM_LIMITS[sectionType];
    if (!limit) return 'ok';
    if (items.length > limit) return 'danger';
    if (items.length === limit) return 'warning';
    return 'ok';
}

// A4 at 96 DPI = 1122.52px ≈ 1123px
export const A4_HEIGHT_PX = 1123;
