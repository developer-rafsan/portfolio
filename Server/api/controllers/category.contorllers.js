import { createCategoryModel } from "../model/categoryCreact.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";

// create category option for admin
export const createCategory = async (req, res, next) => {
  const category = req.body.category.toLowerCase();
  const password = req.body.password;

  if (!category)
    return next(customErrorHandel(402, "place enter category fill"));

  if (password !== process.env.PASSWORD)
    return next(customErrorHandel(402, "invalid credentials"));

  const findCategory = await createCategoryModel.find({ category });

  if (findCategory.length)
    return next(customErrorHandel(402, "all ready exite"));

  try {
    await createCategoryModel.create({ category });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category created success",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

// gat all category
export const getAllCategory = async (req, res, next) => {
  try {
    const findCategory = await createCategoryModel.find();

    if (!findCategory.length)
      return next(customErrorHandel(402, "category not found"));

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category get success",
      data: findCategory,
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

// delete category for admin
export const deleteCategory = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const findCategory = await createCategoryModel.findByIdAndDelete({ _id });
    if (!findCategory.length)
      return next(customErrorHandel(402, "category not found"));

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category delete suscess",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};
