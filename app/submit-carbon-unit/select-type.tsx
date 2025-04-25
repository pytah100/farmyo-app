import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Leaf, Zap, Car, Flower } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function SelectCarbonTypeScreen() {
  const router = useRouter();

  const handleSelectType = (type: string) => {
    router.push({
      pathname: "/submit-carbon-unit",
      params: { type }
    });
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
        <Text style={styles.headerTitle}>Submit a Carbon Unit</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select carbon unit types</Text>

        <TouchableOpacity
          style={[styles.typeCard, styles.natureBased]}
          onPress={() => handleSelectType("nature-based")}
        >
          <View style={[styles.iconContainer, styles.natureIcon]}>
            <Leaf size={24} color="#4CAF50" />
          </View>
          <Text style={styles.typeText}>Nature-based</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeCard, styles.renewable]}
          onPress={() => handleSelectType("renewable")}
        >
          <View style={[styles.iconContainer, styles.renewableIcon]}>
            <Zap size={24} color="#F57F17" />
          </View>
          <Text style={styles.typeText}>Renewable Energy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeCard, styles.mobility]}
          onPress={() => handleSelectType("mobility")}
        >
          <View style={[styles.iconContainer, styles.mobilityIcon]}>
            <Car size={24} color="#2196F3" />
          </View>
          <Text style={styles.typeText}>Mobility</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeCard, styles.biodiversity]}
          onPress={() => handleSelectType("biodiversity")}
        >
          <View style={[styles.iconContainer, styles.biodiversityIcon]}>
            <Flower size={24} color="#9C27B0" />
          </View>
          <Text style={styles.typeText}>Biodiversity</Text>
        </TouchableOpacity>
      </ScrollView>
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
  title: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 24
  },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16
  },
  natureBased: {
    backgroundColor: "#E8F5E9"
  },
  renewable: {
    backgroundColor: "#FFF9C4"
  },
  mobility: {
    backgroundColor: "#E3F2FD"
  },
  biodiversity: {
    backgroundColor: "#F3E5F5"
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  natureIcon: {
    backgroundColor: "#FFFFFF"
  },
  renewableIcon: {
    backgroundColor: "#FFFFFF"
  },
  mobilityIcon: {
    backgroundColor: "#FFFFFF"
  },
  biodiversityIcon: {
    backgroundColor: "#FFFFFF"
  },
  typeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333"
  }
});
