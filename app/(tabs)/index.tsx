import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, ArrowRight, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";
import ProgressBar from "@/components/ProgressBar";

export default function HomeScreen() {
  const router = useRouter();
  const { user, points, carbonUnits } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with profile */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop"
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>Hi, {user.name}</Text>
              <View style={styles.verifiedBadge}>
                <View style={styles.verifiedDot} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Points section */}
        <TouchableOpacity
          style={styles.pointsCard}
          onPress={() => router.push("/credit-points")}
        >
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Minimum Cashout</Text>
            <Text style={styles.pointsThreshold}>10,000 /5,000 points</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <ProgressBar progress={Math.min(1, points / 15000)} />
          </View>

          <View style={styles.pointsInfoContainer}>
            <View>
              <Text style={styles.pointsAmount}>{points.toLocaleString()}</Text>
              <Text style={styles.pointsSubtext}>Credit Points</Text>
              <Text style={styles.pointsEquivalent}>
                Equals RM{(points / 100).toFixed(0)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cashoutButton}
              onPress={() => router.push("/credit-points/cashout")}
            >
              <Text style={styles.cashoutButtonText}>Cashout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={["rgba(0, 77, 64, 0.7)", "rgba(0, 77, 64, 0.85)"]}
            style={styles.bannerGradient}
          >
            <Text style={styles.bannerTitle}>
              Welcome to your micro-offset journey & saving the planet.
            </Text>
          </LinearGradient>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop"
            }}
            style={styles.bannerImage}
          />
        </View>

        {/* Carbon Unit Card */}
        <View style={styles.carbonUnitCard}>
          <View>
            <Text style={styles.carbonUnitTitle}>Carbon Unit</Text>
            <Text style={styles.carbonUnitDescription}>
              A simple concept of reducing the amount of CO2 in the atmosphere.
            </Text>
            <TouchableOpacity
              style={styles.viewUnitsButton}
              onPress={() => router.push("/carbon-units")}
            >
              <Text style={styles.viewUnitsText}>View carbon units</Text>
              <ArrowRight size={16} color="#004D40" />
            </TouchableOpacity>
          </View>
          <View style={styles.carbonIconContainer}>
            <View style={styles.carbonIcon}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=100&auto=format&fit=crop"
                }}
                style={styles.leafImage}
              />
            </View>
          </View>
        </View>

        {/* Recent Carbon Units */}
        <View style={styles.recentUnitsContainer}>
          <View style={styles.recentUnitsHeader}>
            <Text style={styles.recentUnitsTitle}>Recent carbon units</Text>
            <TouchableOpacity onPress={() => router.push("/carbon-units")}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {carbonUnits.slice(0, 3).map((unit, index) => (
            <View key={index} style={styles.unitItem}>
              <View style={styles.unitItemLeft}>
                <View style={styles.unitIcon}>
                  {unit.type === "renewable" ? (
                    <View style={styles.energyIcon} />
                  ) : (
                    <View style={styles.natureIcon} />
                  )}
                </View>
                <View>
                  <Text style={styles.unitTitle}>{unit.title}</Text>
                  <View style={styles.unitTimeContainer}>
                    <Clock size={14} color="#757575" />
                    <Text style={styles.unitTime}>{unit.date}</Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.unitStatus,
                  {
                    backgroundColor:
                      unit.status === "Approved"
                        ? "#E8F5E9"
                        : unit.status === "Pending"
                        ? "#FFF9C4"
                        : "#FFEBEE"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.unitStatusText,
                    {
                      color:
                        unit.status === "Approved"
                          ? "#2E7D32"
                          : unit.status === "Pending"
                          ? "#F57F17"
                          : "#F44336"
                    }
                  ]}
                >
                  {unit.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  profileInfo: {
    justifyContent: "center"
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start"
  },
  verifiedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00897B",
    marginRight: 4
  },
  verifiedText: {
    fontSize: 12,
    color: "#00897B",
    fontWeight: "500"
  },
  notificationButton: {
    position: "relative",
    padding: 8
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F44336"
  },
  pointsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  pointsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  pointsLabel: {
    fontSize: 14,
    color: "#757575"
  },
  pointsThreshold: {
    fontSize: 14,
    color: "#757575"
  },
  progressBarContainer: {
    marginBottom: 16
  },
  pointsInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pointsAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2
  },
  pointsSubtext: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 2
  },
  pointsEquivalent: {
    fontSize: 14,
    color: "#757575"
  },
  cashoutButton: {
    backgroundColor: "#004D40",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24
  },
  cashoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16
  },
  bannerContainer: {
    height: 180,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative"
  },
  bannerImage: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  bannerGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26
  },
  carbonUnitCard: {
    backgroundColor: "#F5F7F9",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0"
  },
  carbonUnitTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8
  },
  carbonUnitDescription: {
    fontSize: 14,
    color: "#757575",
    lineHeight: 20,
    marginBottom: 12,
    maxWidth: "80%"
  },
  viewUnitsButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  viewUnitsText: {
    fontSize: 14,
    color: "#004D40",
    fontWeight: "500",
    marginRight: 4
  },
  carbonIconContainer: {
    marginLeft: 10
  },
  carbonIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#004D40",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
    overflow: "hidden"
  },
  leafImage: {
    width: 60,
    height: 60,
    transform: [{ rotate: "-45deg" }]
  },
  recentUnitsContainer: {
    marginHorizontal: 20,
    marginBottom: 40
  },
  recentUnitsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  recentUnitsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  viewAllText: {
    fontSize: 14,
    color: "#004D40",
    fontWeight: "500"
  },
  unitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  unitItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  unitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  energyIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFD600"
  },
  natureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50"
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4
  },
  unitTimeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  unitTime: {
    fontSize: 12,
    color: "#757575",
    marginLeft: 4
  },
  unitStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  unitStatusText: {
    fontSize: 12,
    fontWeight: "500"
  }
});
