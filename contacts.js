const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./db/contacts.json");

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

  const result = contacts.find(({ id }) => id === Number(contactId));
  return result;
}

// TODO: Removes contact by id
async function removeContact(dataId) {
  const contactId = Number(dataId);
  const contacts = await parsedContacts();

  const updatedContacts = contacts.filter(({ id }) => id !== contactId);
  const data = JSON.stringify(updatedContacts);

  fs.writeFile("./db/contacts.json", data);

  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
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
