export type Task = {
    id: string;
    text: string;
    description?: string;
    isComplete: boolean;
    deadline: Date;
    group?: string;
};
