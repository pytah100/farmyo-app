import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Repeat, Minus, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";
import ProgressBar from "@/components/ProgressBar";

export default function ConvertPointsScreen() {
  const router = useRouter();
  const { points, cashoutPoints } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState("1");

  // Calculate progress for the progress bar
  const progressPercentage = Math.min(1, points / 5000);

  const handleIncrement = () => {
    const currentValue = parseInt(quantity);
    if (currentValue < Math.floor(points / 1000)) {
      setQuantity((currentValue + 1).toString());
    }
  };

  const handleDecrement = () => {
    const currentValue = parseInt(quantity);
    if (currentValue > 1) {
      setQuantity((currentValue - 1).toString());
    }
  };

  const handleConvert = () => {
    const convertAmount = parseInt(quantity) * 1000;
    if (convertAmount > 0 && convertAmount <= points) {
      cashoutPoints(convertAmount);
      setShowModal(false);
      router.push("/credit-points");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Points</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Points conversion */}
        <View style={styles.conversionContainer}>
          <View style={styles.pointsColumn}>
            <Text style={styles.pointsAmount}>2,000</Text>
            <Text style={styles.pointsLabel}>Credit Points</Text>
          </View>

          <View style={styles.convertLabel}>
            <Text style={styles.convertText}>Convert</Text>
          </View>

          <View style={styles.pointsColumn}>
            <Text style={styles.pointsAmount}>3000 UGX</Text>
            <Text style={styles.pointsLabel}>Credit Points</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabel}>Minimum Conversion</Text>
            <Text style={styles.progressValue}>2,000 /5,000 points</Text>
          </View>
          <ProgressBar progress={progressPercentage} fillColor="#DDFF55" />
        </View>

        {/* Convert button */}
        <TouchableOpacity
          style={styles.convertButton}
          onPress={() => setShowModal(true)}
        >
          <Repeat size={20} color="#DDFF55" />
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Earned</Text>
            <View style={styles.activeTabIndicator} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Redeemed</Text>
          </TouchableOpacity>
        </View>

        {/* Points history */}
        <View style={styles.historyContainer}>
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>10Feb 2023,11:42 AM</Text>
              <Text style={styles.historyDescription}>
                Earn from submission #151278
              </Text>
            </View>
            <Text style={styles.historyPoints}>21 points</Text>
          </View>

          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>5Feb 2023,04:41PM</Text>
              <Text style={styles.historyDescription}>
                Earn from submission #151260
              </Text>
            </View>
            <Text style={styles.historyPoints}>21 points</Text>
          </View>

          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>1Feb 2023,07:42AM</Text>
              <Text style={styles.historyDescription}>
                Earn from submission #151252
              </Text>
            </View>
            <Text style={styles.historyPoints}>79 points</Text>
          </View>

          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>30 Jan 2023,08:42AM</Text>
              <Text style={styles.historyDescription}>
                Earn from submission #151251
              </Text>
            </View>
            <Text style={styles.historyPoints}>90 points</Text>
          </View>
        </View>
      </View>

      {/* Conversion Modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Convert Credit Points</Text>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Available credit points</Text>
              <Text style={styles.modalPointsAmount}>2,000</Text>

              <Text style={styles.modalLabel}>Certificate amount</Text>
              <Text style={styles.modalConversionRate}>
                Conversion rate: 1,000 points=1 Carbon Tonne Certificate
              </Text>

              <Text style={styles.modalInstructions}>
                Enter the quantity of Credit Carbon Certificate convert.
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleDecrement}
                >
                  <Minus size={20} color="#333" />
                </TouchableOpacity>

                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  textAlign="center"
                />

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleIncrement}
                >
                  <Plus size={20} color="#333" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.modalConvertButton}
                onPress={handleConvert}
              >
                <Text style={styles.modalConvertButtonText}>Convert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    flex: 1
  },
  conversionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 20
  },
  pointsColumn: {
    alignItems: "center"
  },
  pointsAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  pointsLabel: {
    fontSize: 12,
    color: "#757575"
  },
  convertLabel: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  convertText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500"
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 16
  },
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  progressLabel: {
    fontSize: 14,
    color: "#757575"
  },
  progressValue: {
    fontSize: 14,
    color: "#757575"
  },
  convertButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24
  },
  convertButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 16
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    position: "relative"
  },
  activeTab: {
    // Remove fontWeight as it's not a valid ViewStyle property
  },
  tabText: {
    fontSize: 16,
    color: "#757575"
  },
  activeTabText: {
    color: "#333",
    fontWeight: "600"
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    width: 40,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 1.5
  },
  historyContainer: {
    paddingHorizontal: 20
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  historyDate: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4
  },
  historyDescription: {
    fontSize: 14,
    color: "#333"
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden"
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  modalContent: {
    padding: 20
  },
  modalLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8
  },
  modalPointsAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24
  },
  modalConversionRate: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 16
  },
  modalInstructions: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center"
  },
  quantityInput: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginHorizontal: 16,
    fontSize: 18,
    color: "#333"
  },
  modalConvertButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center"
  },
  modalConvertButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600"
  }
});
