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
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    res.status(400);
    throw new Error('Please Fill all the feilds');
  } else {
    const newProduct = new Product({
      user: req.user._id,
      name,
      description,
      category,
      price,
    });

    const createdProduct = await newProduct.save();

    res.status(201).json(createdProduct);
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

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, category, price } = req.body;

  const product = await Product.findById(req.params.id);

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (product) {
    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
