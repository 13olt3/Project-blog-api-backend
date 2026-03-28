const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", indexController.indexPage);

module.exports = indexRouter;
