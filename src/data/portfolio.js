export const portfolio = {
    stats: [
        { value: 'Final Year', label: 'Computer Engineering @ VJTI' },
        { value: '3+', label: 'Featured Projects' },
        { value: 'GenAI', label: 'Hands-on Program Work' },
        { value: 'Mumbai', label: 'Based in India' },
    ],
    skills: {
        'Languages & Core': [
            'C++',
            'Python',
            'JavaScript',
            'SQL'
        ],

        'Frontend Engineering': [
            'React.js',
            'Vite',
            'Tailwind CSS',
            'HTML5',
            'CSS3',
            'Responsive Design'
        ],

        'Backend & APIs': [
            'Node.js',
            'Express.js',
            'MongoDB',
            'REST APIs',
            'JWT Authentication',
            'Cloudinary'
        ],

        'AI / ML & GenAI': [
            'Machine Learning',
            'Generative AI',
            'RAG',
            'LLM Integration',
            'Prompt Engineering',
            'LangChain',
            'FAISS',
            'Hugging Face'
        ],

        'Cloud & Developer Tools': [
            'Git',
            'GitHub',
            'Postman',
            'Vercel',
            'Render',
            'VS Code'
        ],
    },
    projects: [{
            name: 'Swiggy RAG System',
            short: 'AI / RAG SYSTEM',
            stack: 'Python · LangChain · FAISS · FLAN-T5 · Streamlit',
            type: 'AI / ML',
            description: 'A financial document intelligence system using Retrieval-Augmented Generation to extract metrics and insights from annual reports with query routing, source highlighting, and hallucination-aware responses.'
        },

        {
            name: 'Smart Hostel MIS',
            short: 'FULL STACK SYSTEM',
            stack: 'React · Node.js · Express · SQLite · JWT',
            type: 'Full Stack',
            description: 'A role-based hostel management platform featuring student management, room allocation, fee tracking, maintenance workflows, analytics dashboards, and JWT-based access control.'
        },

        {
            name: 'JobTrack',
            short: 'CHROME EXTENSION',
            stack: 'JavaScript · Manifest V3 · Chrome APIs',
            type: 'Developer Tool',
            description: 'A local-first Chrome extension that detects job postings, extracts relevant information from career pages, and provides a dashboard to track applications with search, filtering, and status management.'
        },

        {
            name: 'Fake News Thumbnail Detection',
            short: 'MULTIMODAL AI',
            stack: 'Python · PyTorch · CLIP · Streamlit',
            type: 'AI / ML',
            description: 'A multimodal classification system that combines CLIP-based image and text representations with cross-modal fusion to identify whether news thumbnails are associated with fake or real news.'
        },

        {
            name: 'LearnStream',
            short: 'E-LEARNING PLATFORM',
            stack: 'React · Node.js · Express · MongoDB',
            type: 'Full Stack',
            description: 'A collaborative e-learning platform connecting teachers and students through course management, lecture delivery, assignments, enrollment, progress tracking, and peer-to-peer learning.'
        },

        {
            name: 'Quizzzy',
            short: 'QUIZ PLATFORM',
            stack: 'React · Node.js · MongoDB',
            type: 'Full Stack',
            description: 'A JEE-style quiz platform with test creation, AI-assisted question generation, bookmarking, scoring, and separate frontend and backend deployment.'
        }
    ],
    clients: ['Ashley Global Exim', 'VJTI Hostel'],
    contact: {
        Phone: '+91 7499727939',
        email: 'harshgsharma1501@gmail.com',
        location: 'Mumbai, India',
        github: 'https://github.com/harshgsharma1501',
        linkedin: 'https://linkedin.com/in/harsh-sharma-003859280',
    },
};