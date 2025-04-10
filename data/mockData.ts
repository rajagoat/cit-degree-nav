// Expanded mock data with detailed course structure, descriptions, prerequisites, and completed courses

export interface Course {
    code: string
    name: string
    description: string
    prerequisites?: string[]
}

export interface DegreeRequirements {
    type: "Major" | "Minor" | "Concentration"
    required: string[]
    electives: string[]
}

export interface Degree {
    type?: "Major" | "Minor" | "Concentration"
    name: string
    concentration?: string
    creditsCompleted: number
    creditsRequired: number
}

export interface CompletedCourse {
    code: string
    term: string
    grade: string
    instructor: string
}

export interface UserData {
    primaryDegree: Degree
    additionalDegree?: Degree
    completedCourses?: CompletedCourse[]
    recommendedCourses?: string[]
}

export interface User {
    id: number
    name: string
    email: string
    password: string
    cgpa: number | null
    data: UserData
}

// ---------- Courses Array (66 Courses) -------------
// CS Courses (15) - Distribution: 4 (100-level), 5 (200-level), 4 (300-level), 2 (400-level)
export const courses: Course[] = [
    // CS 100-level
    {
        code: "CS101",
        name: "Introduction to Programming",
        description: "Learn the fundamentals of programming using a modern language.",
    },
    {
        code: "CS102",
        name: "Data Structures",
        description: "Explore basic data structures such as arrays, lists, and stacks.",
        prerequisites: ["CS101"],
    },
    {
        code: "CS103",
        name: "Basic Algorithms",
        description: "Introduction to algorithmic problem solving.",
        prerequisites: ["CS101"],
    },
    {
        code: "CS104",
        name: "Computer Systems Fundamentals",
        description: "Understand computer organization and fundamental systems concepts.",
    },
    // CS 200-level
    {
        code: "CS201",
        name: "Advanced Programming",
        description: "Develop advanced programming techniques.",
        prerequisites: ["CS101", "CS102"],
    },
    {
        code: "CS202",
        name: "Object-Oriented Programming",
        description: "Deep dive into OOP concepts and design.",
        prerequisites: ["CS101"],
    },
    {
        code: "CS203",
        name: "Software Engineering",
        description: "Introduction to software development processes and methodologies.",
        prerequisites: ["CS101"],
    },
    {
        code: "CS204",
        name: "Database Systems",
        description: "Study relational databases and SQL.",
        prerequisites: ["CS101"],
    },
    {
        code: "CS205",
        name: "Networking & Distributed Systems",
        description: "Learn core concepts in networking and distributed computing.",
        prerequisites: ["CS104"],
    },
    // CS 300-level
    {
        code: "CS301",
        name: "Artificial Intelligence",
        description: "Explore foundational AI techniques.",
        prerequisites: ["CS201", "CS203"],
    },
    {
        code: "CS302",
        name: "Machine Learning",
        description: "Introductory course in machine learning algorithms.",
        prerequisites: ["CS301"],
    },
    {
        code: "CS303",
        name: "Computer Graphics",
        description: "Study the fundamentals of rendering and graphics pipelines.",
        prerequisites: ["CS103"],
    },
    {
        code: "CS304",
        name: "Parallel Computing",
        description: "Techniques for parallel processing and performance improvement.",
        prerequisites: ["CS205", "CS102"],
    },
    // CS 400-level
    {
        code: "CS401",
        name: "Compiler Design",
        description: "Learn the principles behind compilers and language translation.",
        prerequisites: ["CS203", "CS102"],
    },
    {
        code: "CS402",
        name: "Capstone Project in CS",
        description: "Integrative project synthesizing CS concepts.",
        prerequisites: ["CS301", "CS304"],
    },

    // SE Courses (10) - Distribution: 3 (100-level), 3 (200-level), 2 (300-level), 2 (400-level)
    {
        code: "SE101",
        name: "Introduction to Software Engineering",
        description: "Overview of the software development lifecycle.",
    },
    {
        code: "SE102",
        name: "Agile Methodologies",
        description: "Learn agile frameworks and iterative development.",
        prerequisites: ["SE101"],
    },
    {
        code: "SE103",
        name: "Design Patterns",
        description: "Explore recurring software design solutions.",
        prerequisites: ["SE101"],
    },
    {
        code: "SE201",
        name: "Requirements Engineering",
        description: "Techniques for gathering and analyzing requirements.",
        prerequisites: ["SE101"],
    },
    {
        code: "SE202",
        name: "Software Testing & QA",
        description: "Principles and practices for quality assurance.",
        prerequisites: ["SE101"],
    },
    {
        code: "SE203",
        name: "DevOps Practices",
        description: "Understand continuous integration and deployment.",
        prerequisites: ["SE102"],
    },
    {
        code: "SE301",
        name: "Project Management",
        description: "Learn to manage software projects effectively.",
        prerequisites: ["SE201", "SE202"],
    },
    {
        code: "SE302",
        name: "Embedded Systems Design",
        description: "Develop software for hardware-constrained environments.",
        prerequisites: ["SE101", "CS104"],
    },
    {
        code: "SE401",
        name: "Mobile App Development",
        description: "Create applications for mobile platforms.",
        prerequisites: ["SE102", "SE203"],
    },
    {
        code: "SE402",
        name: "Human-Computer Interaction",
        description: "Advanced study of user interface design and evaluation.",
        prerequisites: ["SE103", "SE201"],
    },

    // DS Courses (10) - Distribution: 3 (100-level), 4 (200-level), 2 (300-level), 1 (400-level)
    { code: "DS101", name: "Introduction to Data Science", description: "Overview of core data science concepts." },
    {
        code: "DS102",
        name: "Data Analysis Techniques",
        description: "Statistical techniques for analyzing data.",
        prerequisites: ["DS101"],
    },
    {
        code: "DS103",
        name: "Statistics for Data Science",
        description: "Fundamentals of statistics applied to data.",
        prerequisites: ["DS101"],
    },
    {
        code: "DS201",
        name: "Data Mining",
        description: "Techniques for discovering patterns in large datasets.",
        prerequisites: ["DS102"],
    },
    {
        code: "DS202",
        name: "Predictive Modeling",
        description: "Learn to build models forecasting future events.",
        prerequisites: ["DS103"],
    },
    {
        code: "DS203",
        name: "Data Visualization",
        description: "Techniques to create visual representations of data.",
        prerequisites: ["DS102"],
    },
    {
        code: "DS204",
        name: "Big Data Analytics",
        description: "Methods for processing and analyzing huge datasets.",
        prerequisites: ["DS201", "DS203"],
    },
    {
        code: "DS301",
        name: "Advanced Machine Learning",
        description: "In-depth study of modern ML algorithms.",
        prerequisites: ["DS202", "DS203"],
    },
    {
        code: "DS302",
        name: "Data Ethics & Privacy",
        description: "Examine ethical challenges and privacy issues in data.",
        prerequisites: ["DS101"],
    },
    {
        code: "DS401",
        name: "Capstone in Data Science",
        description: "Final integrative project in data science.",
        prerequisites: ["DS204", "DS301"],
    },

    // Mathematics Courses (10) - Typically 100-level with some 200-level elements
    { code: "MATH101", name: "Calculus I", description: "Introduction to differential and integral calculus." },
    {
        code: "MATH102",
        name: "Calculus II",
        description: "Techniques of integration, series, and multivariable calculus.",
        prerequisites: ["MATH101"],
    },
    {
        code: "MATH103",
        name: "Linear Algebra",
        description: "Study of vector spaces, matrices, and linear transformations.",
    },
    {
        code: "MATH104",
        name: "Discrete Mathematics",
        description: "Fundamentals of logic, combinatorics, and graph theory.",
    },
    {
        code: "MATH105",
        name: "Probability",
        description: "Basic probability theory and random variables.",
        prerequisites: ["MATH101"],
    },
    {
        code: "MATH106",
        name: "Statistics",
        description: "Statistical inference and data analysis methods.",
        prerequisites: ["MATH105"],
    },
    {
        code: "MATH107",
        name: "Differential Equations",
        description: "Methods for solving ordinary differential equations.",
        prerequisites: ["MATH101"],
    },
    {
        code: "MATH108",
        name: "Numerical Methods",
        description: "Approximation techniques for solving mathematical problems.",
        prerequisites: ["MATH102"],
    },
    {
        code: "MATH109",
        name: "Mathematical Modeling",
        description: "Formulating and solving real-world problems mathematically.",
        prerequisites: ["MATH103"],
    },
    {
        code: "MATH110",
        name: "Optimization",
        description: "Techniques for finding optimal solutions in various contexts.",
        prerequisites: ["MATH104"],
    },

    // English/Breadth Courses (15) - 100-level courses, no prerequisites
    { code: "ENG101", name: "English Composition", description: "Develop effective academic writing skills." },
    { code: "ENG102", name: "Technical Writing", description: "Learn to write clear technical documents." },
    {
        code: "ENG103",
        name: "Communication in Technology",
        description: "Strategies for conveying technical information.",
    },
    { code: "ENG104", name: "Critical Thinking", description: "Enhance reasoning and analytical skills." },
    { code: "ENG105", name: "Public Speaking", description: "Develop confident oral communication skills." },
    { code: "ENG106", name: "Research Methods", description: "Learn methods for academic research and analysis." },
    { code: "ENG107", name: "Creative Writing", description: "Explore creative expression and narrative techniques." },
    { code: "ENG108", name: "World Literature", description: "Examine influential literary works globally." },
    {
        code: "ENG109",
        name: "Professional Communication",
        description: "Improve communication skills in professional settings.",
    },
    { code: "ENG110", name: "Intercultural Communication", description: "Understand communication across cultures." },
    { code: "ENG111", name: "Media Studies", description: "Analyze media trends and their societal impact." },
    { code: "ENG112", name: "Journalism", description: "Study the fundamentals of news reporting and ethics." },
    { code: "ENG113", name: "Digital Media", description: "Explore content creation for digital platforms." },
    { code: "ENG114", name: "Ethics in Communication", description: "Examine ethical issues in modern communication." },
    { code: "ENG115", name: "Advanced Rhetoric", description: "Master persuasive communication techniques." },

    // Machine Learning Courses (6) - ML Concentration (upper-level)
    {
        code: "ML401",
        name: "Foundations of Machine Learning",
        description: "Core ML concepts and introductory algorithms.",
        prerequisites: ["CS302", "DS301"],
    },
    {
        code: "ML402",
        name: "Advanced Machine Learning Techniques",
        description: "In-depth study of advanced ML methods.",
        prerequisites: ["ML401", "MATH105"],
    },
    {
        code: "ML403",
        name: "Deep Learning Fundamentals",
        description: "Fundamentals of neural networks and deep architectures.",
        prerequisites: ["ML401"],
    },
    {
        code: "ML404",
        name: "Reinforcement Learning",
        description: "Explore decision-making models using rewards.",
        prerequisites: ["ML401", "MATH105"],
    },
    {
        code: "ML405",
        name: "Probabilistic Machine Learning",
        description: "Study probabilistic methods and inference in ML.",
        prerequisites: ["ML402", "MATH109"],
    },
    {
        code: "ML406",
        name: "Machine Learning Applications",
        description: "Practical applications of ML in real-world scenarios.",
        prerequisites: ["ML403", "MATH108"],
    },
]

