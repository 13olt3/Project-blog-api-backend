const prisma = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email is not a valid email input, try again.`),
  body("password").isLength({ min: 1 }),
  body("confirmPw")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

const userController = {
  createUser: [
    validateUser,
    async (req, res) => {
      const { username, email, password } = matchedData(req);

      res.json({
        message: `Username is: ${username}, Email is: ${email}`,
      });
    },
  ],
};

module.exports = userController;
