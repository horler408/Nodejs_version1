const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
