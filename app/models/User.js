import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    name: String,
})

userSchema.pre('save', function (next, done) {
    let user = this

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash
            next()
        })
    })

    setTimeout(done, 100)
})

export default mongoose.model('User', userSchema)
