import { Text, View, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";

export default function Profile() {
  return (
    <View className="flex-1 bg-gray-900 justify-center items-center">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <Ionicons name="person-outline" size={80} color="#6B7280" />
      <Text className="text-white text-xl font-semibold mt-4">
        Profile Screen
      </Text>
      <Text className="text-gray-400 text-center mt-2 px-8">
        This is where user profile information will be displayed
      </Text>
    </View>
  );
}
