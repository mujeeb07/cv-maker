const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createToken } = require("../services/jwtService");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const {sub, name, email, picture } = payload;

        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({
                name,
                email,
                googleId: sub,
                avatar: picture
            });
        } else {
            if(!user.googleId) {
                user.googleId = sub;
                if(!user.avatar) user.avatar = picture;
                await user.save();
            }
        }

        const tokenJwt = createToken(user._id);

        res.status(201).json({token: tokenJwt, user})

    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({message: "Google login failed"});
    }
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Email and password required"});
        }

        let user = await User.findOne({email});

        if(user) {

            if(user.password) {
                return res.status(400).json({message:"User already exists"});
            }

            const hashed = await bcrypt.hash(password, 10);
            user.password = hashed;

            if(user && !user.name) user.name = name;
            await user.save();

            const token = createToken(user._id);
            return res.status(201).json({token, user});
        }

        const hashed =  await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = createToken(user._id);
        res.status(201).json({token, user});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Register Failed"});
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Mail and Password from frontend:', req.body)
        if(!email || !password) {
            res.status(400).json({message:"email and password required"});
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        if(!user.password) {
            res.status(400).json(
                { message: "This account uses Google login. Please login with Google or set a password." }
            )
        }

        const ok = await bcrypt.compare(password, user.password);

        if(!ok) {
            res.status(400).json({message: "Invalid credentials"})
        }

        const token = createToken(user._id);

        res.status(200).json({token, user});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message:"Login Failed"});
    }
}

module.exports = { register, login, googleLogin };