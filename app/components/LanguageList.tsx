import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LanguageListProps } from "../types/lawyer";

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => {
  if (!languages || languages.length === 0) {
    return (
      <View className="px-4 py-6">
        <Text className="text-white text-lg font-semibold mb-4">Languages</Text>
        <Text className="text-gray-400 text-base">No languages specified</Text>
      </View>
    );
  }

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-lg font-semibold mb-4">Languages</Text>

      {languages.map((language) => (
        <View
          key={language.id}
          className="flex-row items-center bg-gray-800 p-4 rounded-lg mb-3"
        >
          <View className="bg-gray-700 p-2 rounded-full mr-3">
            <Ionicons name="language" size={20} color="#9CA3AF" />
          </View>

          <View className="flex-1">
            <Text className="text-white text-base font-medium">
              {language.name}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              {language.proficiency}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default LanguageList;
