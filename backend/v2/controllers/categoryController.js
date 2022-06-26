const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');

const createCategory =
  ('/',
  async (req, res) => {
    const { category } = req.body;
    const newCategory = await Category.create(category);
    await Category.updateMany(
      { _id: newCategory.products },
      { $push: { categories: newCategory._id } }
    );
    return res.send(newCategory);
  });

const removeCategory =
  ('/:id',
  async (req, res) => {
    const _id = req.params.id;
    const category = await Category.findOne({ _id });
    await category.remove();
    await Product.updateMany(
      { _id: category.products },
      { $pull: { categories: category._id } }
    );
    return res.redirect(category);
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

const updateCategory =
  ('/:id',
  async (req, res) => {
    const _id = req.params.id;
    const { category } = req.body;
    const newProducts = category.products || [];

    const oldCategory = await Category.findById({ _id });
    const oldProducts = oldCategory.products;

    Object.assign(oldCategory.category);
    const newCategory = await oldCategory.save();

    const added = difference(newProducts, oldProducts);
    const removed = difference(oldProducts, newProducts);
    await Product.updateMany(
      { _id: added },
      { $addToSet: { categories: foundCategory._id } }
    );
    await Product.updateMany(
      { _id: removed },
      { $pull: { categories: foundCategory._id } }
    );

    return res.send(newCategory);
  });

module.exports = { createCategory, updateCategory, removeCategory };
