import Product from '../Models/Products.js'
import { ProductType } from '../config/type.js'
import cloudinary from 'cloudinary'

export const displayProducts = async(req,res) => {
    const products = await Product.find({})
    res.status(200).json({
        products
    })
}

export const addProduct = async(req,res) => {
    const bodyParser = req.body
    const { img } = req.files
    const parsedPayload = ProductType.safeParse(bodyParser)
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"]

    if(!parsedPayload.success) return res.status(400).json({
        success: false,
        message: "Fill all details properly!",
        error: parsedPayload.error
    })

    if(!allowedFormats.includes(img.mimetype)) return res.status(400).json({
        success: false,
        message: "File format not supported!"
    })

    const isExists = await Product.findOne({ name: parsedPayload.data.name })

    if(isExists) return res.status(400).json({
        success: false,
        message: "Product name already taken!"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath)

    if(!cloudinaryResponse || cloudinaryResponse.error) return res.status(400).json({
        success: false,
        message: "Something went wrong!"
    })

    const product = await Product.create({
        name: parsedPayload.data.name,
        imgUrl: cloudinaryResponse.secure_url,
        description: parsedPayload.data.description,
        quantity: parsedPayload.data.quantity,
        price: parsedPayload.data.price,
        isActive: parsedPayload.data.isActive,
        category: parsedPayload.data.category
    })

    if(product) return res.status(200).json({
        success: true,
        message: "Product Added Successfully!"
    })
}

