import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";

export default function CashoutScreen() {
  const router = useRouter();
  const { points, cashoutPoints } = useStore();
  const [amount, setAmount] = useState(points.toString());

  const handleCashout = () => {
    const cashoutAmount = parseInt(amount);
    if (cashoutAmount > 0 && cashoutAmount <= points) {
      cashoutPoints(cashoutAmount);
      router.push("/credit-points");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Credit Cashout</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          {/* Available points */}
          <Text style={styles.sectionLabel}>Available credit points</Text>
          <Text style={styles.pointsAmount}>{points.toLocaleString()}</Text>
          <Text style={styles.pointsEquivalent}>
            Equals RM{(points / 100).toFixed(0)}
          </Text>

          <View style={styles.divider} />

          {/* Cashout amount */}
          <Text style={styles.sectionLabel}>Cashout amount</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Text style={styles.amountLimits}>
            Min. amount 5,000 points, max amount 50,000 points.
          </Text>

          {/* Next button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              (parseInt(amount) < 5000 || parseInt(amount) > points) &&
                styles.nextButtonDisabled
            ]}
            onPress={handleCashout}
            disabled={parseInt(amount) < 5000 || parseInt(amount) > points}
          >
            <Text
              style={[
                styles.nextButtonText,
                (parseInt(amount) < 5000 || parseInt(amount) > points) &&
                  styles.nextButtonTextDisabled
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F9"
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
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  content: {
    padding: 20
  },
  sectionLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8
  },
  pointsAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  pointsEquivalent: {
    fontSize: 14,
    color: "#757575"
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 24
  },
  amountInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: "#333",
    marginBottom: 8
  },
  amountLimits: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 24
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center"
  },
  nextButtonDisabled: {
    backgroundColor: "#E0E0E0"
  },
  nextButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600"
  },
  nextButtonTextDisabled: {
    color: "#AAAAAA"
  }
});
