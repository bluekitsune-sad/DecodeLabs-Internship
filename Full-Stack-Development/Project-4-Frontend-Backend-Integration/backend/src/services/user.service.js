const userModel = require("../models/user.model");

function listUsers() {
  return userModel.list();
}

function getUserById(id) {
  return userModel.findById(id);
}

function createUser({ name, email }) {
  return userModel.create({ name, email });
}

function updateUser(id, patch) {
  const existing = userModel.findById(id);
  if (!existing) {
    return null;
  }
  return userModel.update(id, patch);
}

function deleteUser(id) {
  return userModel.remove(id);
}

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser };