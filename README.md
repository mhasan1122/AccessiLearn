# AccessiLearn

A React Native mobile application designed to demonstrate and implement comprehensive accessibility features for inclusive learning experiences.

## Approach

AccessiLearn is built with a **user-centered accessibility-first approach**, implementing WCAG (Web Content Accessibility Guidelines) principles in a mobile context. The application showcases various accessibility features that can be toggled on/off to accommodate different user needs and preferences.

### Key Features Implemented:

- **Visual Accessibility**: Dark mode, high contrast, and customizable text sizing
- **Typography Controls**: Adjustable line height, letter spacing, and text alignment
- **Cognitive Support**: Pause animations, dyslexia-friendly fonts, and enhanced text spacing
- **Interactive Elements**: Highlighted links and customizable cursor visibility
- **Persistent Settings**: User preferences are saved locally and restored on app restart

### Technical Architecture:

- **State Management**: Redux Toolkit for centralized accessibility state management
- **Storage**: AsyncStorage for persistent user preferences
- **Styling**: NativeWind (Tailwind CSS for React Native) for consistent, accessible styling
- **Animations**: React Native Animated API with pause functionality
- **Type Safety**: Full TypeScript implementation

## Assumptions Made

1. **User Preferences**: Users may have varying accessibility needs that can be addressed through UI customization
2. **Persistent Settings**: Users expect their accessibility preferences to be remembered across app sessions
3. **Real-time Updates**: Accessibility changes should apply immediately without requiring app restart
4. **Mobile-First**: The application is designed primarily for mobile devices using React Native
5. **Cross-Platform**: The app should work consistently across iOS and Android platforms
6. **Performance**: Accessibility features should not significantly impact app performance
7. **User Control**: Users should have full control over which accessibility features are enabled

## How to Run the Project

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd AccessiLearn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Running on Different Platforms

- **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
- **Android Emulator**: Press `a` in the terminal or run `npm run android`
- **Web Browser**: Press `w` in the terminal or run `npm run web`
- **Physical Device**: Scan the QR code with the Expo Go app

### Development Commands

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with ESLint and Prettier

### Project Structure

```
AccessiLearn/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx      # App header component
│   │   └── AccessibilityMenu.tsx  # Accessibility controls
│   ├── screens/            # Screen components
│   │   └── MainScreen.tsx  # Main application screen
│   └── store/              # Redux store configuration
│       ├── accessibilitySlice.ts  # Accessibility state management
│       ├── hooks.ts        # Redux hooks
│       └── store.ts        # Store configuration
├── App.tsx                 # Root application component
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

### Testing Accessibility Features

1. **Open the app** and navigate to the main screen
2. **Access the accessibility menu** by tapping the accessibility icon
3. **Toggle different features** to see how they affect the UI:
   - Dark mode for reduced eye strain
   - High contrast for better visibility
   - Larger text for readability
   - Increased line height and letter spacing
   - Pause animations for users with vestibular disorders
   - Dyslexia-friendly font options

### Building for Production

```bash
# Prebuild the project
npm run prebuild

# Build for specific platforms
expo build:ios
expo build:android
```

## Contributing

When contributing to this project, please ensure:

1. All accessibility features are tested with screen readers
2. Color contrast ratios meet WCAG AA standards
3. Touch targets are at least 44x44 points
4. All interactive elements are keyboard accessible
5. Animations can be paused or disabled

