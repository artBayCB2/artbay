let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let reloadMagic = require("./reload-magic");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
<<<<<<< HEAD
let authData = require("./AuthData");
let otherArtsUpload = multer({ dest: __dirname + "/images/art-images" });
let mainArtUpload = multer({ dest: __dirname + "/images/art-images" });
let profileImageUpload = multer({ dest: __dirname + "/images/profile-images" });
=======
let authData = require("./AuthData.js");
>>>>>>> 413ae50fc51b1cdb5a0bf804a6857ece3346010c

let dbo = undefined;
MongoClient.connect(authData.url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db(authData.dataBase);
});

reloadMagic(app);

let generateSessionID = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

app.use("/", express.static("build"));
app.use("/", express.static("public"));
app.use("/art-images", express.static(__dirname + "/images/art-images"));
app.use(
  "/profile-images",
  express.static(__dirname + "/images/profile-images")
);

// POST signup endpoint
app.post("/signup", upload.none(), (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  let _sessionID = generateSessionID();
  try {
    dbo.collection("users").insertOne(
      {
        email: _email,
        password: _password,
        dateJoined: Date.now(),
        dateOfLastLogin: Date.now(),
        isSeller: false
      },
      (err, user) => {
        let _userID = user["ops"][0]._id;
        dbo.collection("sessions").insertOne({
          userID: _userID,
          sessionID: _sessionID,
          created: Date.now()
        });
      }
    );
    res.cookie("sid", _sessionID);
    res.send(JSON.stringify({ success: true, message: "Sign up successful!" }));
  } catch (e) {
    res.send(JSON.stringify({ success: false, message: e }));
    return;
  }
});

// POST login endpoint
app.post("/login", upload.none(), (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  dbo.collection("users").findOne({ email: _email }, (err, user) => {
    if (err) {
      res.send(
        JSON.stringify({
          success: false,
          message: "Login not successful. try again."
        })
      );
      return;
    }
    if (user === null) {
      res.send(
        JSON.stringify({
          success: false,
          message: "User does not exist"
        })
      );
    }
    if (user.password === _password) {
      let _sessionID = generateSessionID();
      dbo
        .collection("sessions")
        .update(
          { userID: user._id },
          { $set: { sessionID: _sessionID, created: Date.now() } }
        );

      res.cookie("sid", _sessionID);

      return res.send(
        JSON.stringify({ success: true, message: "Login successful" })
      );
    }
    res.send(
      JSON.stringify({
        success: false,
        message: "Email or password is incorrect"
      })
    );
  });
});

// POST seller Profile endpoint
app.post(
  "/seller-profile",
  profileImageUpload.single("profile-image"),
  (req, res) => {
    let _formInputData = req.body;
    let _profileImage = req.file;
    let _sessionID = req.cookies.sid;

    let _firstName = _formInputData.firstName ? _formInputData.firstName : "";
    let _lastName = _formInputData.lastName ? _formInputData.lastName : "";
    let _phoneNumber = _formInputData.phoneNumber
      ? _formInputData.phoneNumber
      : "";
    let _street1 = _formInputData.street1 ? _formInputData.street1 : "";
    let _street2 = _formInputData.street2 ? _formInputData.street2 : "";
    let _country = _formInputData.country ? _formInputData.country : "";
    let _state = _formInputData.state ? _formInputData.state : "";
    let _zip = _formInputData.zip ? _formInputData.zip : "";
    let _province = _formInputData.province ? _formInputData.province : "";
    let _bankName = _formInputData.bankName ? _formInputData.bankName : "";
    let _routingNumber = _formInputData.routingNumber
      ? _formInputData.routingNumber
      : "";
    let _accountNumber = _formInputData.accountNumber
      ? _formInputData.accountNumber
      : "";

    let _profileImageURL = "/profile-images/" + _profileImage.filename;

    dbo
      .collection("sessions")
      .findOne({ sessionID: _sessionID }, (err, user) => {
        try {
          dbo.collection("users").update(
            { _id: user._id },
            {
              $set: {
                firstName: _firstName,
                lastName: _lastName,
                phoneNumber: _phoneNumber,
                street1: _street1,
                street2: _street2,
                country: _country,
                state: _state,
                zip: _zip,
                province: _province,
                bankName: _bankName,
                routingNumber: _routingNumber,
                accountNumber: _accountNumber,
                profileImageURL: _profileImageURL
              }
            }
          );
          return res.send(
            JSON.stringify({
              success: false,
              message: "Email or password is incorrect"
            })
          );
        } catch (e) {
          res.send(JSON.stringify({ success: false, message: e }));
          return;
        }
      });
  }
);

// POST main Art endpoint
app.post("/main-art", mainArtUpload.single("main-art"), (req, res) => {
  let _mainArt = req.file;
  let _sessionID = req.cookies.sid;
  let _mainArtURL = "/art-images/" + _mainArt.filename;

  dbo.collection("sessions").findOne({ sessionID: _sessionID }, (err, user) => {
    try {
      dbo.collection("artItems").insertOne({
        userID: user._id,
        mainArtURL: _mainArtURL
      });
      return res.send(
        JSON.stringify({
          success: true,
          message: "Main art uploaded successfully!"
        })
      );
    } catch (e) {
      res.send(JSON.stringify({ success: false, message: e }));
      return;
    }
  });
});

// POST other art endpoint
app.post("/other-arts", otherArtsUpload.array("other-arts"), (req, res) => {
  let _otherArts = req.files;
  let _sessionID = req.cookies.sid;

  let _otherArtUrls = [];
  _otherArts.forEach(art => {
    _otherArtUrls.push("/art-images/" + art.filename);
  });

  dbo.collection("sessions").findOne({ sessionID: _sessionID }, (err, user) => {
    try {
      dbo.collection("artItems").update(
        { _id: user._id },
        {
          $set: {
            otherArtUrls: _otherArtUrls
          }
        }
      );
      return res.send(
        JSON.stringify({
          success: true,
          message: "Other art uploaded successfully!"
        })
      );
    } catch (e) {
      res.send(JSON.stringify({ success: false, message: e }));
      return;
    }
  });
});

// POST art details endpoint
app.post("/art-details", upload.none(), (req, res) => {
  let _artDetailsData = req.body;
  let _sessionID = req.cookies.sid;

  let _name = _artDetailsData.name ? _artDetailsData.name : "";
  let _artist = _artDetailsData.artist ? _artDetailsData.artist : "";
  let _category = _artDetailsData.category ? _artDetailsData.category : "";
  let _medium = _artDetailsData.medium ? _artDetailsData.medium : "";
  let _originalPiece = _artDetailsData.originalPiece
    ? _artDetailsData.originalPiece
    : "";
  let _quantity = _artDetailsData.quantity ? _artDetailsData.quantity : "";
  let _price = _artDetailsData.price ? _artDetailsData.price : "";

  dbo.collection("sessions").findOne({ sessionID: _sessionID }, (err, user) => {
    try {
      dbo.collection("artItems").update(
        { _id: user._id },
        {
          $set: {
            name: _name,
            artist: _artist,
            medium: _medium,
            category: _category,
            originalPiece: _originalPiece,
            quantity: _quantity,
            price: _price
          }
        }
      );
      return res.send(
        JSON.stringify({
          success: true,
          message: "Art details uploaded successfully!"
        })
      );
    } catch (e) {
      res.send(JSON.stringify({ success: false, message: e }));
      return;
    }
  });
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
