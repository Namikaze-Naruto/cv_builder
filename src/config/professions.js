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
        createSection('sec-1', 'summary', 'Professional Summary', []), // items usually empty for summary, handled in personalInfo or as single text block
        createSection('sec-2', 'experience', 'Experience', [sampleExperience]),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill])
    ],
    Engineering: [
        createSection('sec-1', 'summary', 'Professional Summary', []),
        createSection('sec-4', 'skills', 'Technical Skills', [sampleSkill]),
        createSection('sec-2', 'experience', 'Professional Experience', [sampleExperience]),
        createSection('sec-5', 'projects', 'Projects', [sampleProject]),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
    ],
    Research: [
        createSection('sec-1', 'summary', 'Academic Summary', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-6', 'research', 'Research Experience', []),
        createSection('sec-7', 'publications', 'Publications', []),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill])
    ],
    Medical: [
        createSection('sec-1', 'summary', 'Summary', []),
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-8', 'residency', 'Residency / Clinical Experience', []),
        createSection('sec-9', 'certifications', 'Board Certifications', [])
    ],
    Student: [
        createSection('sec-3', 'education', 'Education', [sampleEducation]),
        createSection('sec-5', 'projects', 'Projects', [sampleProject]),
        createSection('sec-4', 'skills', 'Skills', [sampleSkill]),
        createSection('sec-10', 'achievements', 'Awards & Achievements', []),
    ]
};
