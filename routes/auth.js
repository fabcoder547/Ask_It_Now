const express=require('express');
const { Upload } = require('../config/multer');
const { signupHandler, signinHandler,logout, googleController,activation_handler,forgetPasswordhandler,resetPasswordHandler } = require('../controller/auth');
const User = require('../Models/User');
const router=express.Router();
const {check} =require('express-validator')
const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
router.post("/signup",Upload.single("profilepic"),
check("email").isEmail(),
check("password").isLength({min:6}),
check("name").isString()
,signupHandler);





router.post("/activate/user",activation_handler);




router.post("/signin",[
    check("email").isEmail(),
    check("password").isLength({min:6}),
],signinHandler)


//Route d For Forgot Password

router.post("/forget/password",[
  check("email").isEmail()
],forgetPasswordhandler);

router.put("/reset/password",[
  check('password').isLength({min:6})
],resetPasswordHandler)

router.get('/logout',logout)
router.post('/googlelogin',googleController)



router.get("/home",(req,res)=>{
    console.log(process.env.SENDGRID_API_KEY)
   const mail ={
              to:"atharvjoshi8149@gmail.com",
              from:"atharvjoshi8149@gmail.com",
              subject: 'Testing mail from atharv ',
              text: 'and easy to do anywhere, even with Node.js',
              html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            }

            
            sgMail.send(mail)
            .then(sent=>{
              console.log(sent)
              res.json({
                message:"Sent successfully",
              })
            })
            .catch(err=>{
              console.log("error in sending main  "+err)
            })
  
})
module.exports=router