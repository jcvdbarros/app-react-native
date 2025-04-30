import { createContext, useContext, useState, useEffect } from "react";
import { Contact } from "../types/Contact";
import api from "../services/api";

interface ContactContextData {
  contacts: Contact[];
  loadContacts: () => Promise<void>;
  addContact: (contact: Contact) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const ContactContext = createContext({} as ContactContextData);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = async () => {
    try {
      const response = await api.get("/contacts");
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const addContact = async (contact: Contact) => {
    try {
      await api.post("/contacts", contact);
      await loadContacts();
    } catch (error) {
      throw new Error("Error adding contact: " + error);
    }
  };

  const updateContact = async (contact: Contact) => {
    try {
      await api.put(`/contacts/${contact._id}`, contact);
      await loadContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await api.delete(`/contacts/${id}`);
      await loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
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
