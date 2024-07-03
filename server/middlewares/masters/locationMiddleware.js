import { body } from "express-validator";
import { withValidationErrors } from "../withErrorMiddleware.js";
import slug from "slug";
import pool from "../../db.js";
import { BadRequestError } from "../../errors/customErrors.js";

export const validateLocation = withValidationErrors([
  body("stateName").notEmpty().withMessage(`Select state`),
  body("city")
    .notEmpty()
    .withMessage(`City name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`City name must be between 3 to 255 characters`)
    .bail()
    .custom(async (value, { req }) => {
      const citySlug = slug(value);
      const { id } = req.params;
      const { stateName } = req.body;
      const append = id ? ` and id!=$3` : ``;
      const values = id ? [citySlug, stateName, id] : [citySlug, stateName];
      const check = await pool.query(
        `select count(id) from master_locations where slug=$1 and state=$2 ${append}`,
        values
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`City exists`);
      }
    }),
]);
