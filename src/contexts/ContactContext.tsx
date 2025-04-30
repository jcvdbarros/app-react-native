import { createContext, useContext, useState, useEffect } from "react";
import { Contact } from "../types/Contact";
import api from "../services/api";

interface ContactContextData {
  contacts: Contact[];
  loadContacts: () => void;
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
}

const ContactContext = createContext({} as ContactContextData);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = async () => {
    const response = await api.get("/contacts");
    setContacts(response.data);
  };

  const addContact = async (contact: Contact) => {
    await api.post("/contacts", contact);
    loadContacts();
  };

  const updateContact = async (contact: Contact) => {
    await api.put(`/contacts/${contact.id}`, contact);
    loadContacts();
  };

  const deleteContact = async (id: string) => {
    await api.delete(`/contacts/${id}`);
    loadContacts();
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loadContacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
