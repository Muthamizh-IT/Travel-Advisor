const mongoose = require('mongoose');
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const RegisterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userName: {
      type: String,
    },
    monthlyIncome: {
      type: Number,
    },
    mobileNumber: {
      type: String,
    },
    Password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
  
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
RegisterSchema.methods.isPasswordMatch = async function (Password) {
  const user = this;
  return bcrypt.compare(Password, user.Password);
};

RegisterSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('Password')) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
});

const Budgetuser = mongoose.model('ExpenseUser', RegisterSchema);

module.exports = Budgetuser;
