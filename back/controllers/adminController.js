const User = require("../models/User");

// GET /api/admin/users — list all users with optional filters
exports.getAllUsers = async (req, res) => {
  try {
    const { role, isActive, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter).select("-password").sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/admin/users/:id — get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/admin/users/:id/toggle-active — enable or disable account
exports.toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Prevent admin from disabling themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot disable your own account" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? "enabled" : "disabled"} successfully`,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/admin/users/:id/role — change user role
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["farmer", "admin"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Must be 'farmer' or 'admin'" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Prevent admin from demoting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot change your own role" });
    }

    user.role = role;
    await user.save();

    res.json({ message: `Role updated to '${role}'`, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admin/users/:id — delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user._id.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot delete your own account" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
