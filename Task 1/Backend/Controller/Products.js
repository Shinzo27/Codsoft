import Category from "../Models/Category.js";
import Product from "../Models/Products.js";
import ErrorHandler from "../Middleware/ErrorHandler.js";
import { ProductType } from "../config/type.js";
import cloudinary from "cloudinary";

export const addProduct = async (req, res, next) => {
  const bodyParser = req.body;
  const { img } = req.files;
  const parsedPayload = ProductType.safeParse(bodyParser);
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

  if (!parsedPayload.success)
    return next(new ErrorHandler("Fill all the details properly!", 400))

  if (!allowedFormats.includes(img.mimetype)) return next(new ErrorHandler("File format not supported!", 400))

  const prodName = parsedPayload.data.name.toLowerCase();

  const isExists = await Product.findOne({ name: prodName });

  if (isExists) return next(new ErrorHandler("Product already exists!", 400))

  const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) return next(new ErrorHandler("Something went wrong!", 400))

  const getCategory = await Category.findOne({ name: parsedPayload.data.category })

  const product = await Product.create({
    name: prodName,
    imgUrl: cloudinaryResponse.secure_url,
    description: parsedPayload.data.description,
    quantity: parsedPayload.data.quantity,
    price: parsedPayload.data.price,
    category: getCategory._id
  });

  if (product)
    return res.status(200).json({
      success: true,
      message: "Product Added Successfully!",
    });
};

export const getProduct = async (req, res) => {
  const filter = req.query.filter || "";
  
  const products = await Product.find({
    $and: [
      {
        name: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    product: products.map((product) => ({
      _id: product._id,
      username: product.name,
      imgUrl: product.imgUrl,
      description: product.description,
      price: product.price,
      category: product.category,
    })),
  });
};

export const categoryProduct = async (req, res) => {
  const productsByCategory = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $group: {
        _id: "$category",
        categoryName: { $first: "$categoryDetails.name" },
        products: { $push: "$$ROOT" },
      },
    },
  ]);
  res.json({
    product: productsByCategory
  })
};
