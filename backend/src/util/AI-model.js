const KEY = process.env.GROQ_API_KEY

const analyzePrompt = async (prompt, settings, isJson = true) => {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${KEY}`
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'system',
                    content: settings
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama3-8b-8192',
            temperature: 1,
            top_p: 1,
            stream: false,
            stop: null
        })
    })
    const data = await r.json();
    if (isJson) {
        const returnValue = JSON.parse(data.choices[0].message?.content);
        return Object.keys(returnValue).length !== 0 ? returnValue : null
    } else {
        return data.choices[0].message?.content
    }

}

module.exports = analyzePrompt
