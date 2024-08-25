const express = require('express');
const csrf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const index = express()
const db = require("mongoose")
const allowCors = require('../src/middleware/allowCors')
const {fetchTripsData} = require('../src/middleware/fetchTripsData')
const errorHandler = require('../src/middleware/errorHandler')
const session = require('express-session')
const imageRouter = require('../src/routes/imageGenerator')
const MongoDBStore = require('connect-mongodb-session')(session)
const AppError = require('../src/util/AppError')
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const mongo_store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

index.use(cookieParser())
index.use(csrf({cookie: true}))
index.use(express.json())
index.use(helmet())
index.use(allowCors)
index.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: mongo_store}));

index.use(imageRouter)
index.get('/csrf-token', (req, res) => {
    res.json({csrfToken: req.csrfToken()})
})

index.post('/generate-trips', async (req, res, next) => {
    try {
        const {country, trip_type} = req.body?.tripDetails
        if (country.trim() === '' || trip_type.trim() === '')
            throw new AppError(400, 'Failed to fetch trip data', 'Country and Trip Type are required')


        const {imageId, result: trips, prompt_for_image} = await fetchTripsData(country, trip_type)

        res.status(200).json({
            trips,
            prompt_for_image,
            imageId
        })
    } catch (err) {
        next(err)
    }
});


index.use(errorHandler)
db.connect(MONGODB_URI)
    .then((res) => index.listen(PORT || 8080, () => {
        console.log(`Server is running on port ${PORT}`)
    }))
    .catch(err => console.log("Error occurred with connection to the MongoDB\n" + err))