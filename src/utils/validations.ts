import * as Yup from "yup";

export const contactValidationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
});
