function createUserValidator(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, message: "Request body must be a JSON object" };
  }

  const { name, email } = body;

  if (name === undefined) {
    return { valid: false, message: "'name' is required" };
  }
  if (typeof name !== "string" || name.trim().length === 0) {
    return { valid: false, message: "'name' must be a non-empty string" };
  }

  if (email === undefined) {
    return { valid: false, message: "'email' is required" };
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, message: "'email' must be a non-empty string" };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: "'email' must be a valid email address" };
  }

  return { valid: true, value: { name: name.trim(), email: email.trim() } };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

module.exports = { createUserValidator };