const express = require("express");
const app= express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {restrictToLoggedInUserOnly} = require("./middlewares/auth");

const passport = require("./config/passport");


const router= express.Router();

const userRoute = require("./routes/user.js")
const staticRouter= require("./routes/staticRouter");
const openRouter = require("./routes/openRouter");
const authRouter = require("./routes/auth");
//const revewRouter = require("./routes/staticRouter")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use(
    session({
      secret: "Aaditya@3737",
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoute);
app.use("/home", restrictToLoggedInUserOnly, staticRouter);
app.use("/open", openRouter);
app.use("/auth", authRouter);

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));



const{connectMongoDB}= require('./connect')
connectMongoDB('mongodb+srv://Aaditya:admin@cluster0.kxn151h.mongodb.net/googleauth')

app.listen(3000);