const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel.js');
const token = require('../../utils/generateToken.js');

//@description     Get the users
//@route           GET /api/users
//@access          Private
const getUsers = async (req, res) => {
  try {
    const users = User.find();
    const response = await users;
    const data = await res.json({ response });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

//@description     Get a single user
//@route           GET /api/users/user._id
//@access          Public
const getUser = async (req, res) => {
  const user = await User.findById(req.params._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, pic, password, phone } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.pic = pic || user.pic;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: token.generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

//@description     Delete a user
//@route           POST /api/users/delete/user._id
//@access          Private
const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params._id });

    if (!user) {
      res.status(400);
      throw new Error('User Not Found!');
    } else {
      res.status(201).json({
        message: `User deleted successfully!`,
      });
    }
  } catch (error) {
    throw new Error('Error occured while deleting user');
  }
};

module.exports = {
  getUsers,
  getUser,
  authUser,
  updateUserProfile,
  registerUser,
  deleteUser,
};
