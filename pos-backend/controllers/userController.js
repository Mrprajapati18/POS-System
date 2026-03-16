// const createHttpError = require("http-errors");
// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("../config/config");

// const otpGenerator = require("otp-generator"); //  Durgesh 13 March 2026
// const sendEmail = require("../Utils/sendEmail");;

// const register = async (req, res, next) => {
//     try {

//         const { name, phone, email, password, role } = req.body;

//         if(!name || !phone || !email || !password || !role){
//             const error = createHttpError(400, "All fields are required!");
//             return next(error);
//         }

//         const isUserPresent = await User.findOne({email});
//         if(isUserPresent){
//             const error = createHttpError(400, "User already exist!");
//             return next(error);
//         }


//         const user = { name, phone, email, password, role };
//         const newUser = User(user);
//         await newUser.save();

//         res.status(201).json({success: true, message: "New user created!", data: newUser});


//     } catch (error) {
//         next(error);
//     }
// }


// const login = async (req, res, next) => {

//     try {
        
//         const { email, password } = req.body;

//         if(!email || !password) {
//             const error = createHttpError(400, "All fields are required!");
//             return next(error);
//         }

//         const isUserPresent = await User.findOne({email});
        
//         if(!isUserPresent){
//             const error = createHttpError(401, "Invalid Credentials");
//             return next(error);
//         }

//         const isMatch = await bcrypt.compare(password, isUserPresent.password);
//         console.log(isMatch);
//         if(!isMatch){
//             const error = createHttpError(401, "Invalid Credentials");
//             return next(error);
//         }

//         const accessToken = jwt.sign({_id: isUserPresent._id}, config.accessTokenSecret, {
//             expiresIn : '1d'

//         });
//         console.log(accessToken);

//         res.cookie('accessToken', accessToken, {
//             maxAge: 1000 * 60 * 60 *24 * 30,
//             httpOnly: true,
//             sameSite: 'none',
//             secure: true
//         })

//         res.status(200).json({success: true, message: "User login successfully!", 
//             data: isUserPresent
//         });


//     } catch (error) {
//         console.log(error);
//         next(error);
//     }

// }

// const getUserData = async (req, res, next) => {
//     try {
        
//         const user = await User.findById(req.user._id);
//         res.status(200).json({success: true, data: user});

//     } catch (error) {
//         next(error);
//     }
// }

// const logout = async (req, res, next) => {
//     try {
        
//         res.clearCookie('accessToken');
//         res.status(200).json({success: true, message: "User logout successfully!"});

//     } catch (error) {
//         next(error);
//     }
// }



// // Durgesh 13 March

// const forgotPassword = async (req,res,next)=>{

// try{

// const {email,phone} = req.body;

// if(!email || !phone){
// return next(createHttpError(400,"Email and Phone required"));
// }

// const user = await User.findOne({email,phone});

// if(!user){
// return next(createHttpError(404,"User not found"));
// }

// const emailOTP = otpGenerator.generate(6,{
// digits:true,
// upperCaseAlphabets:false,
// lowerCaseAlphabets:false,
// specialChars:false
// });

// const phoneOTP = otpGenerator.generate(6,{
// digits:true,
// upperCaseAlphabets:false,
// lowerCaseAlphabets:false,
// specialChars:false
// });

// user.emailOTP = emailOTP;
// user.phoneOTP = phoneOTP;
// user.otpExpire = Date.now() + 5*60*1000;

// await user.save();

// await sendEmail(email,emailOTP);

// console.log("Mobile OTP:",phoneOTP);

// res.status(200).json({
// success:true,
// message:"OTP sent to Email and Phone"
// });

// }catch(error){
// next(error);
// }

// };


// const verifyOTP = async (req,res,next)=>{

// try{

// const {email,emailOTP,phoneOTP} = req.body;

// const user = await User.findOne({email});

// if(!user){
// return next(createHttpError(404,"User not found"));
// }

// if(!user.otpExpire || user.otpExpire < Date.now()){
// return next(createHttpError(400,"OTP expired"));
// }

// if(user.emailOTP !== emailOTP || user.phoneOTP !== phoneOTP){
// return next(createHttpError(400,"Invalid OTP"));
// }

// res.status(200).json({
// success:true,
// message:"OTP verified"
// });

