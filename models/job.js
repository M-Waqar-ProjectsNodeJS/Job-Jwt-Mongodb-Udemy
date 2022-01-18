const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending",
  },
});

const job = mongoose.model("jobs", jobSchema);

module.exports = job;
