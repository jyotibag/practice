import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { isMobileNumber } from "../utils/formatValidations.js";

export const validateUser = withValidationErrors([
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
    .custom(async (value, { req }) => {
      const { userId } = req.params;
      const append = userId ? ` and id!=$2` : ``;
      const values = userId ? [value, userId] : [value];
      const check = await pool.query(
        `select count(*) from master_users where email=$1 ${append}`,
        values
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
    .custom(async (value, { req }) => {
      const { userId } = req.params;
      const append = userId ? ` and id!=$2` : ``;
      const values = userId ? [value, userId] : [value];
      const check = await pool.query(
        `select count(*) from master_users where mobile=$1 ${append}`,
        values
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Mobile no. exists`);
      }
      return true;
    }),
  body("roleId")
    .notEmpty()
    .withMessage(`Select a role`)
    .bail()
    .custom(async (value) => {
      if (value) {
        const check = await pool.query(
          `select count(*) from role_master where id=$1`,
          [Number(value)]
        );
        if (Number(check.rows[0].count) === 0) {
          throw new BadRequestError(`Dont try to fuck with the system Dude!!`);
        }
        return true;
      }
    }),
]);
