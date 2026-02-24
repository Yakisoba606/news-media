const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    name:{
        type: String ,
        require: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }

}, {timestamps: true} );

// register
UserSchema.statics.register = async function (name,email,password) {
    
        let userInfo = await this.findOne({email}) ; //find duplicate emails
        if(userInfo){
            throw new Error('user exists');
        }

        let salt = await bcrypt.genSalt();
        let hashValue = await bcrypt.hash(password,salt);

        let user = await this.create({
            name, 
            email,
            password : hashValue,
        });
        return user;
};

// login
UserSchema.statics.login = async function (email,password){
    let userInfo = await this.findOne({email});
    if(!userInfo) {
        throw new Error("Email does not exist. Try again...")
    }

    let passwordStatus = await bcrypt.compare(password , userInfo.password) // plain text, db hash password text
    if(passwordStatus){
        return userInfo;
    } else {
        throw new Error('Password Incorrect! Try Again...')
    }
}

module.exports = mongoose.model("User",UserSchema)

// name, email, password