import Category from "../Models/Category.js";
import Product from "../Models/Products.js";
import { ProductType } from "../config/type.js";
import cloudinary from "cloudinary";

export const addProduct = async (req, res) => {
  const bodyParser = req.body;
  const { img } = req.files;
  const parsedPayload = ProductType.safeParse(bodyParser);
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

  if (!parsedPayload.success)
    return res.status(400).json({
      success: false,
      message: "Fill all details properly!",
      error: parsedPayload.error,
    });

  if (!allowedFormats.includes(img.mimetype))
    return res.status(400).json({
      success: false,
      message: "File format not supported!",
    });

  const isExists = await Product.findOne({ name: parsedPayload.data.name });

  if (isExists)
    return res.status(400).json({
      success: false,
      message: "Product name already taken!",
    });

  const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error)
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  const getCategory = await Category.find({ name: parsedPayload.data.category })

  const prodName = parsedPayload.data.name.toLowerCase();
  const product = await Product.create({
    name: prodName,
    imgUrl: cloudinaryResponse.secure_url,
    description: parsedPayload.data.description,
    quantity: parsedPayload.data.quantity,
    price: parsedPayload.data.price,
    isActive: parsedPayload.data.isActive,
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
  console.log(filter);
  const users = await Product.find({
    $and: [
      {
        name: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    product: users.map((user) => ({
      username: user.name,
      imgUrl: user.imgUrl,
      description: user.description,
      price: user.price,
      category: user.category,
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
    productsByCategory
  })
};
