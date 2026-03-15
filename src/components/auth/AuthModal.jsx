import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured, getSupabase } from '../../lib/supabase';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const configured = isSupabaseConfigured();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!configured) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const sb = getSupabase();
            if (!sb) throw new Error('Supabase client not ready');

            if (mode === 'signup') {
                const { data, error: err } = await sb.auth.signUp({
                    email,
                    password,
                    options: { data: { display_name: name } },
                });
                if (err) throw err;
                setSuccess('Account created! Check your email to confirm.');
                if (data.user && !data.user.identities?.length === 0) {
                    onAuthSuccess?.(data.user);
                }
            } else {
                const { data, error: err } = await sb.auth.signInWithPassword({ email, password });
                if (err) throw err;
                onAuthSuccess?.(data.user);
                onClose();
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!configured) return;
        const sb = getSupabase();
        if (!sb) return;
        await sb.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + '/build' },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 z-10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mode === 'login' ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {mode === 'login' ? 'Sign in to sync your resumes across devices.' : 'Save and access your resumes anywhere.'}
                    </p>
                </div>

                {!configured && (
                    <div className="mb-5 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg flex gap-2 text-sm text-amber-700 dark:text-amber-300">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                            Cloud sync is not configured yet. Add <code className="font-mono text-xs bg-amber-100 dark:bg-amber-900/40 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="font-mono text-xs bg-amber-100 dark:bg-amber-900/40 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your <code className="font-mono text-xs">.env</code> file to enable auth.
                        </span>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg flex gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                disabled={!configured}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            disabled={!configured}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            disabled={!configured}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !configured}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {mode === 'login' ? 'Sign in' : 'Create account'}
                    </button>
                </form>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
                    <div className="relative text-center"><span className="px-3 bg-white dark:bg-gray-900 text-xs text-gray-400">or</span></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={!configured}
                    className="w-full py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    <svg className="w-4 h-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.5 35.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.9l.1-.1 6.2 5.2C37 38.7 44 33 44 24c0-1.3-.1-2.7-.4-3.9z" /></svg>
                    Continue with Google
                </button>

                <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
                    {mode === 'login' ? (
                        <>Don't have an account?{' '}
                            <button onClick={() => { setMode('signup'); setError(''); }} className="text-indigo-600 font-medium hover:underline">Sign up</button>
                        </>
                    ) : (
                        <>Already have an account?{' '}
                            <button onClick={() => { setMode('login'); setError(''); }} className="text-indigo-600 font-medium hover:underline">Sign in</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
