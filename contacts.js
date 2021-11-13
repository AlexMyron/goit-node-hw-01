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

  return contacts.find(({ id }) => String(id) === String(contactId));
}

// TODO: Removes contact by id
async function removeContact(id) {
  const contacts = await parsedContacts();

  const idx = contacts.findIndex((el) => String(el.id) === String(id));
  if (idx === -1) return null;

  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

// TODO: Adds contact by id
async function addContact(contactData) {
  let contacts = await parsedContacts();
  contactData[0].id = uniqid();

  contacts = [...contacts, ...contactData];
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data);
  return contactData;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
