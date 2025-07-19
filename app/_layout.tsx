import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="lawyer/[id]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen name="ChatScreen" />
      </Stack>
    </SafeAreaView>
  );
}
