import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import "../../global.css";
import ActionButton from "../components/ActionButton";
import LanguageList from "../components/LanguageList";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInfo from "../components/ProfileInfo";
import { Lawyer } from "../types/lawyer";
import { useUserStore } from "../../components/shared/UserStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Mock data - in real app, this would come from an API
// const mockLawyerData: Record<string, Lawyer> = {
//   "1": {
//     id: "1",
//     name: "Ethan Carter",
//     specialization: "Criminal Defense Attorney",
//     photo:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//     isOnline: true,
//     experience: "10+ years of experience",
//     about:
//       "Ethan Carter is a seasoned criminal defense attorney with over a decade of experience. He is dedicated to providing aggressive and effective representation to his clients, ensuring their rights are protected throughout the legal process. Ethan's expertise spans a wide range of criminal cases, from misdemeanors to serious felonies.",
//     languages: [
//       { id: "1", name: "English", proficiency: "Native" },
//       { id: "2", name: "Spanish", proficiency: "Fluent" },
//       { id: "3", name: "French", proficiency: "Intermediate" },
//     ],
//     rating: 4.8,
//     reviewCount: 127,
//   },
// };

const LawyerProfile: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLawyerData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          throw new Error("Lawyer ID is required");
        }
        const response = await fetch(
          `https://687a6716abb83744b7ecb12b.mockapi.io/api/lw/Lawyers/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lawyer profile");
        }
        const data = await response.json();
        setLawyer(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load lawyer profile";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyerData();
  }, [id]);

  const handleStartChat = async (lawyer: Object) => {
    try {
      setChatLoading(true);

      // Simulate chat initialization
      useUserStore.getState().setUser(lawyer);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Navigate to chat screen with lawyer ID
      router.push(`/ChatScreen`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to start chat";
      Alert.alert("Error", errorMessage);
    } finally {
      setChatLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        <Text className="text-white text-lg">Loading profile...</Text>
      </View>
    );
  }

  if (error || !lawyer) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center px-4">
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        <Text className="text-white text-lg mb-4">Unable to load profile</Text>
        <ActionButton title="Go Back" onPress={handleGoBack} />
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-gray-900"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ProfileHeader lawyer={lawyer} onGoBack={handleGoBack} />

        <ProfileInfo lawyer={lawyer} />

        <LanguageList languages={lawyer.languages} />
      </ScrollView>

      <ActionButton
        title="Start Chat"
        onPress={() => handleStartChat(lawyer)}
        loading={chatLoading}
        disabled={!lawyer.isOnline}
      />
    </View>
  );
};

export default LawyerProfile;
