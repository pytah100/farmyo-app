import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // In a real app, you would validate and authenticate here
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["rgba(0, 77, 64, 0.05)", "rgba(0, 77, 64, 0.1)"]}
          style={styles.background}
        />

        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=100&auto=format&fit=crop"
            }}
            style={styles.logo}
          />
          <Text style={styles.appName}>FarmYo</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Mail
              size={20}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor="#AAAAAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock
              size={20}
              color={Colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AAAAAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={Colors.textSecondary} />
              ) : (
                <Eye size={20} color={Colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 12
  },
  formContainer: {
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12
  },
  inputIcon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333"
  },
  eyeIcon: {
    padding: 8
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500"
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  loginButtonText: {
    color: "#DDFF55",
    fontSize: 16,
    fontWeight: "600"
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  signupText: {
    fontSize: 14,
    color: Colors.textSecondary
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500"
  }
});
