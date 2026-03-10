import React, { useState, useMemo } from 'react';
import { useCVStore } from '../../state/useCVStore';
import { Activity, ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

// ---------------------------------------------------------------------------
// ATS scoring logic (runs entirely in the browser – no backend needed)
// ---------------------------------------------------------------------------

/** Extract all plain text from the structured cvData object */
function extractCVText(cvData) {
    const parts = [];

    // Personal info
    if (cvData.personalInfo) {
        const pi = cvData.personalInfo;
        parts.push(pi.name, pi.title, pi.email, pi.location, pi.summary);
    }

    // Sections (experience, education, skills, projects, etc.)
    if (Array.isArray(cvData.sections)) {
        cvData.sections.forEach((sec) => {
            parts.push(sec.title || '');
            if (Array.isArray(sec.items)) {
                sec.items.forEach((item) => {
                    // Collect every string value inside each item
                    Object.values(item || {}).forEach((val) => {
                        if (typeof val === 'string') parts.push(val);
                        if (Array.isArray(val)) val.forEach((v) => typeof v === 'string' && parts.push(v));
                    });
                });
            }
        });
    }

    return parts.filter(Boolean).join(' ').toLowerCase();
}

/** Pull meaningful keywords from a job description (removes stop words & short tokens) */
const STOP_WORDS = new Set([
    'and', 'or', 'the', 'a', 'an', 'in', 'of', 'to', 'for', 'is', 'are', 'was', 'were', 'be', 'been',
    'with', 'on', 'at', 'by', 'from', 'as', 'we', 'you', 'our', 'your', 'will', 'must', 'this', 'that',
    'have', 'has', 'can', 'not', 'but', 'also', 'etc', 'all', 'any', 'both', 'each', 'few', 'more',
    'most', 'other', 'some', 'such', 'than', 'then', 'when', 'where', 'who', 'which', 'about', 'into',
    'should', 'would', 'could', 'do', 'does', 'did', 'their', 'they', 'them', 'its', 'it', 'he', 'she',
    'his', 'her', 'work', 'team', 'role', 'ability', 'experience', 'please', 'strong', 'using',
    'use', 'used', 'uses', 'understand', 'minimum', 'responsible',
]);

function extractKeywords(jdText) {
    if (!jdText) return [];
    // Use a regex to pull alphanumeric tokens and hyphenated phrases (e.g., "machine-learning")
    const tokens = jdText.toLowerCase().match(/[a-z][a-z0-9]*(?:[-+.][a-z0-9]+)*/g) || [];
    const freq = {};
    tokens.forEach((t) => {
        if (t.length < 3 || STOP_WORDS.has(t)) return;
        freq[t] = (freq[t] || 0) + 1;
    });
    // Return keywords seen at least once, sorted by frequency
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([word]) => word);
}

/** Categorise keyword lists into human-readable groups for richer feedback */
const CATEGORY_PATTERNS = {
    'Technical Skills': /\b(python|java|javascript|typescript|react|node|sql|nosql|aws|azure|gcp|docker|kubernetes|git|linux|api|rest|graphql|machine.learning|deep.learning|tensorflow|pytorch|nlp|data|analytics|cloud|devops|ci.cd|agile|scrum|html|css|c\+\+|ruby|php|swift|kotlin|r\b|scala|spark|hadoop|excel|tableau|power.bi)\b/i,
    'Soft Skills': /\b(communicat|collaborat|leadership|problem.solv|critical.think|team|interpersonal|adaptab|creativit|time.manag|initiative|detail.orient|fast.learn|mentor|organiz)\b/i,
    'Experience & Action Verbs': /\b(developed|built|designed|led|managed|created|implemented|deployed|optimized|improved|increased|reduced|analyse|analyzed|delivered|collaborated|architected|maintained|automated|research|published)\b/i,
    'Domain / Industry': /\b(finance|healthcare|ecommerce|e-commerce|saas|startup|enterprise|retail|supply.chain|logistics|security|cybersecurit|blockchain|ai|ml|biotech|education|media|gaming)\b/i,
};

