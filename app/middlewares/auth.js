import getConfig from '../lib/config'
import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    let token = req.cookies.jwt
    let secret = getConfig('JWT_SECRET')

    if (!token) {
        return res.status(401).send({ message: '!token' })
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            let userId = decoded.sub
            next()

        } else {
            return res.status(401).send({ message: 'jwt verification error' })
        }
    })
}

export const end = (req, res) => {
    res.send('done')
}

// export default auth
