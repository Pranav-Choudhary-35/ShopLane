import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/config.js";

//Set token and token response

async function sendTokenResponse(user, res, message) {

    const token = jwt.sign(
        {
            id: user._id
        }, config.JWT_SECRET, { expiresIn: "10d" }
    )

    res.cookie("token", token);

    res.status(200).json({
        message,
        token,
        user: {
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

}


//Register Controller

export async function register(req, res) {


    const { email, contact, password, fullname, isSeller } = req.body;


    try {
        const isUserExist = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })


        if (isUserExist) {
            return res.status(400).json({
                message: 'Sorry this user is alread exist'
            })
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "user register sucessfully");

    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }



}


//Login Controller

export async function login(req, res) {


}