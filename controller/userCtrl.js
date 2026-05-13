const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../config/refreshtoken");
const { generateToken } = require("../config/jwtToken");
const userModel = require("../models/userModel");


// register user
const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(404).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists",
      });
    }

    const newUser = await new userModel({
      username,
      phone,
      email,
      password,
      role
    }).save();

    res.json(newUser);

  } catch (error) {
    return res.status(500).send({
      message: "Error While Creating User",
      success: false,
      error,
    });
  }
})


// user login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await userModel.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken
      },
      { new: true }
    );
    console.log(updateUser,"jrhtiuo")
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      username: findUser?.username,
      phone: findUser?.phone,
      email: findUser?.email,
      token: generateToken(findUser?._id),
    })
  } else {
    throw new Error("Invalid Credentials");
  }
})

// admin login
const loginAdminCtrl = async (req, res) => {
  try {
    console.log(req.body, "Login attempt");

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user
    const findAdmin = await userModel.findOne({ email });
    if (!findAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // check role
    if (findAdmin.role !== "admin") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // check password
    const isMatched = await findAdmin.isPasswordMatched(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // generate tokens
    const refreshToken = await generateRefreshToken(findAdmin._id);
    await userModel.findByIdAndUpdate(
      findAdmin._id,
      { refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only for https
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin._id,
      email: findAdmin.email,
      token: generateToken(findAdmin._id),
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};


// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("No refresh token available in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await userModel.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});


const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = { createUser, loginAdminCtrl, loginUserCtrl, handleRefreshToken, getAllUsers, deleteUsers };