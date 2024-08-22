const analyzePrompt = require('../util/AI-model')

const promptCraft = (country, trip_type) => `
I'm going to a trip in ${country} and I'm planning to rent a ${trip_type} for the trip.

Give me a trip guide for the entire 3 days and include the following information:
The length of the route (and per day)
Points of interest in each day
Trekking in each day.

Show me the information in an informative way so I can use the information to create detailed poly lines and schedule per day for the trip.
`
module.exports = fetchTripsData = async (country, trip_type) => {
    const prompt = promptCraft(country, trip_type)
        // save prompt to mongo DB
    return await analyzePrompt(prompt)
}