const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const keys = require("./config/keys");
const formRoutes=require('./routes/formRoutes')

const app = express();

// CORS middleware
app.use(cors()); // Use cors

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = keys.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Express session middleware
app.use(
  session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false,
  })
);

// Use Routes
app.use("/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use('/api', formRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
