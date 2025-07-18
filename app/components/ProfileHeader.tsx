import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileHeaderProps } from "../types/lawyer";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ lawyer, onGoBack }) => {
  const handleImageError = () => {
    Alert.alert("Error", "Failed to load profile image");
  };

  return (
    <View className="bg-gray-800 px-4 py-6">
      {/* Header with back button */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={onGoBack}
          className="p-2 -ml-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold">Lawyer Profile</Text>

        <View className="w-8" />
      </View>

      {/* Profile Info */}
      <View className="items-center">
        <View className="relative mb-4">
          <Image
            source={{ uri: lawyer?.avatar }}
            className="w-24 h-24 rounded-full"
            style={{ width: 96, height: 96 }}
            onError={handleImageError}
          />
          <View
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${
              lawyer.isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </View>

        <Text className="text-white text-2xl font-bold mb-1">
          {lawyer.name}
        </Text>
        <Text className="text-blue-400 text-base mb-1">
          {lawyer.specialization}
        </Text>
        <Text className="text-gray-400 text-sm">{lawyer.experience}</Text>

        {lawyer.rating && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#FbbF24" />
            <Text className="text-gray-300 ml-1 text-sm">
              {lawyer.rating} ({lawyer.reviewCount || 0} reviews)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
