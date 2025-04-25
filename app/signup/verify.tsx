import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState("");

  const handleComplete = () => {
    // In a real app, you would validate and submit the verification
    router.replace("/(tabs)");
  };

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
        <Text style={styles.headerTitle}>Setup Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 3/3</Text>
        </View>

        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.subtitle}>
          Use a valid government-issued identity
        </Text>

        <Text style={styles.inputLabel}>Identity Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Input your identity card number"
          placeholderTextColor="#AAAAAA"
          value={idNumber}
          onChangeText={setIdNumber}
        />

        <View style={styles.idCardContainer}>
          <View style={styles.idCardPlaceholder}>
            <View style={styles.idCardLine} />
            <View style={styles.idCardLine} />
            <View style={styles.idCardRow}>
              <View style={styles.idCardLine} />
              <View style={styles.idCardPhoto} />
            </View>
            <View style={styles.idCardLine} />
            <View style={styles.idCardLine} />
          </View>
        </View>

        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={20} color="#FFFFFF" />
          <Text style={styles.cameraButtonText}>Take a photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, idNumber ? styles.nextButtonActive : null]}
          onPress={idNumber ? handleComplete : undefined}
        >
          <Text
            style={[
              styles.nextButtonText,
              idNumber ? styles.nextButtonTextActive : null
            ]}
          >
            Next
          </Text>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24
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
    marginBottom: 24
  },
  inputLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 24
  },
  idCardContainer: {
    marginBottom: 24
  },
  idCardPlaceholder: {
    backgroundColor: "#F5F7F9",
    borderRadius: 8,
    padding: 20,
    height: 200,
    justifyContent: "center"
  },
  idCardLine: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginBottom: 12,
    width: "70%"
  },
  idCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  idCardPhoto: {
    width: 80,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 4
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  cameraButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  },
  nextButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 16,
    alignItems: "center"
  },
  nextButtonActive: {
    backgroundColor: Colors.primary
  },
  nextButtonText: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "600"
  },
  nextButtonTextActive: {
    color: "#DDFF55"
  }
});
