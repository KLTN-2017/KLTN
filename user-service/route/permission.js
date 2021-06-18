const express = require("express");
const router = express.Router();
const {
  createPermission,
  createArrayData,
  getAllPermission,
  getPagePermission,
  updatePermission,
  deletePermission
} = require("../db/model/permission");

router.get("/", async (req, res) => {
  try {
    const data = await getAllPermission()
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get("/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const data = await getPagePermission(page)
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      err: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const permission = req.body;
    if (Array.isArray(permission)) await createArrayData(permission);
    else await createPermission(permission)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await updatePermission({name: req.body.name, id: req.params.id})
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await deletePermission(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
module.exports = router;
