const mongoose=require('mongoose');
const { v4: uuid } = require('uuid');
// const uuid = require("uuid");
const crypto = require("crypto");
const Schema=mongoose.Schema;

const User=new Schema(
    {
      name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    encry_password: {
      type: String,
      required: true,
    },
    profilepic: {
      data: Buffer,
      ContentType: String,
    },
    country: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    birthdate: {
      type: Date,
    },
    age: {
      type: Number,
    },
    profession: {
      type: String,
    },
    questionsAsked: {
      type: Number,
      default: 0,
    },
    answersGiven: {
      type: Number,
      default: 0,
    },
    time:{
        type:Date,
        default:Date.now,
    }
    },{
        timestamps:true,
    }

);


User.virtual("password")
  .set(function (plainpassword) {
    this._password = plainpassword;
    this.salt = uuid();
    
    this.encry_password = this.encryptPassword(plainpassword);
  })
  .get(function () {
    return this._password;
  });

User.methods = {
  checkPassword: function (checkingpassword) {
    return this.encryptPassword(checkingpassword) === this.encry_password;
  },

  encryptPassword: function (plainpassword) {
   
    if (plainpassword === "") {
      return "";
    } else {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    }
  },
};


module.exports=mongoose.model('User',User);