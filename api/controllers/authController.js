//jwt authentication to be done here

const jwt = require('jsonwebtoken')

const auth = {
    createToken: (user) => {
        const accessToken = jwt.sign({ email: user.email, password: user.password }, "cricjwtkey", {expiresIn:"12h"})
        return accessToken
    },
    validateToken: (req, res) => {

        const authHeader = req.headers['authorization']
        if (!authHeader) {
            res.status(403).json({"error": "Unauthorized access"})
            
        }
        else {
            const bearer = authHeader.split(" ")
            const bearerToken = bearer[1]
            req.token = bearerToken
            jwt.verify(req.token, "cricjwtkey", (err, payload) => {
                if (err) {
                    res.status(403).json({"error": "Invalid token"})
                }
                else {
                    res.status(200).json(payload)
                }
            })
        }
    }

}
module.exports = auth