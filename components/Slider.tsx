import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeTouchEvent
} from "react-native";
import Colors from "@/constants/colors";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
}

export default function Slider({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1
}: SliderProps) {
  const steps = [];
  const range = maximumValue - minimumValue;

  // Create steps
  for (let i = minimumValue; i <= maximumValue; i += step) {
    steps.push(i);
  }

  // Calculate thumb position
  const position = ((value - minimumValue) / range) * 100;

  // Handle press on track
  const handleTrackPress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const target = event.currentTarget as unknown as View;
    target.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        const percent = locationX / width;
        const newValue =
          minimumValue + Math.round((percent * range) / step) * step;
        onValueChange(Math.max(minimumValue, Math.min(maximumValue, newValue)));
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.track}
        onPress={handleTrackPress}
        activeOpacity={1}
      >
        <View style={styles.fill} />
        <View style={[styles.thumb, { left: `${position}%` }]} />

        {/* Step markers */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.stepMarker,
                { left: `${((index * step) / range) * 100}%` }
              ]}
              onPress={() => onValueChange(step)}
            />
          ))}
        </View>
      </TouchableOpacity>

      {/* Step labels */}
      <View style={styles.labelsContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.labelContainer,
              { left: `${((index * step) / range) * 100}%` }
            ]}
          >
            <TouchableOpacity
              onPress={() => onValueChange(step)}
              style={styles.labelTouchable}
            >
              <View style={styles.label}>
                <View
                  style={[
                    styles.labelText,
                    value === step && styles.activeLabelText
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 20
  },
  track: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginVertical: 16
  },
  fill: {
    position: "absolute",
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    top: -8,
    marginLeft: -10
  },
  stepsContainer: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  stepMarker: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    top: -4,
    marginLeft: -6
  },
  labelsContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4
  },
  labelContainer: {
    position: "absolute",
    alignItems: "center",
    marginLeft: -15
  },
  labelTouchable: {
    padding: 4
  },
  label: {
    alignItems: "center"
  },
  labelText: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#AAAAAA"
  },
  activeLabelText: {
    backgroundColor: Colors.primary
  }
});
