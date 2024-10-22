import { Task } from "../types";

export const createGroup = async (title: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title }),
    });
    return response.json();
}

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

export const deleteGroup = async (title: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/groups/${title}`, {
        method: 'DELETE',
        headers: {
            'authorization': `${sessionStorage.getItem('token')}`,
        },
    });
    return response.json();
}

export const deleteTask = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `${sessionStorage.getItem('token')}`,
        },
    });
    return response.json();
}

export const fetchGroups = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/groups`, {
        headers: {
            'authorization': `${sessionStorage.getItem('token')}`,
        },
    });
    return response.json();
}

export const fetchTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
        headers: {
            'authorization': `${sessionStorage.getItem('token')}`,
        },
    });
    return response.json();
}

export const updateTask = async (id: number, task: Task) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
    });
    return response.json();
}
