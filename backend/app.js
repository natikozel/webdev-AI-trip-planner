const express = require('express');
const csrf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express()
const allowCors = require('./middleware/allowCors')
const fetchTripsData = require('./middleware/fetchTripsData')
const errorHandler = require('./middleware/errorHandler')
const AppError = require('./util/AppError')

app.use(cookieParser())
app.use(csrf({cookie: true}))
app.use(express.json())
app.use(helmet())
app.use(allowCors)


app.get('/csrf-token', (req, res) => {
    res.json({csrfToken: req.csrfToken()})
})

app.post('/generate-trips', async (req, res, next) => {
    try {
        const {country, trip_type} = req.body?.tripDetails
        if (country.trim() === '' || trip_type.trim() === '')
            throw new AppError(400, 'Failed to fetch trip data', 'Country and Trip Type are required')


        const trips = await fetchTripsData(country, trip_type), images = []

        res.status(200).json({
            trips: trips,
            images: images
        })
    } catch (err) {
        next(err)
    }
});

app.get('/get-image', (req, res) => {

})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})