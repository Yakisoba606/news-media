const jwt = require ('jsonwebtoken')

const AuthMiddleWare = (req,res,next)=> {

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, ( err , decodedValue )=>{
            if (err) {
                return res.json({message: 'token is wrong...'})
            } else {
                next();
            }
        })
    } else {
        return res.json({message: 'token is needed...'})
    }

}

module.exports = AuthMiddleWare