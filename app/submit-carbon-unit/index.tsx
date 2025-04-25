import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/carbonStore";
import Colors from "@/constants/colors";
import Slider from "@/components/Slider";

export default function SubmitCarbonUnitScreen() {
  const router = useRouter();
  const { addCarbonUnit } = useStore();

  const [hectares, setHectares] = useState("15");
  const [locationSize, setLocationSize] = useState(2);
  const [crop, setCrop] = useState("Kampung Bahru");
  const [hectaresPerYear, setHectaresPerYear] = useState("Kampung Bahru");
  const [season, setSeason] = useState("0700 100 100");
  const [phoneNumber, setPhoneNumber] = useState("0700 100 100");

  const handleSubmit = () => {
    // Add the carbon unit to the store
    addCarbonUnit({
      title: "Nature-based",
      type: "nature-based",
      date: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
      status: "Pending",
      points: 100
    });

    // Navigate to success screen
    router.push("/submit-carbon-unit/success");
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
        <Text style={styles.headerTitle}>Submit Carbon Unit</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Location */}
        <View style={styles.locationContainer}>
          <MapPin size={16} color={Colors.primary} />
          <Text style={styles.locationText}>
            Located at Kabaale, Rukushenga Subcounty
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Carbon unit's details</Text>

        {/* Hectares input */}
        <Text style={styles.inputLabel}>Hectares of arable cropped land</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={hectares}
            onChangeText={setHectares}
            keyboardType="numeric"
          />
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>acre</Text>
          </View>
        </View>

        {/* Location size slider */}
        <Text style={styles.inputLabel}>
          Location Size in Meter-Square (Optional)
        </Text>
        <Slider
          value={locationSize}
          onValueChange={setLocationSize}
          minimumValue={0}
          maximumValue={10}
          step={1}
        />

        {/* Crop selection */}
        <Text style={styles.inputLabel}>
          Select a crop you've grown over the past 5 years to define your
          farming practices.
        </Text>
        <Text style={[styles.inputLabel, { marginTop: 16 }]}>
          Select a crop
        </Text>
        <TextInput style={styles.input} value={crop} onChangeText={setCrop} />

        {/* Hectares per year */}
        <Text style={styles.inputLabel}>
          On average, how many hectares do you plant per year?
        </Text>
        <TextInput
          style={styles.input}
          value={hectaresPerYear}
          onChangeText={setHectaresPerYear}
        />

        {/* Season */}
        <Text style={styles.inputLabel}>Season</Text>
        <TextInput
          style={styles.input}
          value={season}
          onChangeText={setSeason}
        />

        {/* Phone number */}
        <Text style={styles.inputLabel}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
    padding: 20,
    paddingBottom: 40
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 20
  },
  unitContainer: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderLeftWidth: 0
  },
  unitText: {
    fontSize: 16,
    color: "#757575"
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20
  },
  submitButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600"
  }
});
