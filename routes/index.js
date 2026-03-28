const { Router } = require("express");
const userRouter = require("./userRoutes");
// const postRouter = require("./postRoutes");

const indexRouter = Router({ mergeParams: true });

indexRouter.use("/api/users", userRouter);
// indexRouter.use("/api/posts", postRouter);

//get profile page
//get posts page
//get comments page
//get signup page
//get login page

//post createUser (signup)
//post create blog post
//post create comment

//put edit post
//put edit comment

//delete deleteUser
//delete deletePost
//delete deleteComment

module.exports = indexRouter;
