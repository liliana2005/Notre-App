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

app.use("/api/projects", require('./routes/projectRoutes'));
app.use("/api/organization",  require('./routes/organizationRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/social-media', require('./routes/socialMediaRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/password', require('./routes/passwordRoutes'))

app.use(asyncHandler);


app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
})