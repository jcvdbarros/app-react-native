import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "João Silva",
    email: "",
    phone: "123456789",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "",
    phone: "987654321",
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "",
    phone: "456789123",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "",
    phone: "321654987",
  },
  {
    id: "5",
    name: "Lucas Almeida",
    email: "",
    phone: "654321789",
  },
];

export default function ContactListScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar contato..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {!filteredContacts.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text>{item.phone}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", item)}
              >
                <Text style={{ color: "blue", marginLeft: 10 }}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{ color: "red", marginLeft: 10 }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Form")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  contactItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  fab: {
    position: "absolute",
    right: 28,
    bottom: 66,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
