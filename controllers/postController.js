const prisma = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");

const validatePost = [
  body("title").trim().notEmpty().withMessage("Post must have a title."),
  body("body").trim().notEmpty().withMessage("Post must have a body."),
];
const validateComment = [
  body("comment").trim().notEmpty().withMessage("Comment cannot be empty."),
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
    const allPosts = await prisma.post.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
        user: { select: { username: true } },
      },
    });
    res.json({ posts: allPosts });
  },

  getPost: [
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const postId = req.params.id;
      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
        include: {
          user: {
            select: { username: true },
          },
          comments: { include: { user: { select: { username: true } } } },
        },
      });
      res.json({ post: post });
    },
  ],

  editPost: [
    passport.authenticate("jwt", { session: false }),
    validatePost,
    async (req, res) => {
      const { title, body } = matchedData(req);
      const valid = await prisma.post.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (req.user.id !== valid.userId) {
        return res
          .status(403)
          .json({ message: "You can't edit someone else's post!" });
      }

      await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: { title: title, body: body },
      });
      res.json("post updated");
    },
  ],

  postComment: [
    passport.authenticate("jwt", { session: false }),
    validateComment,
    async (req, res) => {
      const { comment } = matchedData(req);
      await prisma.comment.create({
        data: {
          userId: Number(req.user.id),
          postId: Number(req.params.id),
          body: comment,
        },
      });
      res.json("comment posted");
    },
  ],
  getComment: [
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      // send through commentId
      const commentData = await prisma.comment.findUnique({
        where: { id: Number(req.params.id) },
      });

      res.json({ comment: commentData });
    },
    // not being used maybe delete
  ],
  updateComment: [
    passport.authenticate("jwt", { session: false }),
    validateComment,
    async (req, res) => {
      const valid = await prisma.comment.findUnique({
        where: { id: Number(req.body.commentId) },
      });
      if (req.user.id !== valid.userId) {
        return res
          .status(403)
          .json({ message: "You can't edit someone else's comments!" });
      }
      const { comment } = matchedData(req);

      await prisma.comment.update({
        where: { id: Number(req.body.commentId) },
        data: { body: comment },
      });
      res.json("message updated");
    },
  ],

  deletePost: [
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const postId = req.params.id;
      await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.json("post deleted");
    },
  ],

  deleteComment: [
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      //authenticate

      const commentId = req.params.id;
      await prisma.comment.delete({
        where: { id: Number(commentId) },
      });
      res.json("comment deleted");
    },
  ],
};

//passport.authenticate('jwt', { session: false }),

module.exports = postController;
