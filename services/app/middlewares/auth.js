import getConfig from '../lib/config'
import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    let token = req.cookies.jwt
    let secret = getConfig('JWT_SECRET')

    if (!token) {
        return res.status(401).send({ message: 'no token found' })
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            next()
        } else {
            return res.status(401).send({ message: 'jwt verification error' })
        }
    })
}
