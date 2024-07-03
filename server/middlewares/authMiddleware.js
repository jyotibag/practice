import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import { isMobileNumber } from "../utils/formatValidations.js";
import pool from "../db.js";
import { checkPassword } from "../utils/passwordUtils.js";

// ------
export const validateLogin = withValidationErrors([
  body("username").notEmpty().withMessage(`Username is required`),
  body("password").notEmpty().withMessage(`Password is required`),
]);

// ------
export const protectRoute = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError(`No token found! Login required`);
  }
  try {
    const { uuid } = verifyJWT(token);
    req.user = { uuid };
    next();
  } catch (error) {
    throw new UnauthenticatedError(`User does not exist! Login required`);
  }
};

// ------
export const mindUrOwnPage = async (req, res, next) => {
  const { token } = req.cookies;
  const { uuid } = verifyJWT(token);
  const { slug } = req.params;
  const user = await pool.query(`select slug from master_users where uuid=$1`, [
    uuid,
  ]);
  if (slug !== user.rows[0].slug) {
    throw new BadRequestError(`You are in the wrong page!`);
  }
  next();
};

// ------
export const checkAccess = async (req, res) => {
  const { token } = req.cookies;
  const { uuid } = verifyJWT(token);
  const { path } = req.params;
};

// ------
export const validateRegister = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage(`First name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`First name must be between 3 to 255 characters`),
  body("lastName")
    .notEmpty()
    .withMessage(`Last name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Last name must be between 3 to 255 characters`),
  body("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .bail()
    .isEmail()
    .withMessage(`Invalid email entered`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Email must be between 3 to 255 characters`)
    .bail()
    .custom(async (value) => {
      const check = await pool.query(
        `select count(*) from master_users where email=$1`,
        [value]
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Email exists`);
      }
      return true;
    }),
  body("mobile")
    .notEmpty()
    .withMessage(`Mobile no. is required`)
    .bail()
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no. entered`)
    .bail()
    .custom(async (value) => {
      const check = await pool.query(
        `select count(*) from master_users where mobile=$1`,
        [value]
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Mobile no. exists`);
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage(`Password is required`)
    .bail()
    .isStrongPassword({
      minLength: 6,
      maxLength: 15,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password must be at least 8 characters long + contain at least one uppercase letter + one lowercase letter + one number + one symbol`
    ),
  body("passwordConfirm")
    .if((value, { req }) => req.body.password)
    .notEmpty()
    .withMessage(`Re-enter password`)
    .bail()
    .custom((value, { req }) => {
      const { password } = req.body;
      if (value !== password) {
        throw new BadRequestError(`Passwords do not match`);
      }
      return true;
    }),
  body("tnc")
    .if((value, { req }) => req.body.passwordConfirm)
    .custom((value) => {
      if (!value) {
        throw new BadRequestError(`Please check our Terms and Conditions`);
      }
      return true;
    }),
]);

// ------
export const validateForgotPass = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .bail()
    .custom(async (value) => {
      const check = await pool.query(
        `select count(id) from master_users where email=$1 and is_active=true`,
        [value]
      );
      if (value && Number(check.rows[0].count) === 0) {
        throw new BadRequestError(`Email does not exist`);
      }
      return true;
    }),
]);

// ------
export const validateResetPass = withValidationErrors([
  body("otp")
    .notEmpty()
    .withMessage(`Enter password reset OTP`)
    .bail()
    .custom(async (value, { req }) => {
      const { tokenEnc } = req.body;
      const check = await checkPassword(value, tokenEnc);
      if (!check) {
        throw new BadRequestError(`Incorrect OTP entered`);
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage(`Enter new password`)
    .bail()
    .isStrongPassword({
      minLength: 6,
      maxLength: 15,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password must be at least 8 characters long + contain at least one uppercase letter + one lowercase letter + one number + one symbol`
    ),
  body("passwordConfirm")
    .notEmpty()
    .withMessage(`Re-enter password`)
    .bail()
    .custom((value, { req }) => {
      const { password } = req.body;
      if (value !== password) {
        throw new BadRequestError(`Passwords do not match`);
      }
      return true;
    }),
]);
