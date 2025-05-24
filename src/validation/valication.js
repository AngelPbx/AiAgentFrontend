export const requiredValidator = {
  required: "This field is required",
};

export const numberValidator = {
  pattern: {
    value: /^[0-9]*$/,
    message: "Only digits are allowed",
  },
};
export const emailValidator = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email format",
  },
};
