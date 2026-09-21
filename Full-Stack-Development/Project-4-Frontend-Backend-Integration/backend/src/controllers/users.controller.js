const userService = require("../services/user.service");
const { DuplicateEmailError } = require("../models/user.model");
const {
  validateCreateBody,
  validateId,
  validatePatchBody,
} = require("../validation/user.validation");

function listUsers(_req, res) {
  const users = userService.listUsers();
  return res.status(200).json({ success: true, data: users });
}

function getUserById(req, res) {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid user id" },
    });
  }

  const user = userService.getUserById(Number(id));
  if (!user) {
    return res.status(404).json({
      success: false,
      error: { message: "User not found" },
    });
  }

  return res.status(200).json({ success: true, data: user });
}

function createUser(req, res) {
  const result = validateCreateBody(req.body);
  if (!result.valid) {
    return res.status(400).json({
      success: false,
      error: { message: result.message },
    });
  }

  try {
    const user = userService.createUser(result.value);
    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err instanceof DuplicateEmailError) {
      return res.status(400).json({
        success: false,
        error: { message: err.message },
      });
    }
    throw err;
  }
}

function updateUser(req, res) {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid user id" },
    });
  }

  const result = validatePatchBody(req.body);
  if (!result.valid) {
    return res.status(400).json({
      success: false,
      error: { message: result.message },
    });
  }

  try {
    const user = userService.updateUser(Number(id), result.value);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    if (err instanceof DuplicateEmailError) {
      return res.status(400).json({
        success: false,
        error: { message: err.message },
      });
    }
    throw err;
  }
}

function deleteUser(req, res) {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid user id" },
    });
  }

  const deleted = userService.deleteUser(Number(id));
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: { message: "User not found" },
    });
  }

  return res.status(200).json({
    success: true,
    data: { id: Number(id) },
  });
}

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser };