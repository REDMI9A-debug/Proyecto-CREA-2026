// api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { userMessage, contexto } = req.body;

    if (!userMessage) {
        return res.status(400).json({ error: 'No se recibió ningún mensaje' });
    }

    const payload = {
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: `Eres BICAR-EDU, un asistente virtual hiper-especializado y cerrado exclusivamente al Cantón Babahoyo, provincia de Los Ríos, Ecuador.\n\n[REGLAS CRÍTICAS DE COMPORTAMIENTO]\n1. ÁMBITO GEOGRÁFICO ABSOLUTO: Tu único universo de conocimiento es Babahoyo. Si te preguntan algo ajeno, niégate amablemente diciendo: "Solo respondo sobre el cantón Babahoyo y su patrimonio. ¿En qué te puedo ayudar sobre nuestra ciudad?".\n2. PROHIBICION DE MARCAS: No menciones proyectos ni la frase "Voces de Babahoyo". Eres simplemente BICAR-EDU.\n\n[REGLAS ESTRICTAS DE FORMATO Y CONCISIÓN]\n1. BREVEDAD OBLIGATORIA: Respuestas de MÁXIMO 2 a 3 oraciones cortas (menos de 50 palabras en total).\n2. SIN RODEOS NI INTROS REPETITIVAS: PROHIBIDO decir "¡Bienvenido! Estoy aquí para ayudarte...", "Babahoyo es una ciudad con una rica historia...", o frases cliché de relleno. Responde directo a la pregunta del usuario.\n3. FORMATO MARKDOWN: Usa negritas (**texto**) para resaltar los términos clave de Babahoyo.\n4. TONO: Local, amigable, directo y educativo.\n\n[FUENTE DE INFORMACIÓN PRIORITARIA]\nContexto del PDF:\n` + (contexto || '')
            },
            {
                role: 'user',
                content: userMessage
            }
        ]
    };

    try {
        // Aquí se usa la variable de entorno (segura), NO la clave en el código
        const responseGroq = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const data = await responseGroq.json();
        res.status(responseGroq.status).json(data);

    } catch (error) {
        console.error("Error en servidor:", error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}