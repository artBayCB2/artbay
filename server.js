let express = require("express");
let app = express();
let multer = require("multer");
let cookieParser = require("cookie-parser");
let upload = multer({ dest: __dirname + "/uploads/" });
let reloadMagic = require("./reload-magic");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let authData = require("./AuthData");
let artDataUpload = multer({ dest: __dirname + "/images/art-images" });
let profileImageUpload = multer({ dest: __dirname + "/images/profile-images" });

let dbo = undefined;
MongoClient.connect(authData.url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db(authData.dataBase);
});

reloadMagic(app);

app.use(cookieParser());
app.use("/", express.static("build"));
app.use("/", express.static("public"));
app.use("/art-images", express.static(__dirname + "/images/art-images"));
app.use(
  "/profile-images",
  express.static(__dirname + "/images/profile-images")
);

// POST - signup endpoint
app.post("/signup", upload.none(), (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  let _sessionID = "";
  let _res = res;
  dbo.collection("users").findOne({ email: _email }, (err, user) => {
    if (user !== null) {
      return res.send(
        JSON.stringify({
          success: false,
          message: "User already exists"
        })
      );
    }

    try {
      dbo.collection("users").insertOne(
        {
          email: _email,
          password: _password,
          dateJoined: Date(Date.now()).toString(),
          dateOfLastLogin: Date(Date.now()).toString(),
          isSeller: false
        },
        (err, user) => {
          _res.cookie("sid", user["ops"][0]._id);
          _res.send(
            JSON.stringify({
              success: true,
              message: "Sign up successful!"
            })
          );
        }
      );
    } catch (e) {
      return res.send(
        JSON.stringify({ success: false, message: e.toString() })
      );
    }
  });
});

// POST - login endpoint
app.post("/login", upload.none(), (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  let _res = res;
  dbo.collection("users").findOne({ email: _email }, (err, user) => {
    if (err) {
      return _res.send(
        JSON.stringify({
          success: false,
          message: "Login not successful. try again."
        })
      );
    }
    if (user === null) {
      return _res.send(
        JSON.stringify({
          success: false,
          message: "User does not exist"
        })
      );
    }
    if (user.password === _password) {
      _res.cookie("sid", user._id);
      dbo.collection("users").update(
        { userID: user._id },
        {
          $set: {
            dateOfLastLogin: Date(Date.now()).toString()
          }
        }
      );

      return _res.send(
        JSON.stringify({ success: true, message: "Login successful" })
      );
    }
    _res.send(
      JSON.stringify({
        success: false,
        message: "Email or password is incorrect"
      })
    );
  });
});

// POST - seller profile endpoint
app.post("/seller-profile", profileImageUpload.single("file"), (req, res) => {
  let _res = res;

  if (
    req.cookies === undefined ||
    req.body === undefined ||
    req.file === undefined
  ) {
    return _res.send(
      JSON.stringify({
        success: false,
        message:
          req.cookies === undefined
            ? "Login/Signup to register as a seller!"
            : req.body === undefined
            ? "No form data"
            : req.file === undefined
            ? "No Profilew Image data"
            : "Something went wrong"
      })
    );
  }
  let _formInputData = req.body;
  let _profileImage = req.file;
  let _sessionID = req.cookies.sid;

  let _firstName = _formInputData.firstName ? _formInputData.firstName : "";
  let _lastName = _formInputData.lastName ? _formInputData.lastName : "";
  let _phoneNumber = _formInputData.phoneNumber
    ? _formInputData.phoneNumber
    : "";
  let _address1 = _formInputData.address1 ? _formInputData.address1 : "";
  let _address2 = _formInputData.address2 ? _formInputData.address2 : "";
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

  try {
    dbo.collection("users").update(
      { _id: ObjectID(_sessionID) },
      {
        $set: {
          firstName: _firstName,
          lastName: _lastName,
          phoneNumber: _phoneNumber,
          address1: _address1,
          address2: _address2,
          country: _country,
          state: _state,
          zip: _zip,
          province: _province,
          bankName: _bankName,
          routingNumber: _routingNumber,
          accountNumber: _accountNumber,
          profileImageURL: _profileImageURL,
          dateOfJoinedAsSeller: Date(Date.now()).toString()
        }
      }
    );
    return _res.send(
      JSON.stringify({
        success: true,
        message: "Seller profile updated successfully!"
      })
    );
  } catch (e) {
    _res.send(JSON.stringify({ success: false, message: e.toString() }));
    return;
  }
});

// POST - art data upload endpoint
app.post("/art-data-upload", artDataUpload.single("file"), (req, res) => {
  let _res = res;

  if (
    req.cookies === undefined ||
    req.body === undefined ||
    req.file === undefined
  ) {
    return res.send(
      JSON.stringify({
        success: false,
        message:
          req.cookies === undefined
            ? "Login/Signup to upload your art data!"
            : req.body === undefined
            ? "No form data"
            : req.file === undefined
            ? "No Image data"
            : "Something went wrong"
      })
    );
  }

  let _sessionID = req.cookies.sid;

  let _artDetailsData = req.body;
  let _artData = req.file;

  let _artImageURL = "/art-images/" + _artData.filename;

  let _name = _artDetailsData.name ? _artDetailsData.name : "";
  let _artist = _artDetailsData.artist ? _artDetailsData.artist : "";
  let _category = _artDetailsData.category ? _artDetailsData.category : "";
  let _medium = _artDetailsData.medium ? _artDetailsData.medium : "";
  let _originalPiece = _artDetailsData.originalPiece
    ? _artDetailsData.originalPiece
    : "";
  let _quantity = _artDetailsData.quantity ? _artDetailsData.quantity : "";
  let _price = _artDetailsData.price ? _artDetailsData.price : "";
  let _style = _artDetailsData.style ? _artDetailsData.style : "";
  let _subject = _artDetailsData.subject ? _artDetailsData.subject : "";
  let _material = _artDetailsData.material ? _artDetailsData.material : "";
  let _size = _artDetailsData.size ? _artDetailsData.size : "";

  dbo
    .collection("users")
    .findOne({ _id: ObjectID(_sessionID) }, (err, user) => {
      try {
        dbo.collection("artItems").insertOne({
          userID: user._id,
          artImageURL: _artImageURL,
          name: _name,
          email: user.email,
          artist: _artist,
          medium: _medium,
          category: _category,
          originalPiece: _originalPiece,
          quantity: _quantity,
          price: _price,
          style: _style,
          subject: _subject,
          material: _material,
          size: _size,
          dateArtUploaded: Date(Date.now()).toString()
        });
        return _res.send(
          JSON.stringify({
            success: true,
            message: "Art data uploaded successfully!"
          })
        );
      } catch (e) {
        _res.send(
          JSON.stringify({
            success: false,
            message: e.toString()
          })
        );
        return;
      }
    });
});

app.get("/all-art", (req, res) => {
  dbo
    .collection("artItems")
    .find({})
    .toArray((err, artItems) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false,
            message: "unable to fetch Art items"
          })
        );
      } else {
      }
      res.send(
        JSON.stringify({
          success: true,
          message: artItems
        })
      );
    });
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
