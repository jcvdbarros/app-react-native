import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContact } from "../contexts/ContactContext";
import mongoose, { ObjectId } from "mongoose";
import { useNavigation } from "@react-navigation/native";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
});

export default function ContactFormScreen() {
  const { goBack } = useNavigation();
  const { addContact } = useContact();
  const handleSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      await addContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
      });
      Alert.alert(
        "Contato salvo",
        `Nome: ${values.name}\nEmail: ${values.email}\nTelefone: ${values.phone}`
      );
      goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o contato." + error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "", phone: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              placeholder="Nome"
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Telefone"
              style={styles.input}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            <Button title="Salvar Contato" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
