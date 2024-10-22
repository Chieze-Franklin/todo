import { Task } from "../types";

export const createTask = async (task: Task) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
    });
    return response.json();
}