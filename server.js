require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors')
const app=express();

const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth')
 
//addinng middlewares

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//connecting to the database 
mongoose
  .connect(process.env.DATABASE_ATLAS_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("not connected  ", err.message);
  });


app.use('/api',authRoutes);



app.listen(5000|| process.env.PORT,()=>{
    console.log("server stared at port 5000")
});


