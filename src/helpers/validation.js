function validation(name, value) {
  let errors = {};
  if (name === "email") {
    if (!value) {
      errors = { [name]: "" };
    } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = { [name]: "Email is required" };
    }
  }
  if (name === "password") {
    if (!value) {
      errors = { [name]: "Password is required" };
    }
  }
  if (name === "name") {
    if (!value) {
      errors = { [name]: "Name is required " };
    } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
      errors = { [name]: "The name can only contain latin, space or hyphen" };
    } else if (value.length < 1) {
      errors = { [name]: "The name must be at least 2 characters long" };
    }
  }

  return errors;
}

export default validation;
