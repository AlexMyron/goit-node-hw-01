const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: Gets contacts as a json file
async function listContacts() {
  return await fs.readFile(contactsPath, "utf8");
}

// TODO: Gets and parses contacts
async function parsedContacts() {
  const contacts = await listContacts(contactsPath, "utf8");
  return JSON.parse(contacts);
}

// TODO: Gets contact by id
async function getContactById(contactId) {
  const contacts = await parsedContacts();

  return contacts.find(({ id }) => id === Number(contactId));
}

// TODO: Removes contact by id
async function removeContact(dataId) {
  const contactId = Number(dataId);
  const contacts = await parsedContacts();

  const updatedContacts = contacts.filter(({ id }) => id !== contactId);
  const data = JSON.stringify(updatedContacts);

  fs.writeFile(contactsPath, data);

  return contacts.find(({ id }) => id === contactId);
}

// TODO: Adds contact by id
async function addContact(contactData) {
  let contacts = await parsedContacts();
  contactData[0].id = uniqid();

  contacts = [...contacts, ...contactData];
  const data = JSON.stringify(contacts);
  await fs.writeFile("./db/contacts.json", data);
  return contactData;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
