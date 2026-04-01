const Valve = require("../models/Valve");

// GET /api/valves — farmer sees only their valves
exports.getValves = async (req, res) => {
  try {
    const valves = await Valve.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(valves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/valves/:id — get single valve (must belong to farmer)
exports.getValveById = async (req, res) => {
  try {
    const valve = await Valve.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!valve) return res.status(404).json({ error: "Valve not found" });
    res.json(valve);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/valves — create a new valve
exports.createValve = async (req, res) => {
  try {
    const { name, location, notes } = req.body;
    if (!name) return res.status(400).json({ error: "Valve name is required" });

    const valve = new Valve({ name, location, notes, owner: req.user._id });
    await valve.save();
    res.status(201).json({ message: "Valve created successfully", valve });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/valves/:id/toggle — open or close the valve
exports.toggleValve = async (req, res) => {
  try {
    const valve = await Valve.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!valve) return res.status(404).json({ error: "Valve not found" });

    valve.isOpen = !valve.isOpen;
    await valve.save();

    res.json({
      message: `Valve ${valve.isOpen ? "opened" : "closed"} successfully`,
      isOpen: valve.isOpen,
      valve,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/valves/:id — update valve info (name, location, notes)
exports.updateValve = async (req, res) => {
  try {
    const { name, location, notes } = req.body;
    const valve = await Valve.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, location, notes },
      { new: true, runValidators: true },
    );
    if (!valve) return res.status(404).json({ error: "Valve not found" });
    res.json({ message: "Valve updated successfully", valve });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/valves/:id — delete a valve
exports.deleteValve = async (req, res) => {
  try {
    const valve = await Valve.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!valve) return res.status(404).json({ error: "Valve not found" });
    res.json({ message: "Valve deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
