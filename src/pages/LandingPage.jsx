import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Target, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-inter">
            {/* Navigation */}
            <nav className="border-b bg-white border-gray-100 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                                CV
                            </div>
                            <span className="font-bold text-gray-900 tracking-tight text-xl">Builder<span className="text-indigo-600">Pro</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
                            <a href="#templates" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Templates</a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Log in</button>
                            <Link to="/build" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                                Build My Resume
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white pb-16 pt-20 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40 border-b border-gray-100">
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                </div>
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
                        <Link to="/build" className="rounded-md bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                            Create Resume for Free
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">No credit card required. Free PDF downloads included.</p>
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
                                    What you see is exactly what you get. Drag and drop sections and watch your resume update in real-time.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
