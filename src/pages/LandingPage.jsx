import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Target, CheckCircle, ArrowRight, Zap, Layout, Star } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-inter">
            {/* Navigation */}
            <nav className="border-b bg-white border-gray-100 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
                                CV
                            </div>
                            <span className="font-bold text-gray-900 tracking-tight text-xl">Builder<span className="text-indigo-600">Pro</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Features</a>
                            <a href="#templates" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Templates</a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Pricing</a>
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
                {/* Gradient blob */}
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#818cf8] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                            <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Resume Scoring now live
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6">
                        Land your next job with a <br className="hidden sm:block" /> <span className="text-indigo-600">targeted resume.</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        Create an ATS-friendly, professional resume in under 5 minutes. Paste your target job description and let AI optimize your application to stand out.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/build" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                            Create Resume for Free <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">No credit card required. Free PDF downloads included.</p>
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
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Faster applications</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to get hired
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    Job Targeting Matrix
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Paste the job description and our AI instantly identifies the keywords you're missing to beat the ATS software like Greenhouse and Lever.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    LaTeX-Quality Templates
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Beautiful, professional layouts that never break. Designed precisely for A4 PDF export with perfect margins and crisp typography.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    Smart Resume Scoring
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Get instant feedback on your resume's strength, formatting, and impact metrics before you even apply.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    Live Preview Editor
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    What you see is exactly what you get. Edit fields and watch your resume update in real-time on the right.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div id="templates" className="py-24 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Templates</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pick your style</p>
                        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">All templates are ATS-friendly and export perfectly to PDF. Swap between them anytime — your data stays intact.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'Classic', accent: '#4f46e5', desc: 'Clean, traditional layout. Works for any industry.' },
                            { name: 'Modern', accent: '#0891b2', desc: 'Sidebar layout with a bold header. Great for tech roles.' },
                            { name: 'Minimal', accent: '#16a34a', desc: 'Whitespace-first design. Let your content speak.' },
                        ].map((tpl) => (
                            <div key={tpl.name} className="group rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
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
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link to="/build" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition-colors shadow-sm">
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
                        <span className="font-semibold text-white">BuilderPro</span>
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
