import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, CreditCard } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";
import ProgressBar from "@/components/ProgressBar";

// Define the type for history items
interface HistoryItem {
  id: string;
  date: string;
  submissionId: string;
  points: number;
}

export default function CreditPointsScreen() {
  const router = useRouter();
  const { points, pointsHistory } = useStore();
  const [activeTab, setActiveTab] = useState("Earned");

  // Calculate progress for the progress bar
  const progressPercentage = Math.min(1, points / 15000);

  // Render empty state if no points history
  const renderEmptyState = () => {
    if (pointsHistory.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>💰</Text>
          </View>
          <Text style={styles.emptyTitle}>No points history yet</Text>
          <Text style={styles.emptySubtitle}>
            after your first carbon unit has been approved.
          </Text>
        </View>
      );
    }

    return null;
  };

  // Render history item
  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={styles.historyDescription}>
          Earn from submission #{item.submissionId}
        </Text>
      </View>
      <Text style={styles.historyPoints}>{item.points} points</Text>
    </View>
  );

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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Points summary */}
        <View style={styles.pointsSummary}>
          <Text style={styles.pointsAmount}>{points.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>Credit Points</Text>
          <Text style={styles.pointsEquivalent}>
            Equals RM{(points / 100).toFixed(0)}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabel}>Minimum Cashout</Text>
            <Text style={styles.progressValue}>
              {points.toLocaleString()} /5,000 points
            </Text>
          </View>
          <ProgressBar progress={progressPercentage} />
        </View>

        {/* Cashout button */}
        <TouchableOpacity
          style={[
            styles.cashoutButton,
            points < 5000 && styles.cashoutButtonDisabled
          ]}
          onPress={() =>
            points >= 5000 && router.push("/credit-points/cashout")
          }
          disabled={points < 5000}
        >
          <CreditCard
            size={20}
            color={points >= 5000 ? "#DDFF55" : "#AAAAAA"}
          />
          <Text
            style={[
              styles.cashoutButtonText,
              points < 5000 && styles.cashoutButtonTextDisabled
            ]}
          >
            Cashout
          </Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Earned" ? styles.activeTab : null
            ]}
            onPress={() => setActiveTab("Earned")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Earned" ? styles.activeTabText : null
              ]}
            >
              Earned
            </Text>
            {activeTab === "Earned" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Redeemed" ? styles.activeTab : null
            ]}
            onPress={() => setActiveTab("Redeemed")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Redeemed" ? styles.activeTabText : null
              ]}
            >
              Redeemed
            </Text>
            {activeTab === "Redeemed" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        </View>

        {/* Points history */}
        {renderEmptyState() || (
          <FlatList
            data={pointsHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.historyContainer}
          />
        )}
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
  pointsSummary: {
    alignItems: "center",
    marginVertical: 20
  },
  pointsAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  pointsLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 2
  },
  pointsEquivalent: {
    fontSize: 14,
    color: "#757575"
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
  cashoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24
  },
  cashoutButtonDisabled: {
    backgroundColor: "#E0E0E0"
  },
  cashoutButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  },
  cashoutButtonTextDisabled: {
    color: "#AAAAAA"
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
    paddingHorizontal: 20,
    paddingBottom: 40
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
  emptyIcon: {
    fontSize: 40
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center"
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center"
  }
});
