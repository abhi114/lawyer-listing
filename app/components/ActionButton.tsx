import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { ActionButtonProps } from "../types/lawyer";

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`mx-4 mb-6 p-4 rounded-xl flex-row items-center justify-center ${
        isDisabled ? "bg-gray-600" : "bg-blue-600"
      }`}
      style={{ minHeight: 56 }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="#ffffff"
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        className={`text-lg font-semibold ${
          isDisabled ? "text-gray-300" : "text-white"
        }`}
      >
        {loading ? "Starting..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
