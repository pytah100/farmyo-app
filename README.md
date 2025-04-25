# Farmyo App

A mobile application for tracking and managing carbon units, built with React Native and Expo.

## Overview

Farmyo App is a platform that allows users to submit, track, and manage carbon units. The app features:

- User authentication (login/signup)
- Carbon unit submission and tracking
- Credit points system
- Points conversion and redemption

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **UI Components**: React Native components with custom styling
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **Styling**: NativeWind (Tailwind CSS for React Native)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmyo-app.git
   cd farmyo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on a device or emulator:
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Scan the QR code with the Expo Go app on your physical device

## Project Structure

- `/app` - Main application screens and navigation
- `/components` - Reusable UI components
- `/constants` - App constants and theme configuration
- `/store` - State management with Zustand
- `/assets` - Images, fonts, and other static assets

## Features

### Authentication
- User registration and login
- Profile management

### Carbon Units
- Submit new carbon units
- Track existing carbon units
- Filter by status (Approved, Pending, Rejected)

### Credit Points
- Earn points for carbon unit submissions
- Convert points to certificates
- Track point history

## Development

### Running Tests
```bash
npm test
# or
yarn test
```

### Building for Production
```bash
expo build:android
expo build:ios
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