// Helper function to verify all course codes exist in the courses array
const validateCourseCode = (code: string): boolean => {
    return courses.some((course) => course.code.trim().toLowerCase() === code.trim().toLowerCase())
}

// Update the degree requirements to match the expected course counts
// Computer Science Major: 40 classes (adjust required/electives to total 40)
// Mathematics Minor: 10 classes (adjust required/electives to total 10)
// Machine Learning Concentration: 6 classes (4 required, 2 electives)

// Update the degreeRequirements object to ensure proper course counts
export const degreeRequirements: Record<string, DegreeRequirements> = {
    "Computer Science": {
        type: "Major",
        required: [
            "CS101",
            "CS102",
            "CS103",
            "CS104",
            "MATH101",
            "MATH102",
            "ENG101",
            "ENG102",
            "SE101",
            "DS101",
            "ENG103",
            "MATH103",
            "CS201",
            "CS202",
            "CS203",
            "CS204",
            "CS205",
            "DS102",
            "DS103",
            "MATH104",
        ],
        electives: [
            "CS301",
            "CS302",
            "CS303",
            "CS304",
            "CS401",
            "CS402",
            "SE103",
            "SE201",
            "SE202",
            "SE203",
            "SE301",
            "DS201",
            "DS202",
            "DS203",
            "DS204",
            "MATH105",
            "ENG104",
            "ENG105",
            "ENG106",
            "ENG107",
        ],
    },
    "Software Engineering": {
        type: "Major",
        required: [
            "SE101",
            "SE102",
            "SE103",
            "SE201",
            "SE202",
            "SE203",
            "SE301",
            "CS101",
            "CS102",
            "CS103",
            "ENG101",
            "ENG102",
            "MATH101",
            "MATH102",
            "DS101",
            "DS102",
            "SE302",
            "SE401",
            "SE402",
            "ENG103",
        ],
        electives: [
            "CS104",
            "CS201",
            "CS202",
            "CS203",
            "CS204",
            "CS205",
            "CS301",
            "CS302",
            "ENG104",
            "ENG105",
            "ENG106",
            "ENG107",
            "DS103",
            "DS201",
            "DS202",
            "MATH103",
            "MATH104",
            "MATH105",
            "CS303",
            "CS304",
        ],
    },
    "Data Science": {
        type: "Major",
        required: [
            "DS101",
            "DS102",
            "DS103",
            "DS201",
            "DS202",
            "DS203",
            "DS204",
            "DS301",
            "CS101",
            "CS102",
            "MATH101",
            "MATH102",
            "ENG101",
            "ENG102",
            "SE101",
            "SE102",
            "DS302",
            "DS401",
            "ENG103",
            "MATH103",
        ],
        electives: [
            "CS103",
            "CS104",
            "CS201",
            "CS202",
            "CS203",
            "CS204",
            "CS301",
            "CS302",
            "ML401",
            "ML402",
            "ML403",
            "ML404",
            "ML405",
            "ENG104",
            "ENG105",
            "ENG106",
            "MATH104",
            "MATH105",
            "SE103",
            "SE201",
        ],
    },
    Mathematics: {
        type: "Minor",
        required: ["MATH101", "MATH102", "MATH103", "MATH104", "MATH105"],
        electives: ["MATH106", "MATH107", "MATH108", "MATH109", "MATH110"],
    },
    "Machine Learning": {
        type: "Concentration",
        required: ["ML401", "ML402", "ML403", "ML404"],
        electives: ["ML405", "ML406"],
    },
}