// }catch(error){
// next(error);
// }

// };



// const resetPassword = async (req,res,next)=>{

// try{

// const {email,newPassword} = req.body;

// const user = await User.findOne({email});

// if(!user){
// return next(createHttpError(404,"User not found"));
// }

// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(newPassword, salt);

// user.emailOTP = null;
// user.phoneOTP = null;
// user.otpExpire = null;

// await user.save();

// res.status(200).json({
// success:true,
// message:"Password reset successful"
// });

// }catch(error){
// next(error);
// }

// };


// // module.exports = { register, login, getUserData, logout }

// module.exports = {register,login,getUserData,logout,forgotPassword,verifyOTP,resetPassword };



const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const otpGenerator = require("otp-generator"); //  Durgesh 13 March 2026
const sendEmail = require("../Utils/sendEmail");;

const twilio = require("twilio");
const twilioClient = twilio(config.twilioAccountSid, config.twilioAuthToken);

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        if(!name || !phone || !email || !password || !role){
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            const error = createHttpError(400, "User already exist!");
            return next(error);
        }

        const user = { name, phone, email, password, role };
        const newUser = User(user);
        await newUser.save();

        res.status(201).json({success: true, message: "New user created!", data: newUser});

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        const isUserPresent = await User.findOne({email});
        
        if(!isUserPresent){
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, isUserPresent.password);
        if(!isMatch){
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }

        const accessToken = jwt.sign({_id: isUserPresent._id}, config.accessTokenSecret, {
            expiresIn : '1d'
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        res.status(200).json({success: true, message: "User login successfully!", 
            data: isUserPresent
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUserData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({success: true, message: "User logout successfully!"});
    } catch (error) {
        next(error);
    }
}


const forgotPassword = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        if(!email || !phone){
            return next(createHttpError(400, "Email and Phone required"));
        }

        const user = await User.findOne({email, phone});

        if(!user){
            return next(createHttpError(404, "User not found"));
        }

        // Generate OTPs
        const emailOTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const phoneOTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // Update user OTP and expiry
        user.emailOTP = emailOTP;
        user.phoneOTP = phoneOTP;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

        await user.save();

        // **Step 1: Email OTP bhejo**
        try {
            await sendEmail(email, emailOTP);
            console.log("Email OTP sent successfully");
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return next(createHttpError(500, "Failed to send email OTP"));
        }

        // Mobile OTP 
        try {
            await twilioClient.messages.create({
                body: `Your OTP is: ${phoneOTP}. Valid for 5 minutes.`,
                from: config.twilioPhoneNumber, 
                to: phone 
            });
            console.log("Mobile OTP sent successfully to:", phone);
        } catch (smsError) {
            console.error("SMS sending failed:", smsError);
            return next(createHttpError(500, "Failed to send SMS OTP"));
        }

        res.status(200).json({
            success: true,
            message: "OTP sent to Email and Phone successfully"
        });

    } catch (error) {
        console.error("Error in forgotPassword:", error);
        next(error);
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const { email, emailOTP, phoneOTP } = req.body;

        if(!email || !emailOTP || !phoneOTP) {
            return next(createHttpError(400, "Email and both OTPs are required"));
        }

        const user = await User.findOne({email});

        if(!user){
            return next(createHttpError(404, "User not found"));
        }

        // Check OTP expiry
        if(!user.otpExpire || user.otpExpire < Date.now()){
            return next(createHttpError(400, "OTP expired. Please request new OTP"));
        }

        // Verify both OTPs
        if(user.emailOTP !== emailOTP){
            return next(createHttpError(400, "Invalid Email OTP"));
        }

        if(user.phoneOTP !== phoneOTP){
            return next(createHttpError(400, "Invalid Phone OTP"));
        }

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error("Error in verifyOTP:", error);
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        if(!email || !newPassword) {
            return next(createHttpError(400, "Email and new password are required"));
        }

        const user = await User.findOne({email});

        if(!user){
            return next(createHttpError(404, "User not found"));
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear OTP fields
        user.emailOTP = null;
        user.phoneOTP = null;
        user.otpExpire = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.error("Error in resetPassword:", error);
        next(error);
    }
};

module.exports = {
    register,
    login,
    getUserData,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword
};