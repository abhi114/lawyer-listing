import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import "../../global.css";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  photo: string;
  isOnline: boolean;
  avatar:string;
}

// ...existing code...

export default function Index() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  // Fetch lawyers from API
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://687a6716abb83744b7ecb12b.mockapi.io/api/lw/Lawyers"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLawyers(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load lawyers";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, []);

  const handleLawyerPress = (lawyer: Lawyer) => {
    try {
    router.push(`/lawyer/${lawyer.id}`);
    } catch (err) {
      Alert.alert("Error", "Unable to navigate to lawyer profile");
    }
  };

  const handleRefresh = () => {
    setLawyers([]);
    setError(null);
    setLoading(true);
    // Re-fetch from API
    fetch("https://687a6716abb83744b7ecb12b.mockapi.io/api/lw/Lawyers")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setLawyers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load lawyers");
        setLoading(false);
      });
  };
  const handleRefreshOnPull = () => {
    setRefreshing(true); // Set refreshing to true
    setError(null);
    // Re-fetch from API
    fetch("https://687a6716abb83744b7ecb12b.mockapi.io/api/lw/Lawyers")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setLawyers(data);
        setRefreshing(false); // Reset refreshing
      })
      .catch((err) => {
        const errorMessage = err.message || "Failed to load lawyers";
        setError(errorMessage);
        setRefreshing(false); // Reset refreshing
        Alert.alert("Error", errorMessage);
      });
  };

  const renderLawyerItem = ({ item }: { item: Lawyer }) => (
    <TouchableOpacity
      className="flex-row items-center bg-gray-800 mx-4 mb-3 p-4 rounded-xl"
      onPress={() => handleLawyerPress(item)}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{uri:item.avatar}}
          className="w-14 h-14 rounded-full"
          style={{ width: 56, height: 56 }}
          //onError={() => Alert.alert("Error", "Failed to load profile image")}
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

  if (loading) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        <Text className="text-white text-lg">Loading lawyers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center px-4">
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        <Text className="text-white text-lg mb-4">Unable to load lawyers</Text>
        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-lg"
          onPress={handleRefresh}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-gray-800 border-b border-gray-700">
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold">Lawyers</Text>

        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Lawyers List */}
      <FlatList
        data={lawyers}
        renderItem={renderLawyerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshOnPull}
            colors={["#3B82F6"]} // Optional: Customize spinner color to match your theme (blue)
            tintColor="#3B82F6" // Optional: iOS spinner color
          />
        }
      />
    </View>
  );
}
