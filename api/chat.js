export default async function handler(req, res) {
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
                model: 'llama3-8b-8192',
                messages: [
                    {
                        role: 'system',
                        content: `Contexto documentado:\n${contexto || ''}`
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ]
            })
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error('Groq API Error:', errData);
            return res.status(response.status).json({ error: errData });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}