const { append } = require('express/lib/response');
const User = require('../models/userModel');

const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    if (endIndex < (await model.countDocuments().exex())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      result.results = await model.find().limit(limit).skip(startIndex);
      res.paginatedResult = result;
      next();
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
};

// app.get('/users', paginate(users), (req, res)=>{
//     res.json(res.paginatedResult())
// })

// app.get('/send', async (req, res, next) => {
//   try {
//     let [page, size, sort] = req.query

//     if(!page) page = 1

//     if(!size) size = 10

//     const limit = parseInt(size)

//     const user = await User.find().sort(
//       {votes:1, _id: 1}).limit(limit)

//       res.send({page, size, info: user})
//   }catch(err){
//     res.sendStatus(500)
//   }
// })

module.exports = { paginate };
