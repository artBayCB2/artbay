let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let reloadMagic = require("./reload-magic");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let authData = require("./AuthData.js");

let dbo = undefined;
MongoClient.connect(authData.url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db(authData.dataBase);
});

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line

app.post("/signup", upload.none(), (req, res) => {
  let _username = req.body.username;
  let _password = req.body.password;
  dbo.collection("users").insertOne({
    username: _username,
    password: _password
  });
  res.send(JSON.stringify({ success: true }));
});

// app.get("/signup", (req, res) => {
//   console.log("in signup");
//   dbo
//     .collection("users")
//     .insertOne({
//       username: "_username",
//       password: "_password"
//     })
//     .then(user => {
//       console.log(user);
//     });

//   res.send(JSON.stringify({ success: false }));
// });

app.post("/login", upload.none(), (req, res) => {
  let _username = req.body.username;
  let _password = req.body.password;
  dbo.collection("users").findOne({ username: _username }, (err, user) => {
    if (err) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
    }
    if (user.password === _password) {
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
