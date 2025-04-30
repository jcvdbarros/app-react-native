import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ContactListScreen from "../screens/ContactListScreens";
import ContactFormScreen from "../screens/ContactFormScreen";
import ContactDetailScreen from "../screens/ContactDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ContactListScreen} />
        <Stack.Screen name="Form" component={ContactFormScreen} />
        <Stack.Screen name="Detail" component={ContactDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
