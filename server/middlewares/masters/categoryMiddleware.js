import { body } from "express-validator";
import { withValidationErrors } from "../withErrorMiddleware.js";
import { BadRequestError } from "../../errors/customErrors.js";
import slug from "slug";
import pool from "../../db.js";

export const validateAddCategory = withValidationErrors([
  body("parentId").custom((value, { req }) => {
    const { isParent } = req.body;
    if (!isParent && !value) {
      throw new BadRequestError(`Select parent category`);
    }
    return true;
  }),
  body("category")
    .custom((value, { req }) => {
      const { isParent } = req.body;
      if (isParent && !value) {
        throw new BadRequestError(`Category name is required`);
      }
      return true;
    })
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const cslug = slug(value);

      const append = id ? ` and id!=$2` : ``;
      const values = id ? [cslug, id] : [cslug];

      const check = await pool.query(
        `select count(id) from master_categories where slug=$1 ${append}`,
        values
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Category exists`);
      }
      return true;
    }),
]);
