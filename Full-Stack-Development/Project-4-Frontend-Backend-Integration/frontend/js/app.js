const API_BASE = "http://localhost:3000";

const statusEl = document.getElementById("status");
const loadingEl = document.getElementById("loading");
const emptyEl = document.getElementById("empty");
const listErrorEl = document.getElementById("list-error");
const userListEl = document.getElementById("user-list");
const createForm = document.getElementById("create-form");
const editDialog = document.getElementById("edit-dialog");
const editForm = document.getElementById("edit-form");
const editCancel = document.getElementById("edit-cancel");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

let editingId = null;
let messageTimer = null;

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let body;
  try {
    body = await response.json();
  } catch (_err) {
    throw new Error(`Server returned an invalid response (HTTP ${response.status})`);
  }

  if (!response.ok) {
    const message = body && body.error && body.error.message
      ? body.error.message
      : `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return body.data;
}

function showStatus(message, isError = false) {
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.className = isError ? "status error" : "status";

  if (messageTimer) {
    clearTimeout(messageTimer);
  }
  messageTimer = setTimeout(() => {
    statusEl.hidden = true;
  }, 5000);
}

function showListError(message) {
  listErrorEl.textContent = message;
  listErrorEl.hidden = false;
}

function clearListError() {
  listErrorEl.hidden = true;
}

function setLoading(isLoading) {
  loadingEl.hidden = !isLoading;
}

function createUserCard(user) {
  const item = document.createElement("li");
  item.dataset.id = user.id;

  const meta = document.createElement("div");
  meta.className = "user-meta";

  const name = document.createElement("strong");
  name.textContent = user.name;

  const email = document.createElement("span");
  email.textContent = user.email;

  meta.appendChild(name);
  meta.appendChild(email);

  const actions = document.createElement("div");
  actions.className = "user-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "button button--secondary";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => openEditDialog(user));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button button--danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteUser(user));

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  item.appendChild(meta);
  item.appendChild(actions);
  return item;
}

function renderUsers(users) {
  userListEl.replaceChildren();
  emptyEl.hidden = users.length > 0;
  for (const user of users) {
    userListEl.appendChild(createUserCard(user));
  }
}

async function loadUsers() {
  clearListError();
  setLoading(true);
  try {
    const users = await apiRequest("/api/users");
    renderUsers(users);
  } catch (err) {
    userListEl.replaceChildren();
    emptyEl.hidden = true;
    showListError(err.message);
  } finally {
    setLoading(false);
  }
}

async function createUser(name, email) {
  clearListError();
  try {
    await apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    showStatus(`Created user “${name}”.`);
    nameInput.value = "";
    emailInput.value = "";
    await loadUsers();
  } catch (err) {
    showListError(err.message);
  }
}

function openEditDialog(user) {
  editingId = user.id;
  document.getElementById("edit-name").value = user.name;
  document.getElementById("edit-email").value = user.email;
  editDialog.hidden = false;
  document.getElementById("edit-name").focus();
}

function closeEditDialog() {
  editingId = null;
  editDialog.hidden = true;
  editForm.reset();
}

async function updateUser(id, patch) {
  clearListError();
  try {
    const updated = await apiRequest(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    closeEditDialog();
    showStatus(`Updated user “${updated.name}”.`);
    await loadUsers();
  } catch (err) {
    showStatus(err.message, true);
  }
}

async function deleteUser(user) {
  if (!window.confirm(`Delete “${user.name}” (${user.email})?`)) {
    return;
  }
  clearListError();
  try {
    await apiRequest(`/api/users/${user.id}`, { method: "DELETE" });
    showStatus(`Deleted user “${user.name}”.`);
    await loadUsers();
  } catch (err) {
    showListError(err.message);
  }
}

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    showStatus("Both name and email are required.", true);
    return;
  }
  createUser(name, email);
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("edit-name").value.trim();
  const email = document.getElementById("edit-email").value.trim();

  if (editingId === null) {
    return;
  }
  if (!name || !email) {
    showStatus("Both name and email are required.", true);
    return;
  }
  updateUser(editingId, { name, email });
});

editCancel.addEventListener("click", closeEditDialog);
editDialog.addEventListener("click", (event) => {
  if (event.target === editDialog) {
    closeEditDialog();
  }
});

document.getElementById("refresh").addEventListener("click", () => {
  loadUsers();
});

loadUsers();