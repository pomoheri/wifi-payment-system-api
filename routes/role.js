const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const { createRoleValidator } = require("../validators/roleValidator");
const validate = require("../middlewares/validate");

router.get("/", RoleController.getAllRoles);
router.get("/:id", RoleController.getRoleById);
router.post("/", createRoleValidator, validate, RoleController.createRole);
router.put("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

module.exports = router;
