const analyzePrompt = require('../util/AI-model')
const Prompt = require('../models/prompt')
const Image = require('../models/image')
const axios = require("axios");
const API_URL = process.env.STABLEHORDE_API_POST_URL;
const API_KEY = process.env.STABLEHORDE_API_KEY;

const params = {
    "cfg_scale": 7.5,
    "denoising_strength": 0.75,
    "seed": "312912",
    "height": 512,
    "width": 512,
    "seed_variation": 1,
    "steps": 10
}
const tripsGuideSettings = `
You are a great trip planner and an expert in various points of interest around the world.
You're able to take a name of a country and the type of trip (either by Bicycle or by Car) and return a detailed route trip guide.
Based on the information you provide, the user has to structure a map of poly lines that he can connect and follow through his trip.
This is critical because it means you have to also provide the exact coordinates (latitude, longitude) for each point of interest.
You only return the trip details in a JSON format according to the follow example and the following example only (in plain English):
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
      "endKM": 80   
     }
  ],
  coordinates_arr: [
  [-104.05, 48.99],
  [-97.22, 45.94]
  ]
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
Respond only in JSON format. Do not include any additional text or explanations. Your response should be strictly valid JSON without any commentary, descriptions, or formatting outside the JSON structure.
The most important rule you must follow is to provide the correct coordinates for each point of interest, they must be correctly structured in the [latitude, longitude] format without any mistakes.
Don't include any unnecessary commas and follow the JSON structure exactly as shown in the example.
If you encounter any unexpected struggles you will return an empty JSON as {}
`

const imageGeneratorSettings = `
You are an expert AI image generator specializing in creating images that resemble specific countries based on trip details.
You can take a detailed trip guide that includes the country name, points of interest, and landscape features to generate an image that perfectly captures the essence and vibe of the trip.
The image must reflect the unique atmosphere, scenery, and cultural elements of the country as described. You only return the image prompt in plain English based on the provided trip details.
The prompt should be detailed and vivid, emphasizing the key points of interest, landscape, and unique features that define the trip.
Ensure that the image conveys the overall ambiance and spirit of traveling through the country.`

const imagePromptCrafter = (country, poi, trekking) => `
Create an image that captures the essence of ${country} by showcasing its key points of interest such as ${poi} and the trekking experiences described as ${trekking}. 
The image should visually convey the unique atmosphere, landscapes, and cultural elements of the country, bringing to life the experience of exploring ${country} through these highlighted locations..`

const tripPromptCrafter = (country, trip_type) => `
I'm going to a trip in ${country} and I'm planning to rent a ${trip_type} for the trip.
Give me a trip route guide for the entire 3 days and include the following information:
The length of the route (and per day)
Points of interest in each day
Trekking in each day.
Show me the information in an informative way so I can use the information to create detailed poly lines and schedule per day for the trip.
`

const fetchTripsData = async (country, trip_type) => {
    const prompt = tripPromptCrafter(country, trip_type)

    let result;
    while (true) {
        try {
            result = await analyzePrompt(prompt, tripsGuideSettings);
            break; // Exit loop if successful
        } catch (error) {
            console.error(`Error analyzing prompt`, error);
        }
    }
    const newPrompt = await new Prompt({prompt_string: prompt, country, trip_type, result}).save()

    const allPoi = result.days?.map(day => day.points_of_interest?.map(point => point.name)).flat()
    const allTrekkings = result.days?.map(day => day.trekking.views).flat()
    const imageId = await fetchImagePrompt(newPrompt._id, country, trip_type, allPoi, allTrekkings)
    return {imageId, result};
}


const fetchImagePrompt = async (promptId, country, trip_type, allPoi, allTrekkings) => {
    const promptForImage = imagePromptCrafter(country, allPoi, allTrekkings)

    let prompt_for_image;
    while (true) {
        try {
            prompt_for_image = await analyzePrompt(promptForImage, imageGeneratorSettings, false);
            break; // Exit loop if successful
        } catch (error) {
            console.error(`Error analyzing prompt`, error);
        }
    }
    const update = {prompt_for_image: promptForImage};
    const options = {new: true, includeResultMetadata: true, lean: true};
    await Prompt.findByIdAndUpdate(promptId, update, options);

    try {
        const response = await axios.post(API_URL, {
            prompt: prompt_for_image,
            params
        }, {
            headers: {
                'accept': 'application/json',
                'apikey': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const {id} = response.data;
        await new Image({image_generated_id: id, image_prompt: prompt_for_image, trip_prompt_id: promptId}).save()
        return id;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {fetchTripsData, fetchImagePrompt}