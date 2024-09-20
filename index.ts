import axios from 'axios';
import Fastify from 'fastify';

import fastifyCors from '@fastify/cors';

const fastify = Fastify();

const API_KEY = process.env.API_KEY;



fastify.addHook('onRequest', async (request, reply) => {

    if (request.headers['x-api-key'] !== API_KEY) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

})

fastify.register(fastifyCors, {
    origin: '*',
})

fastify.post('/api/chat', async (request, reply) => {
    try {
        const { messages }: any = request.body;

        const payload = {
            model: 'gpt-4o',
            messages,
            temperature: 0.7,
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Certifique-se de que a chave API está configurada
            },
            body: JSON.stringify(payload),
        });

        if (response.data) {
            const data = response.data
            const answer = data.choices[0].message.content;
            const tokens = data.usage?.total_tokens; // Total de tokens usados

            return reply.status(200).send({ answer, tokens });
        } else {
            console.error(`Erro na API GPT: ${response.status}`);
            return reply.status(response.status).send({ error: 'Erro na API OpenAI' });
        }
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: 'Falha ao se comunicar com GPT' });
    }
});

fastify.listen({ host: '0.0.0.0', port: 3001 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
