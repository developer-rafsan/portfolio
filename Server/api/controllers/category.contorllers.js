import { createCategoryModel } from "../model/categoryCreact.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";

// create category option for admin
export const createCategory = async (req, res, next) => {
  try {
    const { category: rawCategory, password } = req.body;
    const category = rawCategory?.toLowerCase();

    // Validate inputs
    if (!category) {
      return next(customErrorHandel(402, "Please enter category field"));
    }

    if (password !== process.env.PASSWORD) {
      return next(customErrorHandel(402, "Invalid credentials"));
    }

    // Check for existing category
    const existingCategory = await createCategoryModel.findOne({ category });
    if (existingCategory) {
      return next(customErrorHandel(402, "Category already exists"));
    }

    // Create new category
    await createCategoryModel.create({ category });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category created successfully",
    });

  } catch (error) {
    return next(customErrorHandel());
  }
};

// gat all category
export const getAllCategory = async (req, res, next) => {
  try {
    const { search = "" } = req.query;

    // Build query with case-insensitive search
    const query = {
      category: { $regex: search, $options: "i" }
    };

    // Find categories matching query
    const findCategory = await createCategoryModel.find(query)
      .sort({ createdAt: -1 })
      .lean();

    if (!findCategory.length) {
      return next(customErrorHandel(402, "category not found"));
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category get success",
      total: findCategory.length,
      data: findCategory,
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

// delete category for admin
export const deleteCategory = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    
    const deletedCategory = await createCategoryModel.findByIdAndDelete(_id);
    
    if (!deletedCategory) {
      return next(customErrorHandel(402, "category not found"));
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category deleted successfully"
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};
