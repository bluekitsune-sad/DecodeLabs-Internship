const userService = require("../services/user.service");
const { createUserValidator } = require("../validation/user.validation");

function listUsers(_req, res) {
  const users = userService.listUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
}

function createUser(req, res) {
  const result = createUserValidator(req.body);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      error: {
        message: result.message,
      },
    });
  }

  const user = userService.createUser(result.value);
  return res.status(201).json({
    success: true,
    data: user,
  });
}

module.exports = { listUsers, createUser };