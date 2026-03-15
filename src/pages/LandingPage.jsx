import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Target, CheckCircle, ArrowRight, Zap, Layout, Star } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const templateShowcase = [
    { key: 'Template1', name: 'Classic Clean', accent: '#4f46e5', desc: 'Clean, traditional layout. Works for any industry.' },
    { key: 'Template2', name: 'Modern Sidebar', accent: '#0891b2', desc: 'Bold sidebar header. Great for tech & design roles.' },
    { key: 'Template3', name: 'Compact Serif', accent: '#7c3aed', desc: 'Elegant serif typography. Perfect for law & academia.' },
    { key: 'Template4', name: 'Executive Wall Street', accent: '#1e3a5f', desc: 'Authoritative layout for finance & consulting.' },
    { key: 'Template5', name: 'Creative Indigo', accent: '#6366f1', desc: 'Vibrant & expressive. Ideal for designers & marketers.' },
    { key: 'Template6', name: 'Harvard Academic', accent: '#b91c1c', desc: 'Research-focused. Standard for academic positions.' },
    { key: 'Template7', name: 'Technical Timeline', accent: '#0f766e', desc: 'Timeline-based. Built for engineers & developers.' },
    { key: 'Template8', name: 'Elegant Teal', accent: '#0d9488', desc: 'Polished & professional for business & management.' },
    { key: 'Template9', name: 'Bold Two-Tone', accent: '#374151', desc: 'High-contrast modern split. For bold personal brands.' },
];

const features = [
    {
        icon: <Target className="h-6 w-6 text-white" />,
        title: 'Job Targeting Matrix',
        desc: 'Paste the job description and our AI instantly identifies the keywords you\'re missing to beat ATS software like Greenhouse and Lever.',
    },
    {
        icon: <FileText className="h-6 w-6 text-white" />,
        title: 'LaTeX-Quality Templates',
        desc: 'Beautiful, professional layouts that never break. Designed precisely for A4 PDF export with perfect margins and crisp typography.',
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-white" />,
        title: 'Smart Resume Scoring',
        desc: 'Get instant feedback on your resume\'s strength, formatting, and impact metrics before you even apply.',
    },
    {
        icon: <Sparkles className="h-6 w-6 text-white" />,
        title: 'Live Preview Editor',
        desc: 'What you see is exactly what you get. Edit fields and watch your resume update in real-time on the right.',
    },
];

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-inter">
            {/* Navigation — glassmorphism */}
            <nav className="sticky top-0 z-30 border-b border-white/20 backdrop-blur-md bg-white/80 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
                                CV
                            </div>
                            <span className="font-bold text-gray-900 tracking-tight text-xl font-outfit">Builder<span className="text-indigo-600">Pro</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Features</a>
                            <a href="#templates" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Templates</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block transition-colors">Log in</button>
                            <Link to="/build" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                                Build My Resume
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white pb-16 pt-20 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40 border-b border-gray-100">
                {/* Animated gradient blob */}
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#818cf8] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="flex justify-center mb-6"
                    >
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                            <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Resume Scoring now live
                        </span>
                    </motion.div>
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                        className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6 font-outfit"
                    >
                        Land your next job with a <br className="hidden sm:block" /> <span className="text-indigo-600">targeted resume.</span>
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={2}
                        className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Create an ATS-friendly, professional resume in under 5 minutes. Paste your target job description and let AI optimize your application to stand out.
                    </motion.p>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={3}
                        className="flex justify-center gap-4"
                    >
                        <Link to="/build" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-200">
                            Create Resume for Free <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={4}
                        className="mt-4 text-sm text-gray-400"
                    >
                        No credit card required. Free PDF downloads included.
                    </motion.p>
                </div>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="bg-indigo-600 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-medium">
                        <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 10,000+ resumes built</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300" /> ATS-optimized templates</span>
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-300" /> Free PDF downloads</span>
                        <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-300" /> AI-powered scoring</span>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div id="features" className="py-24 sm:py-32 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="mx-auto max-w-2xl lg:text-center"
                    >
                        <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Faster applications</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
                            Everything you need to get hired
                        </p>
                    </motion.div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feat, i) => (
                                <motion.div
                                    key={feat.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={fadeUp}
                                    custom={i * 0.5}
                                    className="relative pl-16"
                                >
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-200">
                                            {feat.icon}
                                        </div>
                                        {feat.title}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feat.desc}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div id="templates" className="py-24 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="text-center mb-14"
                    >
                        <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Templates</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">Pick your style</p>
                        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">All 9 templates are ATS-friendly and export perfectly to PDF. Swap between them anytime — your data stays intact.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templateShowcase.map((tpl, i) => (
                            <motion.div
                                key={tpl.key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeUp}
                                custom={i * 0.15}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(0,0,0,0.12)' }}
                                className="group rounded-xl border border-gray-200 overflow-hidden shadow-sm cursor-pointer transition-shadow"
                            >
                                {/* Mini resume mock */}
                                <div className="bg-gray-50 h-52 flex flex-col p-5 gap-2 relative overflow-hidden">
                                    <div className="h-4 rounded" style={{ background: tpl.accent, width: '60%' }} />
                                    <div className="h-2.5 rounded bg-gray-300 w-40" />
                                    <div className="h-px bg-gray-200 my-1" />
                                    <div className="h-2 rounded bg-gray-200 w-full" />
                                    <div className="h-2 rounded bg-gray-200 w-5/6" />
                                    <div className="h-2 rounded bg-gray-200 w-4/6" />
                                    <div className="h-px bg-gray-200 my-1" />
                                    <div className="h-2 rounded w-1/3" style={{ background: tpl.accent }} />
                                    <div className="h-2 rounded bg-gray-200 w-full" />
                                    <div className="h-2 rounded bg-gray-200 w-5/6" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/80" />
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">{tpl.name}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{tpl.desc}</p>
                                        </div>
                                        <Link to="/build" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap">Use →</Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link to="/build" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition-colors shadow-sm hover:shadow-md hover:shadow-indigo-200">
                            Start Building <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">CV</div>
                        <span className="font-semibold text-white font-outfit">BuilderPro</span>
                    </div>
                    <p className="text-gray-500">Created by <span className="text-white font-medium">Prem (प्रेम)</span></p>
                    <div className="flex gap-6">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#templates" className="hover:text-white transition-colors">Templates</a>
                        <Link to="/build" className="hover:text-white transition-colors">Builder</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
