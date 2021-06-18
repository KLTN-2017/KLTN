const express = require("express");
const router = express.Router();
const { hash } = require("../service/hash");
const {
  createUser,
  createArrayUser,
  getAllUser,
  getPageUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllIdUser,
  getUserByEmail,
  getPageEmployee,
  updateRoleEmployee,
  deleteEmployee,
  getAllIdEmail,
  updateStatusUser
} = require("../db/model/user");

//get all user
router.get("/", async (req, res) => {
  try {
    const allUser = await getAllUser();
    res.json(allUser);
  } catch (error) {
    console.log(error)
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

//get user by page
router.get("/page/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const pageUser = await getPageUser(page, req.query.role);
      res.json(pageUser);
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


router.get("/page-employee/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const pageUser = await getPageEmployee(page);
      res.json(pageUser);
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
router.get("/user-id", async (req, res, next) => {
  try {
    const listIdUser = await getAllIdUser();
    res.json(listIdUser);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get("/email/:email", async (req, res, next) => {
  try {
    const data = await getUserByEmail(req.params.email)
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

///get all id-email-custoner

router.get("/customer/id-email", async (req, res, next) => {
  try {
    const data = await getAllIdEmail()
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

//get user by id
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId)) {
      const user = await getUserById(userId);
      res.json(user);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

// create user

router.post('/', async(req, res, next) => {
    try {
      const { email, passwd } = req.body
      console.log(req.body)
      const hashData = hash(passwd)
      const data = await createUser({ email,passwd, salt: hashData.salt, passwdhash: hashData.passwd, status: false });
        res.json(data);
    } catch (error) {
      console.log(error)
        res.status(400).json({
          error: error.parent.detail,
        });
    }

})

router.post("/user", async (req, res, next) => {
  try {
    const user = req.body;
    const data = await createArrayUser(user)
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/user-google-facebook", async (req, res, next) => {
  try {
    const user = req.body;
    const data = await createUser(user);
    res.json(data);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});
//update user by id 

router.put("/:id", async (req, res, next) => {
  try {
     await updateUser({
      data: req.body,
      id: req.params.id,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});



router.put("/role-of-user/:id", async (req, res, next) => {
  try {
    await updateRoleEmployee(req.params.id, req.body.role)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
//get all UserId

router.delete('/:id', async(req, res, next) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId)) {
      const user = await deleteUser(userId);
      res.json(user);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
})

router.delete("/delete-employee/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId)) {
      await deleteEmployee(userId);
      res.json({success: 'ok'})
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.put("/enable-user/:id", async (req, res, next) => {
  try {
    await updateStatusUser(req.params.id)
    res.json({ success: true });
  } catch (error) {
    console.log(error, '---------------------------------------', req.params.id)
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});
module.exports = router;
