import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useContact } from "../contexts/ContactContext";

interface ContactDetailRouteParams {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function ContactDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateContact } = useContact();
  const { name, email, phone } = route.params as ContactDetailRouteParams;

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleUpdate = async () => {
    try {
      await updateContact({
        _id: (route.params as ContactDetailRouteParams)._id,
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      });
      setIsEditing(false);
      Alert.alert("Contato atualizado com sucesso");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o contato.");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (isEditing) {
              handleUpdate();
            } else {
              setIsEditing(true);
            }
          }}
          style={{ marginRight: 10 }}
        >
          <Text style={{ color: "blue" }}>
            {isEditing ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Contato</Text>

      <Text style={styles.label}>Nome:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedName}
          onChangeText={setEditedName}
        />
      ) : (
        <Text style={styles.value}>{editedName}</Text>
      )}

      <Text style={styles.label}>Email:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedEmail}
          onChangeText={setEditedEmail}
        />
      ) : (
        <Text style={styles.value}>{editedEmail || "Não informado"}</Text>
      )}

      <Text style={styles.label}>Telefone:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedPhone}
          onChangeText={setEditedPhone}
        />
      ) : (
        <Text style={styles.value}>{editedPhone}</Text>
      )}

      {isEditing && (
        <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
