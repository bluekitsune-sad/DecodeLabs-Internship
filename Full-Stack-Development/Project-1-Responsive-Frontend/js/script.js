"use strict";

/* ============================================================
   Hearth & Crumb — interactive behaviour
   1. Mobile navigation toggle
   2. Contact form validation (client-side, mirrors server rules)
   3. Dynamic footer year
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
  initFooterYear();
});

/* ---------- Mobile navigation toggle ---------- */
function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const validators = [
      { field: name, errorEl: document.getElementById("name-error"), check: () => name.value.trim().length > 0, message: "Please enter your name." },
      { field: email, errorEl: document.getElementById("email-error"), check: () => isValidEmail(email.value), message: "Please enter a valid email address." },
      { field: message, errorEl: document.getElementById("message-error"), check: () => message.value.trim().length > 0, message: "Please write a short message." },
    ];

    let formIsValid = true;

    validators.forEach(({ field, errorEl, check, message }) => {
      const valid = check();
      errorEl.textContent = valid ? "" : message;
      errorEl.hidden = valid;
      field.setAttribute("aria-invalid", String(!valid));
      field.style.borderColor = valid ? "" : "#a33c2a";
      if (!valid) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      status.hidden = false;
      status.textContent = "Please fix the highlighted fields and try again.";
      status.style.color = "#a33c2a";
      return;
    }

    status.hidden = false;
    status.textContent = "Thanks! Your request has been received. We will reply by email within one working day.";
    status.style.color = "";

    form.reset();
    validators.forEach(({ field, errorEl }) => {
      field.removeAttribute("aria-invalid");
      field.style.borderColor = "";
      errorEl.hidden = true;
    });
  });
}

/* ---------- Helpers ---------- */
function isValidEmail(value) {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}