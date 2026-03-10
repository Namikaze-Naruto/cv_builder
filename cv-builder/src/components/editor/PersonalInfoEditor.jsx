import { useCVStore } from '../../state/useCVStore';
import { CHAR_LIMITS, getCharStatus } from '../../config/onepage';

const PersonalInfoEditor = () => {
    const personalInfo = useCVStore((state) => state.cvData.personalInfo);
    const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);

    const handleChange = (e) => {
        updatePersonalInfo(e.target.name, e.target.value);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="Jane Doe"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={personalInfo.title || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="Software Engineer"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="jane@example.com"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="+1 234 567 890"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="London, UK"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    <input
                        type="url"
                        name="website"
                        value={personalInfo.website}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="janedoe.com"
                    />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="linkedin.com/in/janedoe"
                    />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                    <div className="flex justify-between items-baseline">
                        <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                        <span className={`text-[10px] font-mono ${getCharStatus(personalInfo.summary, CHAR_LIMITS.summary) === 'danger' ? 'text-red-500' :
                                getCharStatus(personalInfo.summary, CHAR_LIMITS.summary) === 'warning' ? 'text-amber-500' : 'text-gray-400'
                            }`}>
                            {(personalInfo.summary || '').length}/{CHAR_LIMITS.summary}
                        </span>
                    </div>
                    <textarea
                        name="summary"
                        value={personalInfo.summary}
                        onChange={handleChange}
                        rows={4}
                        maxLength={CHAR_LIMITS.summary + 50}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm resize-y ${getCharStatus(personalInfo.summary, CHAR_LIMITS.summary) === 'danger' ? 'border-red-300 focus:ring-red-400' :
                                getCharStatus(personalInfo.summary, CHAR_LIMITS.summary) === 'warning' ? 'border-amber-300 focus:ring-amber-400' :
                                    'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                            }`}
                        placeholder="Write a concise 2-3 sentence professional summary (max 300 chars)..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoEditor;
