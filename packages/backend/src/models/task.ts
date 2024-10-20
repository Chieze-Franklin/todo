export interface Task {
    id: string;
    text: string;
    deadline: Date;
    description?: string;
    group?: string;
    isComplete: boolean;
}