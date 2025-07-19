import { goBack } from "expo-router/build/global-state/routing";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Back Button Placeholder */}
      <TouchableOpacity
        className="flex-row justify-start mb-4"
        onPress={() => {
          goBack();
        }}
      >
        <Text className="text-white text-2xl">←</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="flex-row justify-center mb-4">
        <Text className="text-white text-xl font-bold">Profile</Text>
      </View>

      {/* Profile Image */}
      <View className="items-center mb-4">
        <Image
          source={{
            uri: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/30.jpg",
          }} // Hardcoded placeholder image
          className="w-24 h-24 rounded-full"
        />
      </View>

      {/* Name and Location */}
      <View className="items-center mb-6">
        <Text className="text-white text-lg font-semibold">Abhishek Nigam</Text>
        <Text className="text-gray-400 text-sm">Lucknow,India</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-center gap-2 mb-6">
        <View className="items-center  bg-gray-800 p-3 rounded-lg">
          <Text className="text-white text-lg font-bold">12</Text>
          <Text className="text-gray-400 text-sm">Reviews</Text>
        </View>
        <View className="items-center  bg-gray-800 p-3 rounded-lg">
          <Text className="text-white text-lg font-bold">24</Text>
          <Text className="text-gray-400 text-sm">Cases</Text>
        </View>
        <View className="items-center bg-gray-800 p-3 rounded-lg">
          <Text className="text-white text-lg font-bold">10</Text>
          <Text className="text-gray-400 text-sm">Years</Text>
        </View>
      </View>

      {/* About Section */}
      <View className="mb-6">
        <Text className="text-white text-lg font-semibold mb-2">About</Text>
        <Text className="text-gray-400 text-sm">
          Abhishek Nigam is a seasoned attorney specializing in corporate law,
          with over a decade of experience representing businesses of all sizes.
          He is known for his strategic approach and commitment to achieving
          favorable outcomes for his clients.
        </Text>
      </View>

      {/* Contact Section */}
      <View>
        <Text className="text-white text-lg font-semibold mb-2">Contact</Text>
        <View className="bg-gray-800 p-3 rounded-lg mb-2">
          <Text className="text-gray-400 text-sm">Email</Text>
          <Text className="text-white text-sm">abc@gmail.com</Text>
        </View>
        <View className="bg-gray-800 p-3 rounded-lg mb-2">
          <Text className="text-gray-400 text-sm">Phone</Text>
          <Text className="text-white text-sm">+91999999999</Text>
        </View>
        <View className="bg-gray-800 p-3 rounded-lg">
          <Text className="text-gray-400 text-sm">Website</Text>
          <Text className="text-white text-sm">www.abc.com</Text>
        </View>
      </View>
      <Text className="text-white text-sm mt-2">Created by:- Abhishek Nigam</Text>
    </View>
  );
}
