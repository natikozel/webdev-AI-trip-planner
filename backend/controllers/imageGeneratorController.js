const Image = require("../models/image");
const axios = require("axios");
const statusUrl = process.env.STABLEHORDE_API_STATUS_URL;


exports.fetchImage = async (req, res, next) => {

    try {
        const {imageId} = req.body;
        console.log(imageId)
        if (!imageId) {
            return res.status(400).json({error: 'Image ID is required'});
        }

        const img = await Image.findById(imageId);
        console.log(img)
        if (!img) {
            return res.status(404).json({error: 'Image not found'});
        }

        const {image_generated_id} = img;

        const response = await axios.get(`${statusUrl}/${image_generated_id}`, {
            headers: {
                'accept': 'application/json',
                'Client-Agent': 'unknown:0:unknown'
            }
        });

        if (response.data.finished === 1) {
            const url = response.data.generations[0].img
            const options = {new: true, includeResultMetadata: true, lean: true};
            await Image.findByIdAndUpdate(imageId, {url}, options);
            return res.status(200).json({imageUrl: url});
        } else if (response.data.finished === 0) {
            return res.status(429).json({error: `Image will be ready in ${response.data.wait_time} seconds.`});
        } else {
            return res.status(500).json({error: 'Unexpected error occurred'});
        }
    } catch (err) {
        next(err);
    }

}