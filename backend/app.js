const express = require('express');
const csrf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express()
const db = require("mongoose")
const allowCors = require('./middleware/allowCors')
const {fetchTripsData} = require('./middleware/fetchTripsData')
const errorHandler = require('./middleware/errorHandler')
const session = require('express-session')
const imageRouter = require('./routes/imageGenerator')
const MongoDBStore = require('connect-mongodb-session')(session)
const AppError = require('./util/AppError')
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const mongo_store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

app.use(cookieParser())
app.use(csrf({cookie: true}))
app.use(express.json())
app.use(helmet())
app.use(allowCors)
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: mongo_store}));

app.use(imageRouter)
app.get('/csrf-token', (req, res) => {
    res.json({csrfToken: req.csrfToken()})
})

app.post('/generate-trips', async (req, res, next) => {
    try {
        const {country, trip_type} = req.body?.tripDetails
        if (country.trim() === '' || trip_type.trim() === '')
            throw new AppError(400, 'Failed to fetch trip data', 'Country and Trip Type are required')


        const {imageId, result: trips} = await fetchTripsData(country, trip_type)

        res.status(200).json({
            trips,
            imageId
        })
    } catch (err) {
        next(err)
    }
});


app.use(errorHandler)
db.connect(MONGODB_URI)
    .then((res) => app.listen(PORT || 8080, () => {
        console.log(`Server is running on port ${PORT}`)
    }))
    .catch(err => console.log("Error occurred with connection to the MongoDB\n" + err))