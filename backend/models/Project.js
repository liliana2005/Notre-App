const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fundingGoal: { type: Number, required: true },
  
  category: { type: String, enum: ["Education", "Health", "Environment", "Community"], required: true },
  imageUrl: { type: String, default:'' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
  totalDonations:{type :Number,  default: 0} ,
  ccp:{
    type :String,
    required: true,
    match: /^[0-9]{5,20}$/,
  }

  
},
{  timestamps: true,});

module.exports = mongoose.model("Project", ProjectSchema);