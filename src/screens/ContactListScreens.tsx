import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContact } from "../contexts/ContactContext";

export default function ContactListScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { loadContacts, contacts, deleteContact } = useContact();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        await loadContacts(search);
      } catch (err) {
        setError("Erro ao carregar contatos");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [search]);

  const handleDelete = (id: any) => {
    try {
      Alert.alert(
        "Excluir Contato",
        "Você tem certeza que deseja excluir este contato?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Excluir",
            onPress: async () => {
              await deleteContact(id);
              Alert.alert("Contato excluído com sucesso");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o contato." + error);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar contato..."
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.searchInput}
      />

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", item)}
              >
                <Text style={{ color: "blue", marginLeft: 10 }}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={{ color: "red", marginLeft: 10 }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum contato encontrado</Text>
            </View>
          }
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
