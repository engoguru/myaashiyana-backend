const express = require('express');
const {  loginAdminCtrl, handleRefreshToken, loginUserCtrl, createUser, getAllUsers, deleteUsers } = require('../controller/userCtrl');

const router = express.Router();

router.post("/register", createUser);
router.post("/login__user", loginUserCtrl);
router.post("/login__admin", loginAdminCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUsers);

module.exports = router;