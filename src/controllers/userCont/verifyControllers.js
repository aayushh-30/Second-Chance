const nodemailer = require("nodemailer");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


//Email Verification

const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-app-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};


//Phone Verification

const twilio = require("twilio");
const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");

const sendPhoneOTP = async (phone, otp) => {
  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+1XXXXXXXXXX", // Your Twilio number
    to: phone,
  });
};

// For demo only: in-memory (DON'T use in prod)
const otpStore = {}; // { phone/email: { otp, expiresAt } }

const saveOTP = (identifier, otp) => {
  otpStore[identifier] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  };
};


const verifyOTP = (identifier, userOTP) => {
  const record = otpStore[identifier];
  if (!record) return false;
  if (Date.now() > record.expiresAt) return false;
  return record.otp === userOTP;
};

