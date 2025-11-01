const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/forkloreDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// ✅ Signup route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Incorrect password" });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
