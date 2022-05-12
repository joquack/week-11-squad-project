const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("../utils");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
} = require("../../auth");
