const users = require('../models/userModel');
const path = require('path');
const { mailOptions, createTransporter } = require('../utils/mailcontent');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const crypto = require('crypto'); 
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
    try {
      const existingUser = await users.findOne({email:req.body.email});
      if (existingUser) {
        // Email already in use, respond with an error
        return res.status(501).json({
          success:false,
          error:'Email already in use'
      })
    }
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.avatar ){
            return res.status(501).json({
                success:false,
                error:'all field are mendetory'
            })
        }
        const user = await users.create(req.body);
        const token = user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(201).json({
            success:true,
            user:user,
            token:token,
        })
    } catch (error) {
        res.status(501).json({
            success:false,
            error:error,
        })
    }
    
}
exports.login = async (req, res) => {
    try {
      console.log(req.body)
        // Find the user by email
        const {email , password} = req.body
        const user = await users.findOne({ email: email }).select('+password');
        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);
        

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password',
            });
        }

        const token = user.generateAuthToken();


        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(200).json({
            success: true,
            user:user,
            token: token,
        });
    } catch (error) {
      console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ success: true, message: 'Logout successful' });
}
exports.forgotPassword = async (req, res) => {
    try {

      const { email } = req.body;
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      // Generate reset token 
      const resetToken = await user.changePasswordToken();
      // Save reset token and its expiration time to the user document
      await user.save({ validateBeforeSave: false });

      // Create nodemailer transporter
      const transporter = createTransporter();
      // Send the email
      await transporter.sendMail(mailOptions(user.email, resetToken,req.protocol,req.get("host")));
  
      res.status(200).json({
        success: true,
        message: 'Password reset email sent successfully',
        resetToken:resetToken
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
};
exports.resetPassword = async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      const resetToken = req.params.token;
      const resetPasswordToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");
        
      if ( !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'All fields are mandatory',
        });
      }
  
      const user = await users.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired reset token',
        });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'Passwords do not match',
        });
      }
  
      // Update user's password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
};
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user._id;

    // Find the user by ID
    const user = await users.findById(userId).select('+password');

    // Check if the old password is correct
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid old password',
      });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'New password and confirm password do not match',
      });
    }

    // Update user's password
    
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      user:user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,

    });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const user = await users.findById(req.user._id);
   
      res.status(200).json({
        success: true,
        user:user,
      });
  } catch (error) {
      res.status(404).json({
      success: false,
      error: error,
    });
  }
  
};
exports.updateProfile = async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await users.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      res.status(200).json({
        success: true,
      });
};


// Get all users(admin)
exports.getAllUser = async (req, res) => {
    try {
        const allUser = await users.find();
        res.status(200).json({
        success: true,
        allUser:allUser,
        });
    } catch (error) {
        res.status(501).json({
            success:false,
            error:error
        })
    }
    
    
  };
  
  // Get single user (admin)
  exports.getSingleUser = async (req, res) => {
    const user = await users.findById(req.params.id);
  
    if (!user) {
      return res.status(501).json({
        success: false,
        error:"user not found"
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  };
  
  // update User Role -- Admin
  exports.updateUserRole = async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await users.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  };
  
  // Delete User --Admin
  exports.deleteUser = async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) {
            return res.status(501).json({
                success: false,
                error:"user not found"
              });
        }

        await users.deleteOne({ _id: user._id });      
        res.status(200).json({
          success: true,
          message: "User Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
  }