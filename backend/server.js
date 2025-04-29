const express = require('express');
const cors = require("cors");//allow API to be accessed from diffrent domains(3000,5000...)

const dotenv = require('dotenv').config();
const connectDb = require('./config/db');
const asyncHandler = require('express-async-handler');

const app = express();
connectDb();

const port = process.env.PORT ||5000;


app.use(cors());

app.use(express.json());



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes")); 
app.use("/api/search",require("./routes/search"));
app.use("/api/orgAuth", require("./routes/orgAuthRoutes"));
app.use("/api/projects", require('./routes/projectRoutes'));
app.use("/api/organization",  require('./routes/organizationRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/social-media', require('./routes/socialMediaRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/password', require('./routes/passwordRoutes'));
app.use('/api/token',require('./routes/tokenRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// ✅ Dev-only route
app.post('/api/dev/make-admin', asyncHandler(async (req, res) => {
    const user = await user.findOne({ email: "admin@example.com" });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    user.isAdmin = true;
    await user.save();
    res.json({ message: "✅ User is now admin!" });
  }));


app.use(asyncHandler);


app.listen(port,'0.0.0.0',()=> {
  console.log(`Server is running on port ${port}`);
})