const { body } = require("express-validator");

const createRoleValidator = [
  body("name")
    .notEmpty()
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role name must be a string"),
];

module.exports = {
  createRoleValidator,
};
