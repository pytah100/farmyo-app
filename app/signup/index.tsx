import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, User, Building2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <LinearGradient
        colors={["rgba(0, 77, 64, 0.05)", "rgba(0, 77, 64, 0.1)"]}
        style={styles.background}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 1/3</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 1/3</Text>
        </View>

        <Text style={styles.title}>Let's sign up!</Text>
        <Text style={styles.subtitle}>Who is this account created for?</Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push("/signup/personal-info")}
        >
          <View style={styles.optionIconContainer}>
            <User size={24} color={Colors.primary} />
          </View>
          <Text style={styles.optionText}>Individual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, styles.corporateButton]}
          onPress={() => router.push("/signup/personal-info")}
        >
          <View
            style={[styles.optionIconContainer, styles.corporateIconContainer]}
          >
            <Building2 size={24} color="#F57F17" />
          </View>
          <Text style={styles.optionText}>Corporate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 16,
    color: "#757575"
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  stepIndicator: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 24
  },
  stepText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 32
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16
  },
  corporateButton: {
    backgroundColor: "#FFF9C4"
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  corporateIconContainer: {
    backgroundColor: "#FFFFFF"
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333"
  }
});
