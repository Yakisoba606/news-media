const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/NewsController");
const { body } = require("express-validator");
const HandleValidationRequest = require("../validations/HandleValidationRequest");

router.get("", NewsController.index); 
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("types").notEmpty(),
  ],HandleValidationRequest,NewsController.store
); 
router.get("/:id", NewsController.show); 
router.delete("/:id", NewsController.destroy); 
router.patch("/:id",
    [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("types").notEmpty(),
  ],HandleValidationRequest, NewsController.update); 

module.exports = router;
