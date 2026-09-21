function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateId(value) {
  const stringValue = String(value);
  return /^\d+$/.test(stringValue) && Number(stringValue) > 0;
}

function validateCreateBody(body) {
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
  if (!isEmail(email)) {
    return { valid: false, message: "'email' must be a valid email address" };
  }

  return { valid: true, value: { name: name.trim(), email: email.trim() } };
}

function validatePatchBody(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, message: "Request body must be a JSON object" };
  }

  const patch = {};
  const { name, email } = body;

  if (name === undefined && email === undefined) {
    return {
      valid: false,
      message: "At least one field ('name' or 'email') must be provided",
    };
  }

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return { valid: false, message: "'name' must be a non-empty string" };
    }
    patch.name = name.trim();
  }

  if (email !== undefined) {
    if (typeof email !== "string" || email.trim().length === 0) {
      return { valid: false, message: "'email' must be a non-empty string" };
    }
    if (!isEmail(email)) {
      return { valid: false, message: "'email' must be a valid email address" };
    }
    patch.email = email.trim();
  }

  return { valid: true, value: patch };
}

module.exports = { validateId, validateCreateBody, validatePatchBody };