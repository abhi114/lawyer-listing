import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [lawyerTyping, setLawyerTyping] = useState(false);

  // Simulated lawyer responses based on user input
  const simulateLawyerResponse = (userMessage) => {
    setLawyerTyping(true);
    setTimeout(() => {
      let response;
      if (userMessage.toLowerCase().includes("contract")) {
        response =
          "Thank you for the details. Contract disputes often depend on the specific terms. Could you share the clause related to the obligations in question?";
      } else if (userMessage.toLowerCase().includes("deadline")) {
        response =
          "I see, a missed deadline can be critical. Please provide the contract's deadline clause and any notices you sent to the other party.";
      } else if (userMessage.toLowerCase().includes("payment")) {
        response =
          "Payment issues are common in disputes. Could you specify the payment terms and any correspondence regarding non-payment?";
      } else {
        response =
          "I need more context to assist you effectively. Could you please provide more details about your situation?";
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: response, sender: "lawyer", timestamp: new Date().toISOString() },
      ]);
      setLawyerTyping(false);
    }, 2000); // Simulate 2-second delay for lawyer response
  };

  // Handle sending a message
  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      simulateLawyerResponse(inputText);
    }
  }, [inputText]);

  // Render each message
  const renderMessage = ({ item }) => (
    <View>
         
          <View
      className={`mx-4 my-2 ${
        item.sender === "user"
          ? "self-end bg-blue-500"
          : "self-start bg-gray-700"
      } p-3 rounded-lg max-w-[70%]`}
    >
      <Text className="text-white">{item.text}</Text>
      <Text className="text-gray-400 text-xs mt-1">
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
    <Image
            source={item?.sender === "user"?{uri: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/30.jpg"}:{uri:'https://avatars.githubusercontent.com/u/23932683'}}
            className={`w-24 h-24 rounded-full ${
              item.sender === "user"
                ? "self-end bg-blue-500"
                : "self-start bg-gray-700"
            }`}
            style={{ width: 26, height: 26 }}
            
          />
    </View>
    
  );

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: "Hello, I'm here to assist you with your legal concerns. Please share the details of your situation, and I'll do my best to provide guidance.",
        sender: "lawyer",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-900"
    >
        <View className="flex-row justify-between">
        <Text className="text-white text-lg font-bold mx-4 mt-4">
          Chat with Lawyer
          </Text>
        </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        
        contentContainerStyle={{ padding: 10 }}
      />
      {lawyerTyping && (
        <View className="mx-4 mb-2 self-start bg-gray-700 p-3 rounded-lg max-w-[70%]">
          <Text className="text-gray-400 text-sm">Lawyer is typing...</Text>
        </View>
      )}
      <View className="flex-row items-center p-4 bg-gray-800 border-t border-gray-700">
        <TextInput
          className="flex-1 bg-gray-700 text-white p-2 rounded-lg mr-2"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          className="bg-blue-600 p-2 rounded-lg"
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}