function categoriseKeywords(keywords) {
    const result = {};
    Object.entries(CATEGORY_PATTERNS).forEach(([cat, regex]) => {
        result[cat] = keywords.filter((k) => regex.test(k));
    });
    return result;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const ScoreDial = ({ score }) => {
    const clampedScore = Math.min(100, Math.max(0, score));
    const color =
        clampedScore >= 70 ? '#22c55e' :
            clampedScore >= 45 ? '#f59e0b' : '#ef4444';

    // SVG arc: radius 54, 75% of full circle (270 degrees), starting from 135°
    const R = 54;
    const CIRCUMFERENCE = 2 * Math.PI * R;
    const ARC = CIRCUMFERENCE * 0.75; // 270° arc
    const filled = (clampedScore / 100) * ARC;

    return (
        <div className="flex flex-col items-center gap-1">
            <svg width="140" height="100" viewBox="0 0 140 100">
                {/* Background track */}
                <circle
                    cx="70" cy="74" r={R}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(135 70 74)"
                />
                {/* Filled arc */}
                <circle
                    cx="70" cy="74" r={R}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(135 70 74)"
                    style={{ transition: 'stroke-dasharray 0.8s ease', filter: `drop-shadow(0 0 4px ${color}80)` }}
                />
                {/* Score text */}
                <text x="70" y="80" textAnchor="middle" fontSize="26" fontWeight="700" fill={color}>{clampedScore}</text>
                <text x="70" y="96" textAnchor="middle" fontSize="10" fill="#9ca3af">/ 100</text>
            </svg>
            <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ color, backgroundColor: `${color}18` }}
            >
                {clampedScore >= 70 ? '✅ ATS-Friendly' : clampedScore >= 45 ? '⚠️ Needs Work' : '❌ Low Match'}
            </span>
        </div>
    );
};

