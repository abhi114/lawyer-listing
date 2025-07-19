import { Text, View, StatusBar, Alert, TouchableOpacity, Image, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Lawyer } from "../types/lawyer";
import { useUserStore } from "@/components/shared/UserStore";

export default function Chat() {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLawyerPress = (lawyer: Lawyer) => {
    try {
      useUserStore.getState().setUser(lawyer);
      router.push(`/ChatScreen`);
    } catch (err) {
      Alert.alert("Error", "Unable to navigate to lawyer profile");
    }
  };
  console.log(lawyers);
  useEffect(() => {
    const fetchLawyersWithChats = async () => {
      try {
        setLoading(true);
        setError(null);
        // Get all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys for chat IDs
        const chatKeys = allKeys.filter((key) => key.startsWith("chat_"));
        const chatIds = chatKeys.map((key) => key.replace("chat_", ""));
        if (chatIds.length === 0) {
          setLawyers([]);
          setFilteredLawyers([]);
          setLoading(false);
          return;
        }
        const response = await fetch(
          "https://687a6716abb83744b7ecb12b.mockapi.io/api/lw/Lawyers"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Only keep lawyers whose id is in chatIds
        const filtered = data.filter((lawyer) => chatIds.includes(lawyer.id));
        setLawyers(filtered);
        setFilteredLawyers(filtered);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load lawyers";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyersWithChats();
  }, []);
  const renderLawyerItem = ({ item }: { item: Lawyer }) => (
    <TouchableOpacity
      className="flex-row items-center bg-gray-800 mx-4 mb-3 p-4 rounded-xl"
      onPress={() => handleLawyerPress(item)}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-14 h-14 rounded-full"
          style={{ width: 56, height: 56 }}
        />
        <View
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
            item.isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-white text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-400 text-sm mt-1">
          {item.specialization}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
  return (
    <>
      {lawyers.length === 0 && !loading ? (
        <View className="flex-1 bg-gray-900 justify-center items-center">
          <StatusBar barStyle="light-content" backgroundColor="#111827" />
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={80}
            color="#6B7280"
          />
          <Text className="text-white text-xl font-semibold mt-4">
            Chat Screen
          </Text>
          <Text className="text-gray-400 text-center mt-2 px-8">
            This is where conversations with lawyers will appear
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-900 ">
          <FlatList
                  data={filteredLawyers}
                  renderItem={renderLawyerItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
                  showsVerticalScrollIndicator={false}
                  
                />
        </View>
      )}
    </>
  );
}
