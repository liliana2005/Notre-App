
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fundingGoal: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  category: { type: String, enum: ["Education", "Health", "Environment", "Community"], required: true },
  imageUrl: { type: String, default:'' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  totalDonations:{type :Number,  default: 0} 

  
},
{  timestamps: true,});

module.exports = mongoose.model("Project", ProjectSchema);
