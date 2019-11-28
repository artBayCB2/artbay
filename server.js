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

let noProfileURL = "/profile-images/a70ca64023691b0195c8dc93cbbbe187";

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

app.get("/check-status", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;
  if (_req.cookies === undefined) {
    return _res.send(
      JSON.stringify({
        loggedIn: false
      })
    );
  } else {
    _sessionID = req.cookies.sid;
    dbo
      .collection("users")
      .findOne({ _id: ObjectID(_sessionID) }, (err, user) => {
        if (err || user === null) {
          return _res.send(
            JSON.stringify({
              loggedIn: false
            })
          );
        }

        let _cart = [];

        dbo
          .collection("cart")
          .find({ cartID: ObjectID(_sessionID) })
          .toArray((err, cart) => {
            if (err) {
              _cart = [];
            } else {
              if (cart[0] !== undefined) {
                _cart = cart[0];
              }
            }

            return _res.send(
              JSON.stringify({
                loggedIn: true,
                profileImageURL: user.profileImageURL,
                cart: _cart,
                userIsSeller: user.isSeller
              })
            );
          });
      });
  }
});

// POST - signup endpoint
app.post("/signup", upload.none(), (req, res) => {
  let _email = req.body.email;
  let _password = req.body.password;
  let _sessionID = "";
  let _res = res;
  let _req = req;
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
          isSeller: false,
          profileImageURL: noProfileURL
        },
        (err, user) => {
          if (_req.cookies !== undefined) {
            dbo
              .collection("cart")
              .findOne({ cartID: _req.cookies }, (err, cart) => {
                if (cart !== null) {
                  dbo.collection("cart").updateOne(
                    { cartID: _req.cookies },
                    {
                      $set: {
                        cartID: user["ops"][0]._id
                      }
                    }
                  );
                }
              });
          }

          _res.cookie("sid", user["ops"][0]._id);
          _res.send(
            JSON.stringify({
              success: true,
              message: "Sign up successful!",
              userIsSeller: user["ops"][0].isSeller
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
  let _req = req;
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
      if (_req.cookies !== undefined) {
        dbo
          .collection("cart")
          .findOne({ cartID: _req.cookies }, (err, cart) => {
            if (cart !== null) {
              dbo.collection("cart").updateOne(
                { cartID: _req.cookies },
                {
                  $set: {
                    cartID: user["ops"][0]._id
                  }
                }
              );
            }
          });
      }
      _res.cookie("sid", user._id);
      dbo.collection("users").updateOne(
        { userID: user._id },
        {
          $set: {
            dateOfLastLogin: Date(Date.now()).toString()
          }
        }
      );

      return _res.send(
        JSON.stringify({
          success: true,
          message: "Login successful",
          userIsSeller: user.isSeller
        })
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

//GET - logout user
app.get("/logout", (req, res) => {
  dbo.collection("cart").deleteOne({ cartID: ObjectID(req.cookies.sid) });

  res.clearCookie("sid");
  res.send(
    JSON.stringify({
      success: true,
      message: "Logout successful!"
    })
  );
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
    dbo.collection("users").updateOne(
      { _id: ObjectID(_sessionID) },
      {
        $set: {
          isSeller: true,
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
        message: "Seller profile updated successfully!",
        userIsSeller: true
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

  let _title = _artDetailsData.title ? _artDetailsData.title : "";
  let _artist = _artDetailsData.artist ? _artDetailsData.artist : "";
  let _category = _artDetailsData.category ? _artDetailsData.category : "";
  let _medium = _artDetailsData.medium ? _artDetailsData.medium : "";
  let _originalPiece = _artDetailsData.originalPiece
    ? JSON.parse(_artDetailsData.originalPiece)
    : false;
  let _quantity = _artDetailsData.quantity
    ? JSON.parse(_artDetailsData.quantity)
    : 1;
  let _price = _artDetailsData.price ? JSON.parse(_artDetailsData.price) : 0.0;
  let _style = _artDetailsData.style ? _artDetailsData.style : "";
  let _subject = _artDetailsData.subject ? _artDetailsData.subject : "";
  let _material = _artDetailsData.material ? _artDetailsData.material : "";
  let _size = _artDetailsData.size ? _artDetailsData.size : "";
  let _description = _artDetailsData.description
    ? _artDetailsData.description
    : "";

  dbo
    .collection("users")
    .findOne({ _id: ObjectID(_sessionID) }, (err, user) => {
      try {
        dbo.collection("artItems").insertOne({
          sellerUserID: user._id,
          artImageURL: _artImageURL,
          title: _title,
          sellerEmail: user.email,
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
          dateArtUploaded: Date(Date.now()).toString(),
          description: _description,
          sold: 0,
          buyerUserID: null,
          dateSold: []
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

//GET - get all art
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

// GET - get seller art items
app.get("/this-seller-art", (req, res) => {
  let _req = req;
  let _res = res;
  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Are you a seller? Login/Signup to see your art!"
      })
    );
  }

  let _sessionID = req.cookies.sid;

  dbo
    .collection("users")
    .findOne({ _id: ObjectID(_sessionID) }, (err, user) => {
      if (err) {
        return _res.send(
          JSON.stringify({
            success: false,
            message: "Unable to connect. try again."
          })
        );
      }
      if (user === null) {
        return _res.send(
          JSON.stringify({
            success: false,
            message: "Please login"
          })
        );
      }
      dbo
        .collection("artItems")
        .find({ sellerUserID: ObjectID(_sessionID) })
        .toArray((err, artItems) => {
          if (err) {
            res.send(
              JSON.stringify({
                success: false,
                message: "unable to fetch your Art items"
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
});

//GET - Search Art items
app.get("/search-artItems", (req, res) => {
  let _category = req.query.category;
  let _price = req.query.price;
  let _artist = req.query.artist;
  let _query = {};

  if (_category !== undefined) {
    _query.category = _category;
  }

  if (_price !== undefined) {
    _query.price = _price;
  }

  if (_artist !== undefined) {
    _query.artist = _artist;
  }

  dbo
    .collection("artItems")
    .find(_query)
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

// POST - update cart endpoint
app.post("/update-cart", upload.none(), (req, res) => {
  let _res = res;
  let _req = req;
  let _rNum = Math.floor(Math.random() * 1000000);
  if (_req.body === undefined || _req.body.cart === []) {
    return _res.send(
      JSON.stringify({
        success: false,
        message: "Cart is empty"
      })
    );
  }

  let _cartID = "";
  let _thisCart = JSON.parse(_req.body.cart);
  let _cart = [];
  if (_req.cookies === undefined) {
    _cartID = _rNum;
  } else {
    dbo
      .collection("users")
      .findOne({ _id: ObjectID(_req.cookies.sid) }, (err, user) => {
        if (user === null) {
          _cartID = _rNum;
        } else {
          _cartID = user._id;
        }

        dbo.collection("cart").findOne({ cartID: _cartID }, (err, cart) => {
          if (err || cart === null) {
            _cart.push(_thisCart);
            try {
              dbo.collection("cart").insertOne(
                {
                  cartID: _cartID,
                  cart: _cart
                },
                (err, user) => {
                  _res.send(
                    JSON.stringify({
                      success: true,
                      message: "Cart updated successfully!"
                    })
                  );
                  return;
                }
              );
            } catch (e) {
              return res.send(
                JSON.stringify({ success: false, message: e.toString() })
              );
            }
          } else {
            _cart = [...cart.cart];
            _cart.push(_thisCart);

            try {
              dbo.collection("cart").updateOne(
                { cartID: ObjectID(_req.cookies.sid) },
                {
                  $set: {
                    cart: _cart
                  }
                }
              );

              dbo
                .collection("cart")
                .findOne(
                  { cartID: ObjectID(_req.cookies.sid) },
                  (err, cart) => {
                    return _res.send(
                      JSON.stringify({
                        success: true,
                        message: cart
                      })
                    );
                  }
                );
            } catch (e) {
              return res.send(
                JSON.stringify({ success: false, message: e.toString() })
              );
            }
          }
        });
      });
  }
});

//GET - get cart items
app.get("/get-cart-items", (req, res) => {
  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no active session, unable to fetch cart items"
      })
    );
  }
  dbo
    .collection("cart")
    .find({ cartID: ObjectID(req.cookies.sid) })
    .toArray((err, cartItems) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false,
            message: "unable to fetch cart items"
          })
        );
      } else {
      }

      res.send(
        JSON.stringify({
          success: true,
          message: cartItems
        })
      );
    });
});

//POST - delete cart item
app.post("/delete-cart-item", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;
  if (req.body === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no cart selected"
      })
    );
  }

  let _thisItems = [];
  let _thisItemID = req.body.itemID;

  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no active session, unable to delete cart item"
      })
    );
  }
  dbo
    .collection("cart")
    .find({ cartID: ObjectID(req.cookies.sid) })
    .toArray((err, cartItems) => {
      if (err) {
        return res.send(
          JSON.stringify({
            success: false,
            message: "unable to fetch cart to delete item"
          })
        );
      } else {
        let _allItems = cartItems[0]["cart"];
        _thisItems = _allItems.filter(cartItem => {
          return cartItem._id.toString() !== _thisItemID.toString();
        });

        try {
          dbo.collection("cart").updateOne(
            { cartID: ObjectID(_req.cookies.sid) },
            {
              $set: {
                cart: _thisItems
              }
            }
          );

          dbo
            .collection("cart")
            .findOne({ cartID: ObjectID(_req.cookies.sid) }, (err, cart) => {
              return _res.send(
                JSON.stringify({
                  success: true,
                  message: cart
                })
              );
            });
        } catch (e) {
          return res.send(
            JSON.stringify({ success: false, message: e.toString() })
          );
        }
      }
    });
});

//GET - delete cart
app.get("/empty-cart", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;

  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no active session, unable to empty cart"
      })
    );
  }
  try {
    dbo.collection("cart").deleteOne({ cartID: ObjectID(req.cookies.sid) });
    return _res.send(
      JSON.stringify({
        success: true,
        message: "cart was emptied successfully"
      })
    );
  } catch (e) {
    return res.send(JSON.stringify({ success: false, message: e.toString() }));
  }
});

