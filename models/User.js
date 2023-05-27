const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
       
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/.+\@.+\..+/, "Este correo no es válido"],
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    age:{
        type: Number,
        required: [true, 'age is required']
    },
    tokens: [],
    
}, { timestamps: true });

UserSchema.methods.toJSON = function(){
    const user = this._doc
    delete user.tokens
    delete user.password
    return user
}


const User = mongoose.model('User', UserSchema);

module.exports = User;