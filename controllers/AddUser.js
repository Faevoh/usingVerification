const AddUser = require("../models/Adduser");
const sendEmail = require("../utils/Email")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.newUser = async(req,res)=>{
    try{
        const {fullName, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullName,
            email, 
            password: hash,
        }
        const createUser = new AddUser(data)
        const myToken = jwt.sign({
            id:createUser._id,
            password: createUser.password,
            isAdmin: createUser.isAdmin
        }, process.env.JWT_TOKEN, {expiresIn: "1d"});

        createUser.token = myToken;
        await createUser.save(); 

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`;
        const message = `Thank you for registering with our app. Please click this link ${VerifyLink} to verify your account`
        sendEmail({
            email: createUser.email,
            subject: "Kindly Verify your account",
            message,
        });
        // console.log(createUser._id)

        res.status(201).json({
            message: "User Created",
            data: createUser
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body
        const check = await AddUser.findOne({ email: email}); 
        if(!check) return res.status(404).json({message: "Not Found"});
        const IsPassword = await bcryptjs.compare(password, check.password)
        if(!IsPassword) return res.status(404).json({message: "Email or Password incorrect"});

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            isAdmin: check.isAdmin
        }, process.env.JWT_TOKEN,{ expiresIn: "1d"});

        check.token = myToken
        await check.save()
        
        res.status(201).json({
            message: "Successful",
            data: check
        });
     }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};

// console.log("is node reading line 76?")
exports.Userverify = async(req,res)=>{
    try{
        const userid = req.params.userid;
        // console.log(userid)
        const user = await AddUser.findOne({userid})
        // console.log(user)

        await AddUser.findByIdAndUpdate(
            user._id,
            {
                verify : true
            },
            {
                new: true
            }
        )

        res.status(200).json({
            message: "You have been verified"
        });
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};

// exports.forgotPassword = async(req,res)=>{
//     try{
//         const {email} = req.body;
//         const checkEmail = await AddUser.findOne({ email: email});
//         if(!checkEmail) return res.status(404).json({message: "User with this email not  Found"});

//         const myToken = jwt.sign({
//             id: checkEmail._id,
//             isAdmin: checkEmail.isAdmin
//         }, process.env.JWT_TOKEN,{ expiresIn: "5min"});

//         checkEmail.token = myToken

//         // const Forgotpassword = `${req.protocol}://${req.get("host")}/api/resetPassword/${checkEmail._id}`;
//         const Forgotpassword = "Link"
//         const message = `You requested for a change of password, Kindly click the link ${Forgotpassword} to reset password`
//        sendEmail({
//           email: createUser.email,
//           subject: "Reset Password",
//           message,
//         });
//         console.log(checkEmail._id)

//         res.status(200).json({
//             message: "successful",
//         });
//     }catch(e){
//        res.status(400).json({
//           message: e.message
//         });
//     }
// }