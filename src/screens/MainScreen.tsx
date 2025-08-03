import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Header from '../components/Header';
import AccessibilityMenu from '../components/AccessibilityMenu';
import { loadAccessibilitySettings } from '../store/accessibilitySlice';

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const {
    darkMode,
    lineHeight,
    letterSpacing,
    textAlign,
    contrast,
    highlightLinks,
    biggerText,
    textSpacing,
    pauseAnimations,
    dyslexia,
    cursor
  } = useAppSelector((state) => state.accessibility);

  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [darkMode, lineHeight, letterSpacing, textAlign, contrast, highlightLinks, biggerText, textSpacing, pauseAnimations, dyslexia, cursor]);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('accessibilitySettings');
      if (settings) {
        dispatch(loadAccessibilitySettings(JSON.parse(settings)));
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        darkMode,
        lineHeight,
        letterSpacing,
        textAlign,
        contrast,
        highlightLinks,
        biggerText,
        textSpacing,
        pauseAnimations,
        dyslexia,
        cursor,
      };
      await AsyncStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  };




  const getTextColor = () => {
    if (darkMode) {
      return contrast ? '#ffffff' : '#ffffff';
    }
    return contrast ? '#000000' : '#1f2937';
  };

  const getSecondaryTextColor = () => {
    if (darkMode) {
      return contrast ? '#d1d5db' : '#e5e7eb';
    }
    return contrast ? '#374151' : '#6b7280';
  };

  const getFontFamily = () => {
    return dyslexia ? 'System' : 'System';
  };

  const animateTransition = () => {
    if (!pauseAnimations) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    animateTransition();
  }, [darkMode, contrast, biggerText]);

  return (
    <View className="flex-1">
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('../../assets/screen.png')}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Optional overlay for better text readability */}
        <View
          className="flex-1"
          style={{
            backgroundColor: darkMode
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(255, 255, 255, 0.3)'
          }}
        >
        <Header />

        <Animated.View 
          className="flex-1 justify-center px-6"
          style={{ opacity: fadeAnim }}
        >
          {/* Logo and Brand */}
          <View className="flex-row items-center mb-16">
            {/* Logo */}
            <View className="w-12 h-12 rounded-lg mr-4 items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
              <Text className="text-white font-bold text-2xl">🌟</Text>
            </View>
            <Text
              style={{
                fontSize: biggerText ? 32 : 28,
                fontWeight: 'bold',
                color: getTextColor(),
                fontFamily: getFontFamily(),
                lineHeight: lineHeight * 20,
                letterSpacing: textSpacing ? letterSpacing + 1 : letterSpacing,
                textAlign: 'left',
              }}
              accessibilityLabel="LiftUP AI Logo"
            >
              LiftUP AI
            </Text>
          </View>

            {/* Welcome Text */}
            <View>
              <Text
                style={{
                  fontSize: biggerText ? 40 : 36,
                  fontWeight: 'bold',
                  marginBottom: 4,
                  color: getTextColor(),
                  fontFamily: getFontFamily(),
                  lineHeight: lineHeight * 20,
                  letterSpacing: textSpacing ? letterSpacing + 1 : letterSpacing,
                  textAlign: 'left',
                }}
                accessibilityLabel="Welcome message"
              >
                Welcome to
              </Text>

              <Text
                style={{
                  fontSize: biggerText ? 40 : 36,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  color: '#8b5cf6',
                  fontFamily: getFontFamily(),
                  lineHeight: lineHeight * 20,
                  letterSpacing: textSpacing ? letterSpacing + 1 : letterSpacing,
                  textAlign: 'left',
                }}
                accessibilityLabel="LiftUP AI brand name"
              >
                {'\n'}LiftUP Ai{'\n'}
              </Text>

              <Text
                style={{
                  fontSize: biggerText ? 20 : 18,
                  color: getSecondaryTextColor(),
                  fontFamily: getFontFamily(),
                  lineHeight: lineHeight * 20,
                  letterSpacing: textSpacing ? letterSpacing + 1 : letterSpacing,
                  textAlign: 'left',
                }}
                accessibilityLabel="App description"
              >
                Your Smart Learning Companion!{'\n'}
              </Text>
            </View>

          {/* Action Buttons */}
          <View className="w-full items-center space-y-8 gap-8">
            {/* Get Started Button with Gradient */}
            <LinearGradient
              colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 360,
                height: 48,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <TouchableOpacity
                className="flex-1 items-center justify-center"
                accessibilityLabel="Get Started button"
                accessibilityHint="Tap to begin using the app"
                activeOpacity={0.8}
              >
                <Text
                  className="text-white font-semibold text-lg"
                  style={{
                    fontFamily: getFontFamily(),
                    fontSize: biggerText ? 18 : 16,
                  }}
                >
                  Get Started →
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Log In Button */}
            <TouchableOpacity
              className="items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 24,
                width: 360,
                height: 48,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              accessibilityLabel="Log in button"
              accessibilityHint="Tap to log into your account"
              activeOpacity={0.8}
            >
              <Text
                className="text-center font-semibold text-lg"
                style={{
                  fontFamily: getFontFamily(),
                  fontSize: biggerText ? 18 : 16,
                  color: '#374151',
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <AccessibilityMenu />
        </View>
      </ImageBackground>
    </View>
  );
}
