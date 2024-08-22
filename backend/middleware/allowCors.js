module.exports = allowCors = (req, res, next) => {

    const allowedOrigin = ['http://localhost:3000']
    const origin = req.headers.origin
    if (allowedOrigin.includes(origin))
        res.header('Access-Control-Allow-Origin', origin)

    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token')
    next()
}