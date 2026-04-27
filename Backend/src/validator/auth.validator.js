import { body, validationResult } from 'express-validator';


function validationRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();

}

export const userValidator = [
    body("email").isEmail().withMessage('Invalid Email Format'),
    body("contact").notEmpty().withMessage('Contact is required').matches(/^\d(10)$/).withMessage('contact must be 10 digit number'),
    body("password").isLength({ min: 6 }).withMessage("Password must be long for 6 digits"),
    body("fullname").notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('fullname length must be min 3 letters'),
    body("isSeller").isBoolean().withMessage("isSeller mus be boolean value"),
    validationRequest

]