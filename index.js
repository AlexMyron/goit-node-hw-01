const express = require("express");
const jsonParser = express.json();
const app = require("./server");
require("./CLI");

const {
  getAll,
  getById,
  deleteById,
  addById,
} = require("./controllers/controllers");

app.get("/", getAll);
app.get(`/:userid`, getById);
app.delete("/:userid", deleteById);
app.post("/", jsonParser, addById);
