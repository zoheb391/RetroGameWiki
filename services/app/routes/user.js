import bcrypt from 'bcryptjs'

import User from '../models/User'
import createToken from '../lib/token'


export const login = (req, res) => {
    let { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (!user) return res.status(401).send({ message: 'cannot find email'})

        bcrypt.compare(password, user.password, (err, resp) => {
            if (err) return res.send({ message: 'server error checking password'})
            if (!resp){
                return res.status(401).send({ message: 'wrong password'})
            }

            let accountDetails = {
                id: user.id,
                username: user.email
            }

            let token = createToken(user.id)
            res.cookie('jwt', token)
            res.send({ accountDetails })
        })
    })
    .catch(err => res.send(500).send({ message: 'server error /login' }))
}

export const signup = (req, res) => {
    let { email } = req.body

    return User.findOne({ email }, (err, found) => {
        if (found) return res.status(401).send({ message: 'User Already Exists!'})

        let user = User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        })

        user.save(err => {
            if (err) return res.status(500).send({ message: err._message })

            let accountDetails = {
                id: user.id,
                username: user.email
            }

            let token = createToken(user.id)
            res.cookie('jwt', token)
            return res.status(200).send({ accountDetails })
        })
    })
    .catch(err => res.send(500).send({ message: 'server error /signup' }))
}


export const logout = (req, res) => {
    res.clearCookie('jwt')
    return res.status(200).send({ message: 'you have logged out'})
}
