import { Task } from '../types';
import ProteusAI from '@proteus-ai/sdk';

const proteus = new ProteusAI({
    apiKey: import.meta.env.VITE_AI_API_KEY,
});
proteus.connected(() => {
    console.log('Connected to ProteusAI');
});

let conversation = await proteus.conversations.create({ characterId: import.meta.env.VITE_AI_CHARACTER_ID });

export const createTaskWithAI = async (prompt: string, callback: (task: Task) => void) => {
    try {
        if (!conversation) {
            conversation = await proteus.conversations.create({ characterId: import.meta.env.VITE_AI_CHARACTER_ID });
        }
        conversation.on('CHARACTER_MESSAGE_SENT', (message: any) => {
            if (!message.isStreaming) {
                console.log('Conversation ID:', conversation.id);
                console.log('Character message sent:', message.content);
                const task = JSON.parse(message.content.replaceAll("```json", '').replaceAll("```", ''));
                console.log('Task from AI:', task);
                callback(task);
            }
        });
        conversation.send({
            content: prompt,
            type: "TEXT",
        });
    } catch (err) {
        console.log(err);
        const title = prompt.substring(0, prompt.indexOf(".")).trim();
        const description = prompt.substring(prompt.indexOf(".") + 1).trim();

        callback({
            id: Date.now(),
            title,
            description,
            isDone: false,
            deadline: new Date(new Date().setHours(new Date().getHours() + 10))
        })
    }
}