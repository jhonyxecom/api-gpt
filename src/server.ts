import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const fastify = Fastify();

const API_KEY = process.env.API_KEY;

fastify.addHook('onRequest', async (request, reply) => {
    if (request.headers['x-api-key'] !== API_KEY) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
});

fastify.register(fastifyCors, {
    origin: '*',
});

fastify.post('/api/chat', async (request, reply) => {
    try {
        const { messages }: any = request.body;

        const payload = {
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `Preciso que crie um funil para treinamento de cachorro seguindo a estrutura do JSON abaixo apenas não mude o "ownerId": "cm0iw1p230008ew1fhnpjjzsp", nome, slug, e mantenha a estrutura do JSON. Além disso, inclua o módulo text em todas as etapas, não apenas na primeira, e a quantidade de etapas deve ser de 5 a 10.
        
        {
          "funnel": {
            "title": "Funil de Treinamento para Pets",
            "status": "1",
            "slug": "pet-treinamento",
            "ownerId": "cm0iw1p230008ew1fhnpjjzsp",
            "flows": [
              {
                "name": "Fluxo de Treinamento para Pets",
                "steps": [
                  {
                    "title": "Qual é a principal característica que você procura em um treinamento para seu pet?",
                    "position": 1,
                    "modules": [
                      {
                        "type": "text",
                        "settings": {
                          "type": "1",
                          "title": "Conte-nos mais sobre o que você espera do treinamento.",
                          "content": "",
                          "fontSize": "text-2xl",
                          "fontType": "font-extrabold",
                          "fontColor": "#1c1c1c",
                          "description": "<p>Descreva qual aspecto do comportamento do seu pet você gostaria de melhorar ou treinar.</p>"
                        }
                      },
                      {
                        "type": "question",
                        "settings": {
                          "type": "1",
                          "color": "#000000",
                          "border": "#dbdbdb",
                          "background": "#ffffff",
                          "activecolor": "#000000",
                          "activebackground": "#e6e6e6",
                          "options": [
                            { "text": "Obediência", "emoji": "🐾" },
                            { "text": "Socialização", "emoji": "🤝" },
                            { "text": "Agilidade", "emoji": "🏃‍♂️" },
                            { "text": "Redução de Ansiedade", "emoji": "😌" }
                          ],
                          "multiSelect": false
                        }
                      },
                      {
                        "type": "button",
                        "settings": {}
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
        `
                },
                {
                    role: 'user',
                    content: `Preciso que crie um funil para o nicho de emagrecimento seguindo a estrutura do JSON abaixo apenas não mude o "ownerId": "cm0iw1p230008ew1fhnpjjzsp". Nomeie tudo, nome, slug, e mantenha a estrutura do JSON. Além disso, inclua o módulo text em todas as etapas, não apenas na primeira, e a quantidade de etapas deve ser de 5 a 10.`
                }
            ],
            temperature: 0.7,
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Certifique-se de que a chave API está configurada
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
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
