const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "user registered successfully");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.messages = req.flash("success");
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//   res.send(`You sent a request x times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful!");
// });
// const cookieParser = require("cookie-parser");

// app.use(cookieParser());

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hi, ${name}`);
// });
// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("Hi i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

// // //Index Route
// // app.get("/users", (req, res) => {
// //   res.send("GET for users");
// // });

// // // Show - users
// // app.get("/users/:id", (req, res) => {
// //   res.send("GET for user id");
// // });

// // // Post - users
// // app.post("/users", (req, res) => {
// //   res.send("POST for users");
// // });

// // // Delete - users
// // app.delete("/users/:id", (req, res) => {
// //   res.send("DELETE for user id");
// // });

// // //Posts
// // //Index
// // app.get("/posts", (req, res) => {
// //   res.send("GET for posts");
// // });

// // //Show
// // app.get("/posts/:id", (req, res) => {
// //   res.send("GET for posts id");
// // });

// // //Post
// // app.post("/posts", (req, res) => {
// //   res.send("POST for posts");
// // });

// // //Delete
// // app.delete("/posts/:id", (req, res) => {
// //   res.send("DELETE for post id");
// // });

app.listen(3000, () => {
  console.log("server is listening to 3000");
});