// Update Angela's data to ensure consistency with degree requirements
export const users: User[] = [
    {
        id: 39429183,
        name: "Mark Houston",
        email: "markh@cit.edu",
        password: "markh123",
        cgpa: null,
        data: {
            primaryDegree: {
                name: "Computer Science",
                creditsCompleted: 0,
                creditsRequired: 120,
            },
            completedCourses: [],
            recommendedCourses: [
                'CS101',
                'CS104',
                'ENG101',
                'ENG102',
                'MATH101',
            ]
        },
    },
    {
        id: 13849131,
        name: "Nolan Rockwell",
        email: "nolanr@cit.edu",
        password: "nolanr123",
        cgpa: 3.8,
        data: {
            primaryDegree: {
                name: "Software Engineering",
                creditsCompleted: 75,
                creditsRequired: 120,
            },
            additionalDegree: {
                type: "Major",
                name: "Data Science",
                concentration: "Machine Learning",
                creditsCompleted: 57,
                creditsRequired: 132,
            },
            // Nolan: 25 completed courses (courses must be valid codes from courses array)
            completedCourses: [
                { code: "SE101", term: "Fall 2020", grade: "A", instructor: "Emma Towlson" },
                { code: "SE102", term: "Winter 2021", grade: "A-", instructor: "James Kim" },
                { code: "SE103", term: "Fall 2021", grade: "B+", instructor: "Sarah Lim" },
                { code: "CS101", term: "Fall 2020", grade: "A-", instructor: "David Tran" },
                { code: "CS102", term: "Winter 2021", grade: "B", instructor: "Mei Wong" },
                { code: "CS103", term: "Winter 2021", grade: "B+", instructor: "Alice Johnson" },
                { code: "CS201", term: "Fall 2021", grade: "A", instructor: "Michael Brown" },
                { code: "CS202", term: "Winter 2022", grade: "A-", instructor: "Olivia Green" },
                { code: "CS203", term: "Winter 2022", grade: "B+", instructor: "William Smith" },
                { code: "CS204", term: "Fall 2022", grade: "A", instructor: "Sophia Davis" },
                { code: "CS205", term: "Winter 2022", grade: "B", instructor: "Liam Garcia" },
                { code: "CS301", term: "Fall 2022", grade: "A-", instructor: "Isabella Martinez" },
                { code: "CS302", term: "Winter 2023", grade: "B+", instructor: "Mason Rodriguez" },
                { code: "CS303", term: "Winter 2023", grade: "A", instructor: "Amelia Wilson" },
                { code: "CS304", term: "Fall 2023", grade: "A-", instructor: "Evelyn Moore" },
                { code: "CS401", term: "Winter 2024", grade: "B+", instructor: "Harper Taylor" },
                { code: "CS402", term: "Winter 2024", grade: "A", instructor: "Evelyn Moore" },
                { code: "DS101", term: "Fall 2020", grade: "B+", instructor: "Benjamin Anderson" },
                { code: "DS102", term: "Winter 2021", grade: "B", instructor: "Mia Thomas" },
                { code: "DS103", term: "Fall 2021", grade: "A-", instructor: "Lucas Jackson" },
                { code: "DS201", term: "Winter 2022", grade: "B", instructor: "Charlotte White" },
                { code: "DS202", term: "Winter 2022", grade: "A-", instructor: "Ava Harris" },
                { code: "ML401", term: "Fall 2022", grade: "A", instructor: "Mason Martin" },
                { code: "ML402", term: "Winter 2023", grade: "A-", instructor: "Evelyn Thompson" },
                { code: "DS204", term: "Fall 2021", grade: "B+", instructor: "David Tran" },
            ],
            recommendedCourses: [
                'SE201',
                'SE202',
                'SE203',
                'ENG101',
                'CS104',
            ]
        },
    },
    {
        id: 95281937,
        name: "Angela Wright",
        email: "angelaw@cit.edu",
        password: "angelaw123",
        cgpa: 3.5,
        data: {
            primaryDegree: {
                name: "Computer Science",
                creditsCompleted: 90,
                creditsRequired: 120,
            },
            additionalDegree: {
                type: "Minor",
                name: "Mathematics",
                creditsCompleted: 15,
                creditsRequired: 30,
            },
            // Angela: 30 completed courses - Updated to ensure consistency with degree requirements
            completedCourses: [
                // Computer Science Major Required Courses (15 of 20)
                { code: "CS101", term: "Fall 2019", grade: "A-", instructor: "Emma Towlson" },
                { code: "CS102", term: "Winter 2020", grade: "A", instructor: "James Kim" },
                { code: "CS103", term: "Winter 2020", grade: "A-", instructor: "Alice Johnson" },
                { code: "CS104", term: "Fall 2020", grade: "B+", instructor: "David Tran" },
                { code: "CS201", term: "Winter 2021", grade: "B", instructor: "Mei Wong" },
                { code: "CS202", term: "Winter 2021", grade: "B+", instructor: "Alice Johnson" },
                { code: "CS203", term: "Fall 2021", grade: "A", instructor: "Michael Brown" },
                { code: "CS204", term: "Winter 2022", grade: "A-", instructor: "Olivia Green" },
                { code: "CS205", term: "Winter 2022", grade: "B+", instructor: "William Smith" },
                { code: "MATH101", term: "Fall 2019", grade: "A-", instructor: "Michael Brown" },
                { code: "MATH102", term: "Winter 2020", grade: "A", instructor: "Alice Johnson" },
                { code: "MATH103", term: "Winter 2020", grade: "A-", instructor: "Mei Wong" },
                { code: "ENG101", term: "Fall 2019", grade: "A-", instructor: "Michael Brown" },
                { code: "ENG102", term: "Winter 2020", grade: "A", instructor: "Alice Johnson" },
                { code: "ENG103", term: "Winter 2020", grade: "A-", instructor: "Mei Wong" },

                // Computer Science Major Elective Courses (10 of 20)
                { code: "CS301", term: "Fall 2022", grade: "A", instructor: "Sophia Davis" },
                { code: "CS302", term: "Winter 2023", grade: "A-", instructor: "Liam Garcia" },
                { code: "CS303", term: "Winter 2023", grade: "B+", instructor: "Isabella Martinez" },
                { code: "CS304", term: "Fall 2023", grade: "A", instructor: "Mason Rodriguez" },
                { code: "CS401", term: "Winter 2024", grade: "A-", instructor: "Amelia Wilson" },
                { code: "CS402", term: "Winter 2024", grade: "B+", instructor: "Evelyn Moore" },
                { code: "MATH104", term: "Fall 2020", grade: "B+", instructor: "Olivia Green" },
                { code: "MATH105", term: "Winter 2021", grade: "B", instructor: "William Smith" },
                { code: "ENG104", term: "Fall 2020", grade: "B+", instructor: "Olivia Green" },
                { code: "ENG105", term: "Winter 2021", grade: "B", instructor: "William Smith" },

                // Mathematics Minor Required Courses (5 of 5) - Already counted above
                // MATH101, MATH102, MATH103, MATH104, MATH105

                // Mathematics Minor Elective Courses (0 of 5)

                // Additional courses
                { code: "SE101", term: "Fall 2020", grade: "B+", instructor: "David Tran" },
                { code: "SE102", term: "Fall 2020", grade: "A+", instructor: "David Tran" },
                { code: "DS101", term: "Fall 2019", grade: "A", instructor: "Harper Taylor" },
                { code: "DS102", term: "Winter 2020", grade: "A-", instructor: "Benjamin Anderson" },
                { code: "DS103", term: "Winter 2020", grade: "B+", instructor: "Mia Thomas" },
                { code: "DS201", term: "Fall 2020", grade: "B", instructor: "Lucas Jackson" },
            ],
            recommendedCourses: [
                'SE103',
                'SE201',
                'DS202',
                'DS203',
                'ENG106',
            ]
        },
    },
]  