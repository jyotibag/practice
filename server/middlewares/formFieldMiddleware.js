import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";

export const validateFormField = withValidationErrors([
  body("ffCatId").notEmpty().withMessage(`Select a category`),
  body("ffLabel")
    .notEmpty()
    .withMessage(`Form label is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Form label must be between 3 to 255 characters`),
  body("ffType").notEmpty().withMessage(`Select a form field type`),
  body("fieldOptions")
    .if(body("ffType").isIn(["checkbox", "radio", "dropdown"]))
    .isArray({ min: 1 })
    .withMessage(`Options are required`),
]);
