const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());


// DB connection

const db = mysql.createConnection({
  host: "localhost",
  user: "pg",
  password: "root",
  database: "pg_accomodation",
});

db.connect(function (error) {
  if (error) {
    console.log("Database connection failed: " + error);
  } else {
    console.log("Connected to the database");
  }
});

//establish a port
server.listen(8085, function (error) {
  if (error) {
    console.log("Error!!!!" + error);
  } else {
    console.log("Started!!!!");
  }
});

//Create the Records

server.post("/api/house/add", (req, res) => {
    let details = {
        house_id: req.body.house_id,
     flatNo: req.body.flatNo,
      areaName: req.body.areaName,
      pin: req.body.pin,
      noOfBeds: req.body.noOfBeds,
    };
    let sql = "INSERT INTO house SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "House created Failed" });
      } else {
        res.send({ status: true, message: "House created successfully" });
      }
    });
  });

  //view the Records

server.get("/api/house", (req, res) => {
    var sql = "SELECT * FROM house";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

//Search the Records

server.get("/api/house/:house_id", (req, res) => {
    var houseid = req.params.house_id;
    var sql = "SELECT * FROM house WHERE house_id=" + houseid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //Update the Records

server.put("/api/house/update/:house_id", (req, res) => {
    let sql =
      "UPDATE house SET flatNo='" +
      req.body.flatNo +
      "', areaName='" +
      req.body.areaName +
      "',pin='" +
      req.body.pin +
      "', noOfBeds='" +
      req.body.noOfBeds
      "'  WHERE house_id=" +
      req.params.house_id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "House Updated Failed" });
      } else {
        res.send({ status: true, message: "House Updated successfully" });
      }
    });
  });

  //Delete the Records

  server.delete("/api/house/delete/:house_id", (req, res) => {
    let sql = "DELETE FROM house WHERE house_id=" + req.params.house_id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "house Deleted Failed" });
      } else {
        res.send({ status: true, message: "house Deleted successfully" });
      }
    });
  });