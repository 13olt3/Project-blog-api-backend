const { Router } = require("express");
const postController = require("../controllers/postController");

const postRouter = Router();

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.put("/", postController.editPost);
postRouter.delete("/", postController.deletePost);

module.exports = postRouter;
