const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const Data = require("./models/Rollno");

const app = express();
app.use(bodyParser.json());
db();
const port = process.env.PORT || 3000;
app.use(cors());

app.post("/", async (req, res) => {
  // console.log(req.body.rollno);
  const rollArr = req.body.rollno.split(",");
  let data = " ";
  try {
    await Data.deleteMany({});
    rollArr.map(async (roll) => {
      if (roll % 2 == 0) {
        data = new Data({
          rollno: roll,
          status: "Pass",
        });
      } else {
        data = new Data({
          rollno: roll,
          status: "Fail",
        });
      }
      await data.save();
      res.status(200).send();
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/result", async (req, res) => {
  try {
    const data = await Data.find({});
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`server is live at port ${port}`);
});