//POST - delete seller art
app.post("/delete-seller-art", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;

  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no active session, unable to delete art"
      })
    );
  }

  if (req.body === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no art selected"
      })
    );
  }

  try {
    dbo.collection("artItems").deleteOne({ _id: ObjectID(req.body.artID) });
    return _res.send(
      JSON.stringify({
        success: true,
        message: "Art deleted successfully"
      })
    );
  } catch (e) {
    return res.send(JSON.stringify({ success: false, message: e.toString() }));
  }
});

// app.get("/test-update", upload.none(), (req, res) => {
//   dbo.collection("artItems").updateMany(
//     {},
//     {
//       $set: {
//         sold: 0
//       }
//     }
//   );
// });

//POST - submit payment
app.post("/submit-payment", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;

  if (req.cookies === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no active session, unable to make payment"
      })
    );
  }

  if (req.body === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no payment details"
      })
    );
  }

  dbo
    .collection("cart")
    .find({ cartID: ObjectID(req.cookies.sid) })
    .toArray((err, cartItems) => {
      if (err) {
        return res.send(
          JSON.stringify({
            success: false,
            message: "unable to fetch cart items"
          })
        );
      } else {
        cartItems[0].cart.forEach(item => {
          dbo.collection("artItems").updateOne(
            { _id: ObjectID(item._id) },
            {
              $set: {
                sold: item.sold + 1,
                buyerUserID: req.cookies.sid,
                dateSold: [...item.dateSold, Date(Date.now()).toString()]
              }
            }
          );
        });

        try {
          dbo
            .collection("cart")
            .deleteOne({ cartID: ObjectID(req.cookies.sid) });
          return _res.send(
            JSON.stringify({
              success: true,
              message: "Payment successful"
            })
          );
        } catch (e) {
          return res.send(
            JSON.stringify({ success: false, message: e.toString() })
          );
        }
      }
    });
});

