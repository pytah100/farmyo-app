import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Settings,
  CreditCard,
  Award,
  HelpCircle,
  LogOut
} from "lucide-react-native";
import { useStore } from "@/store/carbonStore";

export default function AccountScreen() {
  const { user } = useStore();

  const menuItems = [
    {
      icon: <Settings size={24} color="#333" />,
      title: "Settings",
      subtitle: "App preferences"
    },
    {
      icon: <CreditCard size={24} color="#333" />,
      title: "Payment Methods",
      subtitle: "Manage your payment options"
    },
    {
      icon: <Award size={24} color="#333" />,
      title: "Achievements",
      subtitle: "View your eco-badges"
    },
    {
      icon: <HelpCircle size={24} color="#333" />,
      title: "Help & Support",
      subtitle: "Get assistance"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop"
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10,000</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Offsets</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>120kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F9"
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 14,
    color: "#757575"
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E0F2F1",
    borderRadius: 20
  },
  editButtonText: {
    color: "#004D40",
    fontWeight: "500"
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  statItem: {
    flex: 1,
    alignItems: "center"
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: "#757575"
  },
  statDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E0E0E0"
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  menuIconContainer: {
    marginRight: 16
  },
  menuTextContainer: {
    flex: 1
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#757575"
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#F44336"
  }
});
