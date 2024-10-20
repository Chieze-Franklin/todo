export type Task = {
    id: string;
    text: string;
    isComplete: boolean;
    date: Date;
    group?: string;
};
