import mongoose from "mongoose";

const AdoptionRequestSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required:false, unique:false },
  phone: { type: String },
  additionalInfo: { type: String },
  termsAndConditions: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const AdoptionRequest = mongoose.models.AdoptionRequest || mongoose.model("AdoptionRequest", AdoptionRequestSchema);

export default AdoptionRequest;