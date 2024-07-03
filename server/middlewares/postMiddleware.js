import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";

export const validatePostForm = withValidationErrors([
  body("category").notEmpty().withMessage(`Select a category`),
  body("subCategory").custom(async ({ req }) => {
    const { category } = req.body;
    const count = await pool.query(
      `select count(*) from master_categories where parent_id=$1 and is_active=true`,
      [Number(category)]
    );
    if (+count.rows[0].count > 0) {
      throw new BadRequestError(`Select a sub-category`);
    }
    return true;
  }),
  body("title")
    .notEmpty()
    .withMessage(`Title is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Title must be between 3 to 255 characters`),
]);

export const validateDynamic = async (req, res, next) => {
  const { subCategory } = req.body;
  const data = await pool.query(
    `select field_name, field_label, is_required from master_form_fields where cat_id=$1 and is_active=true`,
    [+subCategory]
  );

  //   console.log(data.rows[0].field_name);

  if (!req.data.rows[0].field_name) {
    throw new BadRequestError(`${data.rows[0].field_label} is required`);
  }
  console.log(`next`);

  //   next();
};
