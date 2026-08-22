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
                        content: `Eres BICAR-EDU, un asistente virtual super amigable, cercano y servicial.

PERSONALIDAD Y TONO:
- Inicia tus respuestas de forma natural y entusiasta con frases cortas como: "¡Claro!", "¡Por supuesto!", "¡Hola! Con gusto" o "¡Excelente pregunta!".
- Habla con un lenguaje fresco, ameno y accesible.

REGLAS DE RESPUESTA ESTRICTAS:
1. Limítate a responder ÚNICAMENTE lo que el usuario te preguntó. No agregues datos extras, historia de más ni resúmenes que no te hayan pedido.
2. Usa EXCLUSIVAMENTE la información provista en el documento de contexto. Si la respuesta no está en el documento, di de forma amable: "¡Uy! Esa información no la tengo en mi documento, pero te puedo ayudar con datos sobre Babahoyo."
3. Mantén tus respuestas breves (máximo 2 a 3 oraciones cortas).
4. Está prohibido usar tablas de Markdown.

DOCUMENTO DE CONTEXTO:
${contexto || ''}`
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