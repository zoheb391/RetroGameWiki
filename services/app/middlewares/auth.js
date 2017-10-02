import getConfig from '../lib/config'
import jwt from 'jsonwebtoken'

const secret = getConfig('JWT_SECRET')

const auth = (req, res, next) => {

    let token = req.cookies.jwt
    if (!token) {
        return res.status(401).send({ message: 'No Token :( please login' })
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message })
        } else if (decoded) {
            req.userId = decoded.sub
            next()
        }
    })
}

export default auth
