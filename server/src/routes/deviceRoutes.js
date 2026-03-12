import { Router } from "express";
import {
  getAllDevices,
  getDeviceById,
  createDevice,
} from "../controllers/devicesControllers.js";

const router = Router();

router.get("/listar", getAllDevices);
router.get("/listar/:deviceId", getDeviceById);
router.post("/registrar", createDevice);

export default router;
