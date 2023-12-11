const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 


require('dotenv').config({ path: path.join(__dirname, '../../.env') });


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Plz enter Your Name'],
    },
    email:{
        type:String,
        require:[true, 'Plz enter Your email'],
        unique:true,
        validator:[validator.isEmail, "Please Enter a valid Email"],
        
    },
    password: {
      type: String,
      require: [true, 'Plz enter Your password'],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
  },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,


})

//password hashing in bycrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });

  //generate jwt token
  userSchema.methods.generateAuthToken = function () {
   
    const token = jwt.sign(
      { _id:this._id} ,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    return token;
  };
  
  //compair password for login 
  userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
      
      const result = await bcrypt.compare(enteredPassword, this.password);
      return result;
  } catch (error) {
      console.error('Error in comparePassword:', error);
      throw error;
  }
};

//change password token
userSchema.methods.changePasswordToken = function () {
    const randomToken = crypto.randomBytes(20).toString('hex');
      this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(randomToken)
        .digest("hex");;
      this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    return randomToken;
};

  module.exports = mongoose.model('User' , userSchema)