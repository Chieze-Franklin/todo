import { Task } from '../types';
import ProteusAI from '@proteus-ai/sdk';

const proteus = new ProteusAI({
    apiKey: '67172e91180c01de9d185cd5',
});
proteus.connected(() => {
    console.log('Connected to ProteusAI');
});

let conversation = await proteus.conversations.create({ characterId: '67172872180c01de9d185cce' });

export const createTaskWithAI = async (prompt: string, callback: (task: Task) => void) => {
    try {
        // if (!proteus.isConnected) {
        //     console.log('ProteusAI is not connected');
        //     throw new Error('ProteusAI is not connected');
        // }
        if (!conversation) {
            conversation = await proteus.conversations.create({ characterId: '67172872180c01de9d185cce' });
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