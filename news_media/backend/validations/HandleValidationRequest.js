
const { validationResult } = require("express-validator");

const HandleValidationRequest = (req,res,next) => {
   const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.mapped() }); //result.array() [is okay to be used too]
    }
    next();
}

module.exports = HandleValidationRequest;