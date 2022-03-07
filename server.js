const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/photos", express.static(path.join(__dirname, "photos")));

const PORT = process.env.PORT || 5000;

const users = require("./data.json");

app.get("/", (req, res) => {
  res.send("/users for userinfo. <br> /uploads for images.");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/photos", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const image = req.files.image;

  image.mv(`${__dirname}/photos/${image.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: image.name, filePath: `/photos/${image.name}` });
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
