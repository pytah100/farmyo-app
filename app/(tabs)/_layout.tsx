import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Home, User, Plus } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#004D40",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: styles.tabBar,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: () => (
            <Plus size={24} color="#FFFFFF" style={styles.plusIcon} />
          )
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <User size={24} color={color} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8
  },
  plusIcon: {
    backgroundColor: "#004D40",
    borderRadius: 50,
    padding: 12,
    marginBottom: 20,
    overflow: "hidden"
  }
});
