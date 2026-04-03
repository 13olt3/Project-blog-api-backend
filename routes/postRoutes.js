const { Router } = require("express");
const postController = require("../controllers/postController");

const postRouter = Router();

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);
postRouter.post("/:id", postController.postComment);

// postRouter.get("/comment/:id", postController.getComment);
postRouter.put("/comment/:id", postController.updateComment);
postRouter.put("/:id", postController.editPost);

postRouter.put("/", postController.editPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.delete("/comment/:id", postController.deleteComment);

module.exports = postRouter;
