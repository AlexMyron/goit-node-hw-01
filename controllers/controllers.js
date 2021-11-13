const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../contacts");

const getAll = async (_, res) => {
  const contacts = await listContacts();
  if (!contacts) res.sendStatus(404);
  res.send(JSON.parse(contacts));
};

const getById = async (req, res) => {
  const userId = req.params.userid;
  const contact = await getContactById(userId);

  if (!contact) {
    res.sendStatus(404);
  }
  res.status(200).send(contact);
};

const deleteById = async (req, res) => {
  const id = req.params.userid;

  const contact = await removeContact(id);
  if (!contact) res.status(404).send("Such contact was not found");
  res.status(200).send(contact);
};

const addById = async (req, res) => {
  if (!req.body) res.sendStatus(400);

  const newContact = await addContact(req.body);

  res.status(201).send(newContact);
};

module.exports = {
  getAll,
  getById,
  deleteById,
  addById,
};
