export type Task = {
    id: number;
    deadline: Date;
    description?: string;
    group?: string;
    isDone: boolean;
    priority?: Priority;
    progress?: number;
    title: string;
};

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
};
