import { ContactProvider } from "./src/contexts/ContactContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ContactProvider>
      <AppNavigator />
    </ContactProvider>
  );
}
