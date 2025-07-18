import React from "react";
import { View, Text } from "react-native";
import { ProfileInfoProps } from "../types/lawyer";

const ProfileInfo: React.FC<ProfileInfoProps> = ({ lawyer }) => {
  return (
    <View className="px-4 py-6">
      <Text className="text-white text-lg font-semibold mb-4">About</Text>
      <Text className="text-gray-300 text-base leading-6 mb-6">
        {lawyer.about || "No description available for this lawyer."}
      </Text>
    </View>
  );
};

export default ProfileInfo;
