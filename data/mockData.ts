export interface Degree {
    type?: 'Major' | 'Minor';
    name: string;
    concentration?: string;
    creditsCompleted: number;
    creditsRequired: number;
}

export interface UserData {
    primaryDegree: Degree;
    additionalDegree?: Degree;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    cgpa: number | null;
    data: UserData;
}

export const users: User[] = [
    {
        id: 39429183,
        name: 'Mark Houston',
        email: 'markh@cit.edu',
        password: 'markh123',
        cgpa: null,
        data: {
            primaryDegree: {
                name: 'Computer Science',
                creditsCompleted: 0,
                creditsRequired: 120,
            },
        },
    },
    {
        id: 13849131,
        name: 'Nolan Rockwell',
        email: 'nolanr@cit.edu',
        password: 'nolanr123',
        cgpa: 3.8,
        data: {
            primaryDegree: {
                name: 'Software Engineering',
                creditsCompleted: 45,
                creditsRequired: 90,
            },
            additionalDegree: {
                type: 'Major',
                name: 'Data Science',
                concentration: 'Machine Learning',
                creditsCompleted: 30,
                creditsRequired: 90,
            },
        },
    },
    {
        id: 95281937,
        name: 'Angela Wright',
        email: 'angelaw@cit.edu',
        password: 'angelaw123',
        cgpa: 3.5,
        data: {
            primaryDegree: {
                name: 'Computer Science',
                creditsCompleted: 90,
                creditsRequired: 120,
            },
            additionalDegree: {
                type: 'Minor',
                name: 'Mathematics',
                creditsCompleted: 15,
                creditsRequired: 60,
            },
        },
    }
];