//POST - add item review
app.post("/add-item-review", upload.none(), (req, res) => {
  let _req = req;
  let _res = res;
  if (req.body === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no review sent"
      })
    );
  }

  if (req.body.itemID === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no item selected for review"
      })
    );
  }

  if (req.body.review === undefined) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "no review string"
      })
    );
  }

  let _reviewerID = "Anonymous";
  let _reviewerName = "Anonymous";

  if (req.cookies !== undefined) {
    console.log("cook", req.cookies.sid);

    if (req.cookies.sid === undefined) {
      try {
        dbo.collection("item-reviews").insertOne(
          {
            itemID: _req.body.itemID,
            review: _req.body.review,
            reviewerID: _reviewerID,
            reviewerName: _reviewerName,
            reviewDate: Date(Date.now()).toString()
          },
          (err, review) => {
            dbo
              .collection("item-reviews")
              .find({})
              .toArray((err, reviews) => {
                if (err) {
                  return res.send(
                    JSON.stringify({
                      success: false,
                      message: "unable to fetch reviews"
                    })
                  );
                } else {
                  return res.send(
                    JSON.stringify({
                      success: true,
                      message: reviews
                    })
                  );
                }
              });
          }
        );
      } catch (e) {
        return res.send(
          JSON.stringify({
            success: false,
            message: e.toString()
          })
        );
      }
    } else {
      dbo
        .collection("artItems")
        .findOne({ _id: ObjectID(_req.body.itemID) }, (err, items) => {
          if (items.sellerUserID.toString() === req.cookies.sid.toString()) {
            return res.send(
              JSON.stringify({
                success: false,
                message: "you should not review your own item..."
              })
            );
          }

          dbo
            .collection("users")
            .findOne({ _id: ObjectID(req.cookies.sid) }, (err, user) => {
              console.log("err", err);
              console.log("user", user);

              if (user !== null) {
                _reviewerID = user._id;
                _reviewerName = user.email;
              }

              try {
                dbo.collection("item-reviews").insertOne(
                  {
                    itemID: _req.body.itemID,
                    review: _req.body.review,
                    reviewerID: _reviewerID,
                    reviewerName: _reviewerName,
                    reviewDate: Date(Date.now()).toString()
                  },
                  (err, review) => {
                    dbo
                      .collection("item-reviews")
                      .find({})
                      .toArray((err, reviews) => {
                        if (err) {
                          return res.send(
                            JSON.stringify({
                              success: false,
                              message: "unable to fetch reviews"
                            })
                          );
                        } else {
                          return res.send(
                            JSON.stringify({
                              success: true,
                              message: reviews
                            })
                          );
                        }
                      });
                  }
                );
              } catch (e) {
                return res.send(
                  JSON.stringify({
                    success: false,
                    message: e.toString()
                  })
                );
              }
            });
        });
    }
  } else {
    try {
      dbo.collection("item-reviews").insertOne(
        {
          itemID: _req.body.itemID,
          review: _req.body.review,
          reviewerID: _reviewerID,
          reviewerName: _reviewerName,
          reviewDate: Date(Date.now()).toString()
        },
        (err, review) => {
          dbo
            .collection("item-reviews")
            .find({})
            .toArray((err, reviews) => {
              if (err) {
                return res.send(
                  JSON.stringify({
                    success: false,
                    message: "unable to fetch reviews"
                  })
                );
              } else {
                return res.send(
                  JSON.stringify({
                    success: true,
                    message: reviews
                  })
                );
              }
            });
        }
      );
    } catch (e) {
      return res.send(
        JSON.stringify({
          success: false,
          message: e.toString()
        })
      );
    }
  }
});

//GET - get all item reviews
app.get("/all-item-reviews", (req, res) => {
  dbo
    .collection("item-reviews")
    .find({})
    .toArray((err, itemReviews) => {
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
          message: itemReviews
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
