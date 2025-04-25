import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "@/store/authStore";
import Colors from "@/constants/colors";

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        style={styles.background}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200&auto=format&fit=crop"
            }}
            style={styles.logo}
          />
        </View>

        <Text style={styles.appName}>FarmYo</Text>
        <Text style={styles.tagline}>Carbon Credit Tracking</Text>
      </View>

      <Text style={styles.footer}>Empowering farmers, saving the planet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  content: {
    alignItems: "center"
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8
  },
  tagline: {
    fontSize: 18,
    color: "#DDFF55",
    marginBottom: 8
  },
  footer: {
    position: "absolute",
    bottom: 40,
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8
  }
});
