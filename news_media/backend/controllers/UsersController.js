const User = require('../models/Users');
const createToken = require('../jwt/createToken');

const UserController = {

    login : async(req,res) => {
        try{

            let{email,password} = req.body
            let user = await User.login(email,password)
            let token = createToken(user._id);
            res.cookie('jwt',token,{ httpOnly:true, maxAge: 60*60*24*5*1000})
            return res.status(200).json({user,token})

        } catch (e) {
            return res.status(400).json({errors:e.message})
        }
    },

    register : async(req,res)=>{
        
       try {

         let{name,email,password} = req.body
         let user = await User.register(name,email,password)
         let token = createToken(user._id);
         res.cookie('jwt',token, { httpOnly : true, maxAge: 60*60*24*5*1000}) // always stored milisecs

        return res.status(200).json({user,token})

       } catch(e){
        return res.status(400).json({errors:e.message})
       }
    },

    logout : (req,res) => {
        res.cookie('jwt','',{maxAge : 1}); // delete cookies
        return res.json({message: 'logout process success...'})
    }

}

module.exports = UserController;