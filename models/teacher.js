const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    latitude: Number,
    longitude: Number,
    updatedAt: { type: Date, default: Date.now }
  },
  subjectsTaught: { type: [String], default: [] } // optional teacher-specific field
});

// Hash password before saving
TeacherSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
TeacherSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Teacher", TeacherSchema);
