import { body } from "express-validator";
import { withValidationErrors } from "../withErrorMiddleware.js";
import slug from "slug";
import pool from "../../db.js";
import { BadRequestError } from "../../errors/customErrors.js";

export const validateAddBrand = withValidationErrors([
  body("parentId").notEmpty().withMessage(`Select a category`),
  body("brand")
    .notEmpty()
    .withMessage(`Brand is required`)
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage(`Brand name must be between 2 to 255 characters`)
    .bail()
    .custom(async (value, { req }) => {
      const { id, parentId } = req.body;
      const bslug = slug(value);
      const append = id ? ` and id!=$2` : ``;
      const values = id ? [bslug, parentId, id] : [bslug, parentId];
      const check = await pool.query(
        `select count(id) from master_brands where slug=$1 and cat_id=$2 ${append}`,
        values
      );
      if (check.rows[0].count > 0) {
        throw new BadRequestError(`Brand exists`);
      }
    }),
]);
