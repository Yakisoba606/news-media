var jwt = require('jsonwebtoken');

const expireDate = 60*60*24*5; // 5days

const createToken = (id) =>{

    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: expireDate } );

}

module.exports = createToken;