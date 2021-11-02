import mongoose from 'mongoose'

const { Schema, model } = mongoose
import bcrypt from 'bcrypt'



const userSchema = new Schema (
    {
        first_name: { type: String, required: true},
        last_name: { type: String, required: true},
        email: {type: String, required: true},
        passward: {type: String, required:true},
    },
    {
        timestamps: true,
    }
) 

userSchema.pre("save", async function(next){
    const user = this
    console.log(user)
    const plainPassward = user.passward
    console.log(plainPassward)
    if(user.isModified("passward")){
        user.passward = await bcrypt.hash(plainPassward, 10)
        console.log(user.passward)
    }
    next()
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.passward
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

export default model("User", userSchema)