module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userMessage, contexto } = req.body || {};

    if (!userMessage) {
        return res.status(400).json({ error: 'Missing userMessage' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-safeguard-20b',
                messages: [
                    {
                        role: 'system',
                        content: `Eres el asistente virtual BICAR-EDU. Responde las preguntas de los usuarios basándote en la información provista en este contexto:\n\n${contexto || ''}`
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.5,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error('Groq Error:', errData);
            return res.status(response.status).json({ error: errData });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};