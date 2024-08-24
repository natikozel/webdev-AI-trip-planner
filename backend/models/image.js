const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    image_generated_id: {
        type: String,
        ref: 'GeneratedImage'
    },
    url: String,
    image_prompt: {
        type: String,
        required: true
    },
    trip_prompt_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Prompt'
    }
})


module.exports = mongoose.model("image", imageSchema)