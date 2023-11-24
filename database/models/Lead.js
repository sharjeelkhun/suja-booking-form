import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  step1: { type: Object },
  step2: { type: Object },
  step3:{ type: Object },
  step4: { type: Object },
  step5: { type: Object },
  step6: { type: Object },
  stripe: { type: Object }
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadsSchema);

export default Lead;
