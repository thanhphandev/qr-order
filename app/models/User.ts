import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, select: false},
    role: {type: String, default: 'user'},
    authProvider: {type: String}
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)