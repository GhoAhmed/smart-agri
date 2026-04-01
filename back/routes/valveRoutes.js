const express = require("express");
const {
  getValves,
  getValveById,
  createValve,
  toggleValve,
  updateValve,
  deleteValve,
} = require("../controllers/valveController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// All valve routes require authentication (farmer or admin)
router.use(verifyToken);

router.get("/valves", getValves); // GET    /api/valves
router.get("/valves/:id", getValveById); // GET    /api/valves/:id
router.post("/valves", createValve); // POST   /api/valves
router.patch("/valves/:id/toggle", toggleValve); // PATCH  /api/valves/:id/toggle
router.put("/valves/:id", updateValve); // PUT    /api/valves/:id
router.delete("/valves/:id", deleteValve); // DELETE /api/valves/:id

module.exports = router;
