const KEY = process.env.GROQ_API_KEY

const analyzePrompt = async (prompt) => {
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
                    content:
                        `
                     You are a great trip planner and an expert in various points of interest around the world.
                     You're able to take a name of a country and a type of trip and return a detailed trip guide for the user.
                     You only return the trip details in a JSON format according to the follow example:
                     {
                        days: [
                            {
                          "day": 1,
                          "route_length": 80,
                          "points_of_interest": [
                            {
                              "name": "Mendoza Wine Region",
                              "beginKM": 0,
                              "endKM": 20
                            },
                            {
                              "name": "Maipón Town",
                              "beginKM": 70,
                              "endKM": 80                            }
                          ],
                          "trekking": {
                            "terrain": "flat",
                            "incline": "gentle",
                            "views": "Andes mountain range"
                          }
                        }
                        ]
                     }
                     The returned data should be informative and detailed and should include the length of the route per day, points of interest in each day and trekking information.
                     You know that if the user's trip type is "Bicycle" he's only allowed to travel up to 80 kilometers per day, and if it's "Car" the minimum is 80 kilometers per day, and it goes up to 300 kilometers per day.
                     You make sure that the user can use the information to create detailed poly lines (in his map) and plan schedule per day for the trip since your information is so detailed and informative that he can manage an entire trip with just one of your responses.
                     You only return the data in a valid JSON form as stated above, you don't return any other data or text in the response.
                     If you encounter any unexpected struggles you will return an empty JSON as {}
                     `
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama3-8b-8192',
            temperature: 1,
            // max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        })
    })
    try {
        const data = await r.json();
        const returnValue = JSON.parse(data.choices[0].message?.content);
        return Object.keys(returnValue).length !== 0 ? returnValue : null
    } catch (err) {
        return {
            error: 'Failed to fetch trip data',
        }
    }

}

module.exports = analyzePrompt
