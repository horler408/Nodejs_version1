const cloudinary = require('cloudinary').v2;

const asyncHandler = require('express-async-handler');

const Product = require('../../models/productModel');
const upload = require('../../middleware/multer');

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
  const { name, description, category, price, user } = req.body;

  if (!name || !description || !category || !price) {
    res.status(400);
    throw new Error('Please Fill all the feilds');
  } else {
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      console.log('file uploaded to server');

      // SEND FILE TO CLOUDINARY
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
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
          console.log(image);
          const newProduct = new Product({
            user,
            name,
            description,
            category,
            price,
            imageUrl: image.url,
          });

          const createdProduct = await newProduct.save();

          res.status(201).json(createdProduct);
        }
      );
    });
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
// const updateProduct = asyncHandler(async (req, res) => {
//   const { title, description, category, price } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (product) {
//     product.name = name;
//     product.description = description;
//     product.category = category;
//     product.price = price;

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

const updateProduct = asyncHandler((req, res) => {
  const { name, description, price, category } = req.body;
  let product = new Product({ _id: req.params.id });

  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
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
        product.imageUrl = image.url;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      }
    );
  });
});

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
