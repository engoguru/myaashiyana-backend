const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user",
        // required: true
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwrodResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
}
);

// bcrypt password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// compare password
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.isValidEmailFormat = async function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// create reset token
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwrodResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // these are 10 minutes
    return resetToken;
}


module.exports = mongoose.model("User", userSchema);