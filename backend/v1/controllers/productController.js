const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');

const Product = require('../../models/productModel');

// @desc    Get logged in user products
// @route   GET /api/product
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  if (category) {
    const products = await Product.find().filter((product) =>
      product.toLowerCase().includes(category)
    );
    res.json(products);
  }

  const products = await Product.find();
  res.json(products);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

//@description     Create a product
//@route           GET /api/products/create
//@access          Private
const createProduct = asyncHandler((req, res) => {
  const {
    name,
    description,
    category,
    price,
    ratings,
    inStock,
    expressDelivery,
  } = req.body;

  if (!name || !description || !category || !price || !ratings) {
    res.status(400);
    throw new Error('Please Fill all the feilds');
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `ecommerce/${uniqueFilename}`, tags: `horler` },
      async function (err, image) {
        //if (err) return res.send(err)
        if (err) {
          res.status(400).json({
            message: 'Error occurred',
          });
        }
        console.log('file uploaded to Cloudinary');

        // return image details
        // console.log(image);
        const newProduct = new Product({
          user: req.user._id,
          name,
          description,
          category,
          price,
          ratings,
          inStock,
          expressDelivery,
          imageUrl: image.url,
        });

        const createdProduct = await newProduct.save();

        res.status(201).json(createdProduct);
      }
    );
  }
});

//@description     Delete single Product
//@route           GET /api/products/:id
//@access          Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed Successfully' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

//@description     Update single Product
//@route           GET /api/products/:id
//@access          Private
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    ratings,
    inStock,
    expressDelivery,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `ecommerce/${uniqueFilename}`, tags: `horler` },
      async function (err, image) {
        if (err) return res.send(err);
        console.log('file uploaded to Cloudinary');

        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;
        product.ratings = ratings;
        product.inStock = inStock;
        product.expressDelivery = expressDelivery;
        product.imageUrl = image.url;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      }
    );
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
