const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct =
  ('/',
  async (req, res) => {
    const { product } = req.body;
    const newProduct = await Product.create(product);
    await Category.updateMany(
      { _id: newProduct.categories },
      { $push: { products: newProduct._id } }
    );
    return res.send(newProduct);
  });

const removeProduct =
  ('/:id',
  async (req, res) => {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    await product.remove();
    await Category.updateMany(
      { _id: product.categories },
      { $pull: { products: product._id } }
    );
    return res.redirect(product);
  });

const difference = (A, B) => {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
};

const updateProduct =
  ('/:id',
  async (req, res) => {
    const _id = req.params.id;
    const { product } = req.body;
    const newCategories = product.categories || [];

    const oldProduct = await Product.findById({ _id });
    const oldCategories = oldProduct.categories;

    Object.assign(oldProduct.product);
    const newProduct = await oldProduct.save();

    const added = difference(newCategories, oldCategories);
    const removed = difference(oldCategories, newCategories);
    await Category.updateMany(
      { _id: added },
      { $addToSet: { products: foundProduct._id } }
    );
    await Category.updateMany(
      { _id: removed },
      { $pull: { products: foundProduct._id } }
    );

    return res.send(newProduct);
  });

module.exports = { getProducts, createProduct, updateProduct, removeProduct };
