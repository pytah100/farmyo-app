import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.push("/(tabs)")}
      >
        <X size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Check size={32} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Success!</Text>
        <Text style={styles.message}>
          Your carbon unit has been successful{"\n"}
          we will notify you when it is approved!
        </Text>

        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => router.push("/carbon-units")}
        >
          <Text style={styles.checkButtonText}>Check carbon unit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitAnotherButton}
          onPress={() => router.push("/submit-carbon-unit")}
        >
          <Text style={styles.submitAnotherText}>Submit another</Text>
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
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 4
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F8F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16
  },
  message: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40
  },
  checkButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
    marginBottom: 16
  },
  checkButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600"
  },
  submitAnotherButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center"
  },
  submitAnotherText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500"
  }
});
