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
import { ArrowLeft, Calendar, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";

// Define the CarbonUnit interface
interface CarbonUnit {
  id: string;
  type: string;
  status: string;
  date: string;
}

// Status filter options
const statusOptions = ["All Status", "Approved", "Pending", "Rejected"];

export default function CarbonUnitsScreen() {
  const router = useRouter();
  const { carbonUnits } = useStore();
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Filter units based on selected status
  const filteredUnits =
    selectedStatus === "All Status"
      ? carbonUnits
      : carbonUnits.filter((unit) => unit.status === selectedStatus);

  // Calculate totals
  const natureBased = carbonUnits.filter(
    (unit) => unit.type === "nature-based"
  ).length;
  const renewable = carbonUnits.filter(
    (unit) => unit.type === "renewable"
  ).length;

  // Render empty state if no units
  const renderEmptyState = () => {
    if (carbonUnits.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>🌱</Text>
          </View>
          <Text style={styles.emptyTitle}>No carbon units yet</Text>
          <Text style={styles.emptySubtitle}>
            Submit carbon unit and get credit points.
          </Text>
        </View>
      );
    }

    if (filteredUnits.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No {selectedStatus.toLowerCase()} carbon units
          </Text>
          <Text style={styles.emptySubtitle}>
            Try selecting a different filter.
          </Text>
        </View>
      );
    }

    return null;
  };

  // Render unit item
  const renderUnitItem = ({ item }: { item: CarbonUnit }) => {
    const isNatureBased = item.type === "nature-based";

    return (
      <View style={styles.unitItem}>
        <View style={styles.unitHeader}>
          {isNatureBased ? (
            <View style={styles.unitIconContainer}>
              <View style={styles.natureIcon} />
            </View>
          ) : (
            <View style={styles.unitIconContainer}>
              <View style={styles.energyIcon} />
            </View>
          )}

          <Text style={styles.unitTitle}>
            {isNatureBased ? "Nature-based" : "Renewable Energy"}
          </Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "Approved"
                ? styles.approvedBadge
                : item.status === "Pending"
                ? styles.pendingBadge
                : styles.rejectedBadge
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Approved"
                  ? styles.approvedText
                  : item.status === "Pending"
                  ? styles.pendingText
                  : styles.rejectedText
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.unitDetails}>
          <View style={styles.detailRow}>
            <Calendar size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>Kabaale, Kashekye Uganda.</Text>
          </View>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>My Carbon Units</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconNature}>
              <View style={styles.leafIcon} />
            </View>
            <View>
              <Text style={styles.summaryLabel}>
                Total nature-based carbon units
              </Text>
              <Text style={styles.summaryValue}>{natureBased}</Text>
              <Text style={styles.summaryChange}>+1 in this month</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconEnergy}>
              <View style={styles.boltIcon} />
            </View>
            <View>
              <Text style={styles.summaryLabel}>
                Total renewable energy carbon units
              </Text>
              <Text style={styles.summaryValue}>{renewable}</Text>
              <Text style={styles.summaryChange}>+1 in this month</Text>
            </View>
          </View>
        </View>

        {/* Status filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                selectedStatus === status && styles.filterButtonActive
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === status && styles.filterTextActive
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Carbon units list */}
        {renderEmptyState() || (
          <FlatList
            data={filteredUnits}
            renderItem={renderUnitItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ScrollView>

      {/* Add button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/submit-carbon-unit")}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Add Carbon Unit</Text>
      </TouchableOpacity>
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
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  summaryIconNature: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  summaryIconEnergy: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF9C4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  leafIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2E7D32",
    backgroundColor: "#4CAF50"
  },
  boltIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFD600",
    borderWidth: 2,
    borderColor: "#FFC107"
  },
  summaryLabel: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 4
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2
  },
  summaryChange: {
    fontSize: 12,
    color: "#4CAF50"
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0"
  },
  filterButtonActive: {
    backgroundColor: "#DDFF55",
    borderColor: "#DDFF55"
  },
  filterText: {
    fontSize: 14,
    color: "#757575"
  },
  filterTextActive: {
    color: "#333333",
    fontWeight: "500"
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100 // Space for the add button
  },
  unitItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  },
  unitHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  unitIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  natureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50"
  },
  energyIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFD600"
  },
  unitTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333"
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  approvedBadge: {
    backgroundColor: "#DDFF55"
  },
  pendingBadge: {
    backgroundColor: "#FFF9C4"
  },
  rejectedBadge: {
    backgroundColor: "#FFEBEE"
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500"
  },
  approvedText: {
    color: "#333333"
  },
  pendingText: {
    color: "#F57F17"
  },
  rejectedText: {
    color: "#F44336"
  },
  unitDetails: {
    backgroundColor: "#F5F7F9",
    padding: 16
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  detailText: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 8
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  addButtonIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF"
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
