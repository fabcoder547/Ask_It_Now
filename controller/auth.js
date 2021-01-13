const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const {validationResult} =require('express-validator')
const sgMail=require('@sendgrid/mail');
const { json } = require("body-parser");
const {OAuth2Client} =require('google-auth-library')

const _ = require('lodash');
const { response } = require("express");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const client=new OAuth2Client("500759043755-str7ohoitguciodqlgj72rffgmnelc8e.apps.googleusercontent.com")


//Signup handelling 
exports.signupHandler=(req,res)=>{
    
    const errors=validationResult(req);
    console.log(errors)

    if(errors.errors.length!==0)
    {
        res.status(200).json({
            error:"Please fill all details correct"
        })
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user)
        {
            res.status(200).json({
                error:"User already exists"
            })
        }else{
            
           var user=req.body;
            console.log(req.file)
            if(req.file&&req.file.size<4000000)
            {
                console.log(req.file)
                user.profilepic={};
                user.profilepic.data=req.file.buffer;
                user.profilepic.ContentType=req.file.mimetype
            }
          
           
            

            var {email,name}=user;
           
            const token=jwt.sign(user,process.env.ACTIVATION_TOKEN_SECRET,{
              expiresIn:'5m'
            });
            
            const mail ={
              to:email,
              from:process.env.SENDGRID_SENDER_EMAIL,
              subject: 'Verify and Activate your account at askItNow!',
              text: 'Click on the below link to activate your account',
              html: `<h1>Please use the following to activate your account</h1>
                     <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                     <hr/>
                     <p>This email may containe sensetive information</p>
                     <p>${process.env.CLIENT_URL}</p>`
            }


          sgMail.send(mail)
            .then(sent=>{
              res.json({
                message:"Sent successfully",
                user
              })
            })
            .catch(err=>{
              console.log("error in sending main  "+err)
            })

        }
    })
    .catch((err) => {
        console.log("error in signup "+ err);
        res.status(400).json({
            error:"Error in Signup"
        })
    })

}





exports.activation_handler=(req,res)=>{


  const {token} =req.body;

if(token)
{
    jwt.verify(token,process.env.ACTIVATION_TOKEN_SECRET,(err,user)=>{
      if(err)
      {
        res.status(400).json(
        {
          error:'Invalid Registration ! Signup again',
        }
      )
      }
      const newUser=new User(user);

      newUser
      .save()
      .then(user=>{
        res.status(200)
        .json({
          message:"Registration Successfull! Sign in ",
          user
        })
      })
      .catch((err) => {
          res.status()
          json({
            error:'Could not save your data. try again!'
          })
      })
    })
  
   
}
else{

  console.log('token in null');
  res.status(400).json({
    error:'Registration failed ! please try again',
  })
}

  


}







exports.signinHandler=(req,res)=>{

const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ error: "Email or Password are incorrect!" });
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(200).json({
        error: "User does not exist",
      });
    }

    if (user.checkPassword(req.body.password)) {
      payload = {
        _id: user._id,
      };

      jwt.sign(payload, process.env.SECRET, (err, token) => {
        if (err) {
            console.log(err)
          return res.status(200).json({
            error: "Error in signin! please try again.",
          });
        } else {
           res.cookie('access_token',token,{
             path:"/",
             sameSite:'strict',
             httpOnly:true,
             expires:new Date(new Date().getTime()+60*1000*60*24*365)
        })
       
        .json({
            message:"cookie sent"
          })
        }
      });
    } else {
      return res.status(200).json({
        msg: "custom",
        error: "email and password does not match!",
      });
    }
  });

}