const CategoryBreakdown = ({ categories, cvText }) => (
    <div className="space-y-2 mt-3">
        {Object.entries(categories).map(([cat, keywords]) => {
            if (!keywords.length) return null;
            const found = keywords.filter((k) => cvText.includes(k));
            const missing = keywords.filter((k) => !cvText.includes(k));
            const pct = keywords.length ? Math.round((found.length / keywords.length) * 100) : 0;
            return (
                <div key={cat} className="border border-gray-100 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-700/50">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{cat}</span>
                        <span className="text-xs font-bold" style={{ color: pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444' }}>
                            {pct}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 mb-2">
                        <div
                            className="h-1.5 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444' }}
                        />
                    </div>
                    {/* Found keywords */}
                    {found.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {found.slice(0, 10).map((k) => (
                                <span key={k} className="px-1.5 py-0.5 text-[10px] font-medium bg-green-50 text-green-700 border border-green-200 rounded-full flex items-center gap-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5" />{k}
                                </span>
                            ))}
                        </div>
                    )}
                    {/* Missing keywords */}
                    {missing.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {missing.slice(0, 8).map((k) => (
                                <span key={k} className="px-1.5 py-0.5 text-[10px] font-medium bg-red-50 text-red-600 border border-red-200 rounded-full flex items-center gap-0.5">
                                    <XCircle className="w-2.5 h-2.5" />{k}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        })}
    </div>
);

const Tips = ({ score }) => {
    const tips = [
        score < 50 && { icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />, text: 'Add more keywords from the job description to your Skills or Experience sections.' },
        score < 70 && { icon: <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />, text: 'Use exact phrasing from the JD — ATS systems often match exact strings, not synonyms.' },
        { icon: <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />, text: 'Avoid tables, headers/footers, or images — many ATS systems cannot parse them.' },
        { icon: <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />, text: 'Save your resume as a plain .pdf or .docx for best ATS compatibility.' },
        score >= 70 && { icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />, text: 'Great keyword coverage! Tailor your summary to mention the company name.' },
    ].filter(Boolean);

    return (
        <div className="mt-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-md p-3">
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 ATS Tips</p>
            <ul className="space-y-1.5">
                {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-blue-900 dark:text-blue-200">{tip.icon}{tip.text}</li>
                ))}
            </ul>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ATSCalculator = () => {
    const cvData = useCVStore((state) => state.cvData);
    const [jd, setJd] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const cvText = useMemo(() => extractCVText(cvData), [cvData]);

    const { score, keywords, categories, found, missing } = useMemo(() => {
        if (!showResults || !jd.trim()) return { score: 0, keywords: [], categories: {}, found: [], missing: [] };

        const kws = extractKeywords(jd).slice(0, 80); // top 80 keywords
        const foundKws = kws.filter((k) => cvText.includes(k));
        const missingKws = kws.filter((k) => !cvText.includes(k));
        const rawScore = kws.length ? Math.round((foundKws.length / kws.length) * 100) : 0;

        // Bonus points: if summary or title mentions any keywords (+5 up to 10)
        const summaryText = (cvData.personalInfo?.summary || '').toLowerCase();
        const titleText = (cvData.personalInfo?.title || '').toLowerCase();
        const bonus = Math.min(10, foundKws.filter(k => summaryText.includes(k) || titleText.includes(k)).length * 2);
        const finalScore = Math.min(100, rawScore + bonus);

        const cats = categoriseKeywords(kws);

        return { score: finalScore, keywords: kws, categories: cats, found: foundKws, missing: missingKws };
    }, [showResults, jd, cvText, cvData]);

    const handleCalculate = () => {
        if (!jd.trim()) return;
        setShowResults(true);
    };

    const handleReset = () => {
        setShowResults(false);
        setJd('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-800 mb-6 overflow-hidden">
            {/* Accent bar */}
            <div className="absolute left-0 w-1 h-full bg-emerald-500" style={{ display: 'none' }} />

            {/* Collapsible header */}
            <button
                onClick={() => setIsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-gray-900 dark:text-white text-sm">ATS Score Calculator</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">FREE</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>

            {isOpen && (
                <div className="px-5 pb-5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Paste a job description below. We'll analyse your current CV data and tell you how well it would pass an Applicant Tracking System (ATS).
                    </p>

                    {!showResults ? (
                        <>
                            <textarea
                                value={jd}
                                onChange={(e) => setJd(e.target.value)}
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-y mb-3"
                                placeholder="Paste the full job description here..."
                            />
                            <button
                                onClick={handleCalculate}
                                disabled={!jd.trim()}
                                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${!jd.trim()
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                    }`}
                            >
                                <Activity className="w-4 h-4" />
                                Calculate ATS Score
                            </button>
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            {/* Score dial */}
                            <ScoreDial score={score} />

                            {/* Quick stat pills */}
                            <div className="flex justify-center gap-3 mt-3 mb-2">
                                <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> {found.length} Matched
                                </span>
                                <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full px-3 py-1">
                                    <XCircle className="w-3.5 h-3.5" /> {missing.length} Missing
                                </span>
                                <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                                    🔍 {keywords.length} Keywords
                                </span>
                            </div>

                            {/* Category breakdown */}
                            <CategoryBreakdown categories={categories} cvText={cvText} />

                            {/* Missing keywords list */}
                            {missing.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-xs font-semibold text-gray-700 mb-1.5">🚫 Top Missing Keywords — Add these to your CV:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {missing.slice(0, 20).map((k) => (
                                            <span key={k} className="px-2 py-0.5 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-full">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tips */}
                            <Tips score={score} />

                            {/* Reset */}
                            <button
                                onClick={handleReset}
                                className="w-full mt-4 py-2 px-4 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Re-analyse with a different JD
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ATSCalculator;
