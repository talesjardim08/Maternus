import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Telas internas
import Home from "../home";
import Profile from "../Profile";
import Notifications from "../Notifications";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications" size={28} color={focused ? "#3B82F6" : "#9CA3AF"} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={28} color={focused ? "#3B82F6" : "#9CA3AF"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={28} color={focused ? "#3B82F6" : "#9CA3AF"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = {
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    height: 70,
    paddingTop: 8,
  },
};
