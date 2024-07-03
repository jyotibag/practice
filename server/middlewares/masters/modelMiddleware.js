import { body } from "express-validator";
import { withValidationErrors } from "../withErrorMiddleware.js";
import slug from "slug";
import pool from "../../db.js";
import { BadRequestError } from "../../errors/customErrors.js";

export const validateModel = withValidationErrors([
  body("catId").notEmpty().withMessage(`Select a category`),
  body("brandId").notEmpty().withMessage(`Select a brand`),
  body("modelName")
    .notEmpty()
    .withMessage(`Model name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Model name must be between 3 to 255 characters`)
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const { catId, brandId } = req.body;
      const modelSlug = slug(value);
      const append = id ? ` and id!=$4` : ``;
      const values = id
        ? [catId, brandId, modelSlug, id]
        : [catId, brandId, modelSlug];
      const check = await pool.query(
        `select count(id) from master_make_models where cat_id=$1 and brand_id=$2 and model_slug=$3 ${append}`,
        values
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Model exists`);
      }
      return true;
    }),
]);
