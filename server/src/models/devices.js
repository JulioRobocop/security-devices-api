import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      required: true,
    },
  },
  { timestamps: true },
);

const Device = mongoose.model("Device", deviceSchema);
export default Device;
