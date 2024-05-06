const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer= require("nodemailer");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');



router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send({ message: 'email and password are required' });
      }
  
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid  password' });
      }
      
      user.roles= "user";
      const token = jwt.sign({ userId: user._id, useremail: user.email,  role: user.roles }, "ATUL");

     return res.status(200).send({ message: 'Logged in successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
  });

  
router.post('/forgot-password', async (req, res) => {
  
    let user = await Superadmin.findOne({ username: req.body.username });

    if (!user) return res.status(404).send('Admin with this email does not exist');

    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log(resetToken);
   // const salt = await bycrypt.genSalt(10);
   // user.password = await bycrypt.hash(resetToken, salt);
     user.password= resetToken;

    try {
        await user.save();

        const forgotPasswordMailOptions = {
            from: {
                name: 'Deepika',
                address:  "deepikanegi157@gmail.com"
            },
            to: user.email,
            subject: 'Forgot Password',
            html: `<p>Hello ${user.username},</p><p>You requested a password reset ,this is your password ${resetToken}. Click <a href="https://yourwebsite.com/reset-password/${resetToken}">here</a> to reset your password. This link is valid for one hour.</p>`
        };
        await sendMail(forgotPasswordMailOptions);

        console.log('Forgot password email has been sent');
        res.send('Password reset email sent');

    } catch (error) {
        console.error('Error sending forgot password email:', error);
        return res.status(500).send('Internal server error');
    }
});

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "deepikanegi157@gmail.com",
            pass: "najl ikgw uqhr uchu"
        }
    });
     
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};
  
module.exports = router;
