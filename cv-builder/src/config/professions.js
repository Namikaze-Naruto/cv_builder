export const initialPersonalInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
    location: 'San Francisco, CA',
    photoUrl: '', // Optional profile photo
    summary: 'Experienced professional with a track record of delivering high-quality results.'
};

const createSection = (id, type, title, items = []) => ({
    id,
    type, // e.g., 'education', 'experience' 
    title, // Display name like 'Work Experience'
    items,
});

// Common initial items for testing
const sampleExperience = {
    id: 'exp-1',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New York, NY',
    startDate: 'Jan 2020',
    endDate: 'Present',
    description: 'Developed scalable microservices using Node.js and React. Improved API response time by 40%.'
};

const sampleEducation = {
    id: 'edu-1',
    degree: 'B.S. Computer Science',
    institution: 'State University',
    location: 'Boston, MA',
    startDate: 'Sep 2016',
    endDate: 'May 2020',
    description: 'Graduated with Honors. Minor in Mathematics.',
    gpa: '3.8/4.0'
};

const sampleProject = {
    id: 'proj-1',
    title: 'E-commerce Platform',
    technologies: 'React, Node.js, MongoDB',
    link: 'github.com/johndoe/ecommerce',
    year: '2022',
    description: 'Built a full-stack e-commerce application processing $10k+ in monthly transactions.'
};

const sampleSkill = {
    id: 'skill-1',
    category: 'Languages',
    skills: 'JavaScript, TypeScript, Python, HTML/CSS'
};

// Profession Presets map
export const initialSections = {
    General: [
        createSection('sec-1', 'summary', 'Professional Summary', []),
        createSection('sec-2', 'experience', 'Experience', [sampleExperience]),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill])
    ],
    "Software Engineer (Frontend)": [
        createSection('sec-1', 'summary', 'Professional Summary', []),
        createSection('sec-4', 'skills', 'Technical Skills', [{ id: 's-1', category: 'Frontend', skills: 'React, Vue, TypeScript, TailwindCSS, Webpack' }]),
        createSection('sec-2', 'experience', 'Professional Experience', [
            {
                id: 'e-1', role: 'Frontend Engineer', company: 'Tech Startup', location: 'Remote',
                startDate: '2021', endDate: 'Present',
                description: 'Led the migration of legacy Angular app to React, decreasing bundle size by 30% and improving Core Web Vitals.'
            }
        ]),
        createSection('sec-5', 'projects', 'Projects', [sampleProject]),
        createSection('sec-3', 'education', 'Education', [sampleEducation])
    ],
    "Software Engineer (Backend)": [
        createSection('sec-1', 'summary', 'Professional Summary', []),
        createSection('sec-4', 'skills', 'Technical Skills', [{ id: 's-1', category: 'Backend', skills: 'Python, Go, Node.js, PostgreSQL, Docker, AWS' }]),
        createSection('sec-2', 'experience', 'Professional Experience', [
            {
                id: 'e-1', role: 'Backend Engineer', company: 'Enterprise Inc', location: 'New York, NY',
                startDate: '2020', endDate: 'Present',
                description: 'Designed internal load-balancing microservices in Go, handling 15k+ concurrent requests per second.'
            }
        ]),
        createSection('sec-3', 'education', 'Education', [sampleEducation])
    ],
    "Data Scientist / Analyst": [
        createSection('sec-1', 'summary', 'Summary', []),
        createSection('sec-4', 'skills', 'Tools & Languages', [{ id: 's-1', category: 'Data', skills: 'Python, R, SQL, Pandas, Scikit-learn, Tableau' }]),
        createSection('sec-2', 'experience', 'Experience', []),
        createSection('sec-5', 'projects', 'Data Projects', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation])
    ],
    "UX/UI Designer": [
        createSection('sec-1', 'summary', 'Design Philosophy', []),
        createSection('sec-2', 'experience', 'Work Experience', []),
        createSection('sec-5', 'projects', 'Case Studies', []),
        createSection('sec-4', 'skills', 'Design Tools', [{ id: 's-1', category: 'Software', skills: 'Figma, Sketch, Adobe Creative Suite, Webflow' }]),
        createSection('sec-3', 'education', 'Education', [])
    ],
    "Investment Banking / Finance": [
        createSection('sec-1', 'summary', 'Executive Summary', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-2', 'experience', 'Professional Experience', []),
        createSection('sec-4', 'skills', 'Core Competencies', [{ id: 's-1', category: 'Finance', skills: 'Financial Modeling, Valuation, DCF Analysis, Excel (Advanced)' }])
    ],
    "Marketing / SEO": [
        createSection('sec-1', 'summary', 'Summary', []),
        createSection('sec-2', 'experience', 'Marketing Experience', []),
        createSection('sec-5', 'projects', 'Campaigns', []),
        createSection('sec-4', 'skills', 'Marketing Tools', [{ id: 's-1', category: 'Tools', skills: 'Google Analytics, Ahrefs, SEMrush, HubSpot, Mailchimp' }]),
        createSection('sec-3', 'education', 'Education', [])
    ],
    "Research / Academic": [
        createSection('sec-1', 'summary', 'Academic Summary', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-6', 'research', 'Research Experience', []),
        createSection('sec-7', 'publications', 'Publications', []),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill])
    ],
    "Student / Entry Level": [
        createSection('sec-1', 'summary', 'Objective', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-5', 'projects', 'Academic Projects', [sampleProject]),
        createSection('sec-2', 'experience', 'Leadership & Extracurriculars', []),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill])
    ]
};
