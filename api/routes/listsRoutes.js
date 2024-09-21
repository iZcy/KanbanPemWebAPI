const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsControllers");

router
  .get("/", listsController.listsGet)
  .post("/", listsController.listsPost)
  .patch("/", listsController.listsPatch)
  .delete("/", listsController.listsDelete)
  .delete("/lists", listsController.deleteRelatedCards, listsController.listsDelete);

module.exports = router;