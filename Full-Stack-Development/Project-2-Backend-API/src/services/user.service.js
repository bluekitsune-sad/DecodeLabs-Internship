const users = [];

let nextId = 1;

function listUsers() {
  return users.map((user) => ({ ...user }));
}

function createUser({ name, email }) {
  const user = {
    id: nextId,
    name,
    email,
  };
  nextId += 1;
  users.push(user);
  return { ...user };
}

module.exports = { listUsers, createUser };