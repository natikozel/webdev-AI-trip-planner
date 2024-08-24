const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    trip_type: {
        type: String,
        required: true
    },
    prompt_string: {
        type: String,
        required: true
    },
    prompt_for_image: String,
    result: {
        type: Object,
        required: true
    }
})


module.exports = mongoose.model("Prompt", promptSchema)