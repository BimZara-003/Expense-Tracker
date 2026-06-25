const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => { // User Registration Logic
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        };

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "A User with this Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ // Successful User Creation Response
            message: "User Created Successfully",
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error Creating User: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

};

const userLogin = async (req, res) => { // User Login Logic

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and Password are required"
            });
        };

        const user = await User.findOne({ email });

        if (!user) {
            console.log("Email not Found")
            return res.status(404).json({
                error: "Email not Found"
            })
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("Login Failed: Incorrect Passowrd")
            return res.status(400).json({
                error: "Incorrect Password. Please Try Again"
            });
        };

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'}); //JWT Token Generation

        return res.status(200).json({ //Successful Login Response
            message: "Login Successful",
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token,
            userId: user._id
        });

        console.log(req.body) //For DEBUGGING
        
    } catch (error) {
        console.log("Login Error",error)
        return res.status(400).json({
            error: "Login Error"
        })
        
    }
};

module.exports = {
    createUser,
    userLogin
};