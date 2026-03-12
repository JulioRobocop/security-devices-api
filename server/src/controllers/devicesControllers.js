import Device from "../models/deviceModel.js";

// Busca de dispositivos
const getAllDevices = async (req, res) => {
  try {
    // Aguarda a procura na DB
    const devices = await Device.find();
    // Não é necessário usar .map() aqui, já que no Schema já está especificando o return desejado
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Busca de dispositivos pelo Id
const getDeviceById = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    // Procura pela id
    const device = await Device.findById(deviceId);
    // Caso não haja
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.status(200).json(device);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};

// Criação de um dispositivo
const createDevice = async (req, res) => {
  try {
    const device = req.body;
    const createdDevice = await Device.create(device);
    // Retorna apenas os campos desejados do dispositivo
    res
      .status(201)
      .json({ deviceId: createdDevice.id, mac: createdDevice.mac });
  } catch (error) {
    // Caso o valor MAC ja exista, não há a possibilidade de adicionar o dispositivo
    if (error.code === 11000)
      return res.status(400).json({ message: "Mac already exists" });
    console.error("Error", error);
    res.status(500).json({ message: error.message });
  }
};

export { getAllDevices, getDeviceById, createDevice };
