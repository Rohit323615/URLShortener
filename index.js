const express=require('express');
const connectDB=require('./config/db');

//connect mongodb
connectDB();


const app=express();

//set view engine
app.set('view engine','ejs');


//for accepting json data
app.use(express.json({extended:false}));

//accepting form 
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

const port=process.env.PORT || 5000

app.listen(port,()=>console.log(`server started on port ${port}`));