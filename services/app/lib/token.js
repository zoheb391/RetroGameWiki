import jwt from 'jsonwebtoken'
import moment from 'moment'

const secret = process.env['JWT_SECRET']

const createToken = userId => {
    let payload = {
        sub: userId,
        exp: moment().add(1, 'day').unix()
    }
    return jwt.sign(payload, secret)
}

export default createToken
