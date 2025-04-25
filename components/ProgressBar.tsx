import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
}

export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor = "#E0E0E0",
  fillColor = "#004D40",
  borderRadius = 4
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius
        }
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
            borderRadius
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden"
  },
  fill: {
    height: "100%"
  }
});
