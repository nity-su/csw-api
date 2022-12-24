require("dotenv").config();
const express = require("express");
const app = express();
const cloudinary = require("cloudinary");
//https://stackoverflow.com/questions/54615722/req-body-undefined-node-js-post-request
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlRouter = require("./routes/property.routes");

app.use(express.static(__dirname + "public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//0x145B667e023c016FE07dDB01a8B211C5b45ef2eC
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    // console.log(req);

    //해시로 바꿀 것.
    callback(null, file.fieldname);
  },
});

app.use("/sql", sqlRouter);

const imageFilter = (req, file, callback) => {
  // console.log("imageFilter", file.originalname);
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

// , fileFilter: imageFilter
const upload = multer({ storage: storage, fileFilter: imageFilter });
const midle = multer();
app.set("PORT", 8080);

app.get("/", (req, res) => {
  res.send("success");
  console.log(process.env.USER);
});

app.post(
  "/uploadImage",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "feature", maxCount: 1 },
  ]),
  (req, res, next) => {
    // console.log(req.body);
    console.log(req.files);
    const files = req.files;
    if (!files) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    // const fileUpload =async (file) =>
    //   await cloudinary.uploader.upload(req.files, (err, result) => {
    //     console.log(result);
    //   });
    const account = req.body.account;
    const fileUpload = async (file, account) => {
      await cloudinary.v2.uploader
        .upload(file.path, {
          public_id: account + file.fieldname,
          resource_type: "image",
        })
        .then((err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log(result);
        });

      console.log(file.fieldname);
    };

    // console.log(files["logo"][0].path);
    fileUpload(files["logo"][0], account);
    fileUpload(files["feature"][0], account);

    res.end();
  }
);
// { use_filename: true, unique_filename: false },
app.post("/getImages", (req, res) => {
  const account = req.body.account;
  console.log(account);
  cloudinary.v2.api
    .resources_by_ids([account + "logo", account + "feature"])
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  //   secure: true,
});

// Log the configuration
console.log(cloudinary.config());

app.listen(app.get("PORT"), () => {
  console.log("8080...connecting");
});
