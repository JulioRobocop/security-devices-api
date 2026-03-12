import mongoose from "mongoose";

// Modelo para registro de um dispositivo
const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mac: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Number,
      default: Date.now,
    },
  },
  {
    // Define o que será retornado após a requisição
    toJSON: {
      transform: (doc, ret) => {
        ret.deviceId = ret._id; // retorna deviceId com o valor igual a _id
        delete ret._id; // omite _id
        delete ret.__v; // omite __v
      },
    },
  },
);

const Device = mongoose.model("Device", deviceSchema);
export default Device;
