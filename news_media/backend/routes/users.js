const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');
const { body } = require("express-validator");
const HandleValidationRequest = require("../validations/HandleValidationRequest");
const User = require('../models/Users')

router.post('/login',UserController.login)

router.post('/register',[
    body("name").notEmpty(),
    body("email").custom(async value => {
        const userData = await User.findOne ( {email: value} )
        if(userData){
            throw new Error('Email already exists. Try another mail...')
        }
    }).notEmpty(),
    body("password").notEmpty(),
  ],HandleValidationRequest,UserController.register)

  router.post('/logout',UserController.logout);

module.exports = router; 