exports.forgetPasswordhandler=(req,res)=>{

    const {email}=req.body;
    const errors=validationResult(req);


    if(!errors.isEmpty())
    {
      const firstError=errors.array().map(error => error.msg)[0] +" at "+ errors.array().map(error=>error.param);
      res.status(400)
      .json({
        error:firstError,
      })
      
      
    }
    else{
      User.findOne({email:email})
      .then(user=>{
        if(!user)
        {
          res.json({
            message:'User with this email does not exist',
          })
        }
        else{

          const token=jwt.sign({_id:user._id},process.env.RESET_PASSWORD_TOKEN,{
            expiresIn:'5m',
          })
             const mail ={
              to:email,
              from:process.env.SENDGRID_SENDER_EMAIL,
              subject: 'Forget Password for askItNow ?',
              text: 'Click on the below link to reset your password',
              html: `<h1>Please use the following to reset your password</h1>
                     <p>${process.env.CLIENT_URL}/users/reset/password/${token}</p>
                     <hr/>
                     <p>This email may containe sensetive information</p>
                     <p>${process.env.CLIENT_URL}</p>`
            }

            sgMail.send(mail)
            .then(sent=>{
              res.status(200)
              .json({
                message:"Email Sent Successfully!"
              })
            })
            .catch(err=>{
              res.status(500)
              .json({
                error:'Something Went wrong! Email not send'
              })

            })

        }

      })
      .catch(err=>{

        res.status(500).json({
          error:'Something Went worng! Please try again'
        })

      })
    }
  }



exports.resetPasswordHandler=(req,res)=>{

  const errors=validationResult(req);
    if(!errors.isEmpty())
    {
      const firstError=errors.array().map(error => error.msg)[0] +" at "+ errors.array().map(error=>error.param);
     return res.status(400)
      .json({
        error:firstError,
      })
      
      
    }
    else{
      const {password,token}=req.body;
      
      jwt.verify(token,process.env.RESET_PASSWORD_TOKEN,(err,userId)=>{

         if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }
        else{

            User.findOne({_id:userId})
            .then(user=>{
              if(!user)
              {
                res.status(500).json({
                  error:"User does not exist!"
                })
              }
              else{

                user = _.extend(user, {password});
                user.save()
                .then(user=>{
                 
                  res.status(200).json({
                  
                    message:"Your password has been reset successfully! "
                  })

                })
                .catch((err) => {
                    res.status(500)
                    .json({
                      error:'Something went wrong !please try again'
                    })
                })

              }


            })
            .catch((err) => {
              console.log(err)
                res.status(500).json({
                  error:"Something went wrong"
                })
            })

        }

      })


    }


}


exports.logout=(req,res)=>{
    res.clearCookie('access_token'); 
    res.status(200).send("logout");
}

exports.googleController=(req,res)=>{
  const {idToken}=req.body
  client
    .verifyIdToken({ idToken, audience: "500759043755-str7ohoitguciodqlgj72rffgmnelc8e.apps.googleusercontent.com" })
    .then(response=>{
      const {email,email_verified,name}=response.payload
      // console.log(response)
      if(email_verified)
      {
        User.findOne({email})
        .then(user=>{
          if(user)
          {
              jwt.sign({_id:user._id}, process.env.SECRET, (err, token) => {
              if (err) {
             
              return res.status(400).json({
                error: "Error in signin! please try again.",
              });
        } else {

            res.cookie('access_token',token,{
             path:"/",
             sameSite:'strict',
             httpOnly:true,
             expires:new Date(new Date().getTime()+60*1000*60*24*365)
        })       
        .json({
            message:"cookie sent"
          })
        }
         });

         }
          else{
            let password=email+process.env.SECRET
            var newUser=new User({email,name,password})
            newUser.save()
            .then(user=>{

            jwt.sign({_id:user._id}, process.env.SECRET, (err, token) => {
              if (err) {
               return res.status(400).json({
                error: "Error in signin! please try again.",
              });
           } 
           else {
            res.cookie('access_token',token,{
             path:"/",
             sameSite:'strict',
             httpOnly:true,
             expires:new Date(new Date().getTime()+60*1000*60*24*365)
          })       
         .json({
            message:"cookie  sent with new user"
          })
         }
         });
            })
            .catch((err) => {
                console.log("here3 ",err)
              res.status(400).json({
                error:"Failed to signin with google"
              })
            })

          }
        })
        .catch((err) => {
          console.log(err)
          res.status(400).json({
          error:"Signin with google failed"
        })
        })
      }
      else{
        console.log("here ",err)
        res.status(400).json({
          error:"Signin with google failed"
        })
      }
    })
    .catch(err=>{
        console.log("here2 ",err)
      res.status(400).json({
          error:"Signin with google failed"
        })
    })
 
}