const express = require("express");
const router = express.Router();
const {
  createRolePermission,
  createArrayData,
  getAllRole,
  deleteRole,
  getAllAcitonOfRole
} = require("../db/model/role_permission");

router.post("/", async (req, res, next) => {
  try {
    const rolePermission = req.body;
    if (Array.isArray(rolePermission)) await createArrayData(rolePermission);
    else await createRolePermission(rolePermission);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
router.get("/all-role", async (req, res, next) => {
  try {
    const all_role = await getAllRole()
    res.json({ all_role });
  } catch (error) {
    
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.delete("/:role", async (req, res, next) => {
  try {
    await deleteRole(req.params.role)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get("/permission-of-role/:role", async (req, res, next) => {
  try {
    const data = await getAllAcitonOfRole(req.params.role)
    res.json(data)
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
module.exports = router;
