const prisma = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");

const validatePost = [
  body("title").trim().notEmpty().withMessage("Post must have a title."),
  body("body").trim().notEmpty().withMessage("Post must have a body."),
];

const postController = {
  createPost: [
    passport.authenticate("jwt", { session: false }),
    validatePost,

    async (req, res) => {
      const { title, body } = matchedData(req);
      await prisma.post.create({
        data: {
          title: title,
          body: body,
          userId: req.user.id,
        },
      });
      res.json("Message created");
    },
  ],

  getPosts: async (req, res) => {
    res.json("message");
  },

  editPost: async (req, res) => {
    res.json("message");
  },

  deletePost: async (req, res) => {
    res.json("message");
  },
};

//passport.authenticate('jwt', { session: false }),

module.exports = postController;
