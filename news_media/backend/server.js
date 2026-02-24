require('dotenv').config();
const AuthMiddleWare = require ('./middleware/AuthMiddleware')
var morgan = require('morgan');
const express = require('express');
const app = express ();
const newsRoute = require('./routes/news');
const usersRoute = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors')
var cookieParser = require('cookie-parser')

const mongoURL = ''

mongoose.connect(mongoURL).then(()=>{
    console.log('database connected...')

    app.listen ( process.env.PORT , () => {
    console.log('app is running on port' + process.env.PORT );
})
})

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173', // only okay in development version
    credentials : true
}
))
app.use(cookieParser())

app.get('/', (req,res)=>{
    return res.json({message: 'hello mern stack' })
})

app.get('/set-cookie', (req,res)=>{
    // res.setHeader('Set-Cookie','message=cookie set data'); // set cookie

    res.cookie('code-lab','cookie data from code lab message',{httpOnly:true}) // Access only

    return res.send('cookie set success')
})

app.get('/get-cookie', (req,res)=>{

    let data = req.cookies;
    return res.json(data)

})

app.use('/api/news',AuthMiddleWare,newsRoute)
app.use('/api/users',usersRoute)
