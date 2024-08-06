const { response } = require('../app');
const USERS = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase'); 
const nodemailer = require('nodemailer')
const twilio = require('twilio');
require('dotenv').config();



const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

const sendOTPSMS = (mobileNumber, otp) => {
  const formattedPhoneNumber = mobileNumber.startsWith('+91') ? mobileNumber : `+91${mobileNumber}`;
  return twilioClient.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: formattedPhoneNumber,
  });
};

const doSignup = (req, res) => {
  const otp = generateOTP();
  const saltRounds = 10;

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const formattedPhoneNumber = req.body.mobileNumber.startsWith('+91') ? req.body.mobileNumber : `+91${req.body.mobileNumber}`;

    const newUser = new USERS({
      Name: req.body.Name,
      email: req.body.email,
      mobileNumber: formattedPhoneNumber,
      password: hash,
      otp: otp,
    });

    newUser.save()
      .then(async (response) => {
        try {
          await sendOTPEmail(req.body.email, otp);
          await sendOTPSMS(req.body.mobileNumber, otp);
          res.status(200).json({ user: response });
        } catch (error) {
          console.error('Error sending OTP:', error);
          res.status(500).json({ message: 'Error sending OTP' });
        }
      })
      .catch(error => {
        console.error('Error saving user:', error);
        if (error.code === 11000) {
          res.status(500).json({ message: `${req.body.email} is already existing` });
        } else {
          res.status(500).json({ message: 'Something went wrong' });
        }
      });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Error hashing password' });
  }
};




const doLogin = async (req, res) => {
  const { uid, email, displayName, idToken } = req.body;

 console.log(uid, email, displayName, idToken );
 
  try {
    if (idToken) {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const googleEmail = decodedToken.email;

      let userData = await USERS.findOne({ email: googleEmail });

      if (!userData) {
        const newUser = new USERS({
          Name: decodedToken.name || displayName,
          email: googleEmail,
          mobileNumber: '', 
          password: '' ,
          status: 2
        });

        userData = await newUser.save();
      }

      userData.password = undefined;
      const options = {
        expiresIn: "2d",
        algorithm: "HS256"
      };
      const token = jwt.sign({ ...userData._doc }, process.env.JWT_PASSWORD, options);

      res.status(200).json({ user: userData, token });

    } else {
      const { email, password } = req.body;
      const userData = await USERS.findOne({ email });

      if (userData) {
        const isMatch = bcrypt.compareSync(password, userData.password);
          if (isMatch) {
            userData.password = undefined;
            const options = {
              expiresIn: "2d",
              algorithm: "HS256"
            };
            const token = jwt.sign({ ...userData._doc }, process.env.JWT_PASSWORD, options);
            res.status(200).json({ user: userData, token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const verifyotp = (req, res) => {
  const { email, otp } = req.body;

  USERS.findOne({ email: email })
    .then(user => {
      if (user && user.otp === otp) {
        user.status = 2; 
        user.otp = null; 

        user.save()
          .then(() => {
            const options = {
              expiresIn: "2d",
              algorithm: "HS256"
            };

            const token = jwt.sign({ ...user._doc }, process.env.JWT_PASSWORD, options);
            res.status(200).json({ user: user, token });
          })
          .catch(error => res.status(500).json({ message: 'Error updating user status' }));
      } else {
        res.status(400).json({ message: 'Invalid OTP' });
      }
    })
    .catch(error => res.status(500).json({ message: 'User not found' }));
};

const resendopt = (req, res) => {
try {
  const { email, mobileNumber } = req.body;
  const formattedPhoneNumber = mobileNumber.startsWith('+91') ? mobileNumber : `+91${mobileNumber}`;

  console.log(`Resending OTP to email: ${email}, mobile: ${formattedPhoneNumber}`);

  USERS.findOne({ email: email })
    .then(data => {
      if (data) {
        const newOtp = generateOTP();
        data.otp = newOtp;

        data.save()
          .then(async () => {
            try {
              console.log(`Sending OTP SMS to ${formattedPhoneNumber}`);
              await sendOTPSMS(formattedPhoneNumber, newOtp);
              console.log(`Sending OTP Email to ${email}`);
              await sendOTPEmail(email, newOtp);
              res.status(200).json({ message: 'OTP sent successfully' });
            } catch (error) {
              console.error('Error sending OTP:', error);
              res.status(500).json({ message: 'Error sending OTP' });
            }
          })
          .catch(error => {
            console.error('Error saving user:', error);
            res.status(500).json({ message: 'Internal server error' });
          });
      } else {
        console.error('User not found');
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
} catch (error) {
  console.log(error);
  
}

 
};






module.exports = { doSignup, doLogin ,verifyotp,resendopt};
