import getConfig from '../lib/config'
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    let token = req.cookies.jwt
    let secret = getConfig('JWT_SECRET')

    if (!token) {
        res.send({ message: 'No Token Found' })
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) res.send({ message: 'Invalid Token' })

            let userId = decoded.sub
            // res.send({ userId })

            next()
        })
    }
}

export default auth
