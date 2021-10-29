const express = require("express");
const contactsAPI = require("./contacts");
const { Command } = require("commander");
const process = require("process");

const PORT = 8081;
const app = express();
const jsonParser = express.json();

app.get("/", async (req, res) => {
  const contacts = await contactsAPI.listContacts();
  if (!contacts) res.sendStatus(404);
  res.send(JSON.parse(contacts));
});

app.get(`/:userid`, async (req, res) => {
  const userId = req.params.userid;
  const contact = await contactsAPI.getContactById(userId);

  if (!contact) {
    res.sendStatus(404);
  }
  res.send(contact);
});

app.delete("/:userid", async (req, res) => {
  const id = req.params.userid;

  const contact = await contactsAPI.removeContact(id);
  if (!contact) res.status(404).send("Such contact was not found");
  res.status(200).send(contact);
});

app.post("/", jsonParser, async (req, res) => {
  if (!req.body) res.sendStatus(400);

  const newContact = await contactsAPI.addContact(req.body);

  res.status(201).send(newContact);
});

app.listen(PORT, (err) => {
  if (err) return console.log(`An error is discribed in this message: ${err}`);

  console.log(`----------- Всё ok ) ${PORT}`);
});

// --------------

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(await contactsAPI.listContacts());
      break;

    case "get":
      console.log(await contactsAPI.getContactById(id));
      break;

    case "add":
      console.log(await contactsAPI.addContact([{ name, email, phone }]));
      break;

    case "remove":
      console.log(await contactsAPI.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
