import { Router } from "express";
const router = Router();
import { allRoles } from "../controllers/masters/roleController.js";
import {
  addCategory,
  pageCategories,
  deleteCategory,
  editCategory,
  allCategories,
  getChildCategories,
  parentCategories,
  getFormFieldWithOptions,
} from "../controllers/masters/categoryController.js";
import { validateAddCategory } from "../middlewares/masters/categoryMiddleware.js";
import {
  addBrand,
  allBrands,
  categoryBrands,
  deleteBrand,
  editBrand,
  pageBrands,
} from "../controllers/masters/brandController.js";
import { validateAddBrand } from "../middlewares/masters/brandMiddleware.js";
import {
  addModel,
  allModels,
  deleteModel,
  pageModels,
  updateModel,
} from "../controllers/masters/modelController.js";
import { validateModel } from "../middlewares/masters/modelMiddleware.js";
import {
  addLocation,
  deleteLocation,
  getAllStates,
  pageLocations,
  updateLocation,
} from "../controllers/masters/locationController.js";
import { validateLocation } from "../middlewares/masters/locationMiddleware.js";
import {
  addFormField,
  deleteFormField,
  pageFormFields,
  updateFormField,
} from "../controllers/formFields/formFieldController.js";
import { validateFormField } from "../middlewares/formFieldMiddleware.js";

router.get(`/roles`, allRoles);

// ------
router
  .route(`/categories`)
  .get(pageCategories)
  .post(validateAddCategory, addCategory);

router
  .route(`/categories/:id`)
  .put(validateAddCategory, editCategory)
  .delete(deleteCategory);

router.get(`/categories/all`, allCategories);
router.get(`/categories/sub/:id`, getChildCategories);
router.get(`/categories/parents`, parentCategories);

// ------
router.route(`/brands`).get(pageBrands).post(validateAddBrand, addBrand);
router.route(`/brands/:id`).put(editBrand).delete(deleteBrand);

router.get(`/brands/all`, allBrands);
router.get(`/brands/category/:catid`, categoryBrands);

// ------
router.route(`/models`).get(pageModels).post(validateModel, addModel);
router.route(`/models/:id`).put(validateModel, updateModel).delete(deleteModel);

router.get(`/models/all`, allModels);

// ------
router
  .route(`/locations`)
  .get(pageLocations)
  .post(validateLocation, addLocation);
router
  .route(`/locations/:id`)
  .put(validateLocation, updateLocation)
  .delete(deleteLocation);

router.get(`/locations/states`, getAllStates);

// ------
router
  .route(`/formFields`)
  .get(pageFormFields)
  .post(validateFormField, addFormField);
router
  .route(`/formFields/:id`)
  .put(validateFormField, updateFormField)
  .delete(deleteFormField);

// ------
router.get(`/form-fields-with-options/:catid`, getFormFieldWithOptions);

export default router;
