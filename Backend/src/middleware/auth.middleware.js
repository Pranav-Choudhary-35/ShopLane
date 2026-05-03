import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import userModel from '../models/user.model.js';

// Middleware to verify JWT token and ensure user has seller role
// Used to protect seller-only endpoints like product creation and variant management
export const authenticateSeller = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token ' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (user.role !== "seller") {
            return res.status(403).json({ message: 'Forbidden' })
        }
        
        req.user = user
        next()

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }
}

// Middleware to verify JWT token for any authenticated user (buyer or seller)
// Validates token and adds user object to request for downstream handlers
export const authenticateUser = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token ' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
