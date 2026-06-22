const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        };

        const existingEmail = await User.find({ email });

        if (existingEmail.length > 0) {
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

        res.status(201).json({
            message: "User Created Successfully",
            user: newUser
        });
    } catch (error) {
        console.error("Error Creating User: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

};

const userLogin = async (req, res) => {

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

        return res.status(200).json({
            message: "Login Successful",
            user: user
        });
        
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