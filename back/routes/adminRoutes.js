const express = require("express");
const {
  getAllUsers,
  getUserById,
  toggleUserActive,
  changeUserRole,
  deleteUser,
} = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// All admin routes require a valid token AND admin role
router.use(verifyToken, verifyAdmin);

router.get("/users", getAllUsers); // GET    /api/admin/users
router.get("/users/:id", getUserById); // GET    /api/admin/users/:id
router.patch("/users/:id/toggle-active", toggleUserActive); // PATCH  /api/admin/users/:id/toggle-active
router.patch("/users/:id/role", changeUserRole); // PATCH  /api/admin/users/:id/role
router.delete("/users/:id", deleteUser); // DELETE /api/admin/users/:id

module.exports = router;
