import { body, validationResult } from 'express-validator';

// Middleware to handle validation result
const validationRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        return res.status(400).json({
            success: false,
            message: errorArray.map(e => e.msg).join(', '),
            errors: errorArray
        });
    }

    next();
};

// User validation rules
export const userValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid Email Format"),

    body("contact")
        .trim()
        .notEmpty()
        .withMessage("Contact is required")
        .matches(/^\d{10}$/)
        .withMessage("Contact must be a 10 digit number"),

    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("fullname")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Fullname must be at least 3 characters"),

    body("isSeller")
        .optional()
        .isBoolean()
        .withMessage("isSeller must be a boolean value")
        .toBoolean(),

    validationRequest
];


export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email Format"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    validationRequest
];