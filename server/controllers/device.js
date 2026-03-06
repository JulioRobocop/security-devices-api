import Device from "../models/devices.js";

const getAllDevices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const devices = await Device.find(filter);
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getDeviceById = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id);
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.status(200).json(device);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};

const createDevice = async (req, res) => {
  try {
    const device = req.body;
    const createdDevice = await Device.create(device);
    res.status(201).json(createdDevice);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDevice = await Device.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const id = req.params.id;
    await Device.findByIdAndDelete(id);
    res.status(200).json({ message: "Device successfully deleted" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};
