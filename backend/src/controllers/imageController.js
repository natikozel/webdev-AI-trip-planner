const Image = require("../models/image");

exports.saveImage = async (req, res, next) => {
    try {
        const {imageId, data} = req.body;

        if (!imageId || !data) {
            return res.status(400).json({error: 'Image ID and data are required'});
        }

        const options = {new: true, includeResultMetadata: true, lean: true};
        await Image.findOneAndUpdate({image_generated_id: imageId}, {response: data}, options)
        return res.status(200).json({message: 'Image saved successfully'});
    } catch (err) {
        next(err);
    }
};