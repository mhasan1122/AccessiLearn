import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, ImageBackground, Image, Modal, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Header from '../components/Header';
import { 
  loadAccessibilitySettings, 
  toggleMenu, 
  toggleDarkMode, 
  toggleContrast, 
  toggleBiggerText, 
  toggleTextSpacing, 
  togglePauseAnimations, 
  toggleDyslexia, 
  toggleCursor, 
  toggleTextAlign, 
  increaseLineHeight, 
  resetAllAccessibility 
} from '../store/accessibilitySlice';

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
    cursor,
    isMenuOpen
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
    return dyslexia ? 'Arial' : 'System';
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
  }, [darkMode, contrast, biggerText, textAlign, dyslexia, cursor]);

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
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(255, 255, 255, 0.3)'
          }}
        >
        <Header />

        <Animated.View 
          className="flex-1 justify-center px-6"
          style={{ 
            opacity: fadeAnim,
            cursor: cursor ? 'pointer' : 'auto'
          }}
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
                textAlign: textAlign,
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
                  textAlign: textAlign,
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
                  textAlign: textAlign,
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
                  textAlign: textAlign,
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
              style={{
                cursor: cursor ? 'pointer' : 'auto',
                transform: cursor ? [{ scale: 1.05 }] : [{ scale: 1 }]
              }}
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
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.95)',
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
                borderWidth: darkMode ? 1 : 0,
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                cursor: cursor ? 'pointer' : 'auto',
                transform: cursor ? [{ scale: 1.05 }] : [{ scale: 1 }]
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
                  color: darkMode ? '#ffffff' : '#374151',
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        </View>
      </ImageBackground>

      {/* Accessibility Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={() => dispatch(toggleMenu())}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: darkMode ? '#1f2937' : '#ffffff' }]}>
            {/* Handle bar for better UX */}
            <View style={styles.handleBar}>
              <View style={[styles.handle, { backgroundColor: darkMode ? '#6b7280' : '#d1d5db' }]} />
            </View>
            
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: getTextColor() }]}>
                Accessibility Menu
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => dispatch(toggleMenu())}
              >
                <Text style={[styles.closeButtonText, { color: getSecondaryTextColor() }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScroll} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.accessibilityGrid}>
                {/* Row 1 */}
                <AccessibilityButton
                  icon={darkMode ? '☀️' : '🌙'}
                  title="Dark Mode"
                  onPress={() => dispatch(toggleDarkMode())}
                  isActive={darkMode}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon="👁️"
                  title="High Contrast"
                  onPress={() => dispatch(toggleContrast())}
                  isActive={contrast}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon="T+"
                  title="Bigger Text"
                  onPress={() => dispatch(toggleBiggerText())}
                  isActive={biggerText}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                {/* Row 2 */}
                <AccessibilityButton
                  icon="↔"
                  title="Text Spacing"
                  onPress={() => dispatch(toggleTextSpacing())}
                  isActive={textSpacing}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon="⏸"
                  title="Pause Animations"
                  onPress={() => dispatch(togglePauseAnimations())}
                  isActive={pauseAnimations}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon="🧠"
                  title="Dyslexia Font"
                  onPress={() => dispatch(toggleDyslexia())}
                  isActive={dyslexia}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                {/* Row 3 */}
                <AccessibilityButton
                  icon="↗"
                  title="Large Cursor"
                  onPress={() => dispatch(toggleCursor())}
                  isActive={cursor}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon={textAlign === 'center' ? '≡' : textAlign === 'right' ? '≡' : '≡'}
                  title="Text Align"
                  onPress={() => dispatch(toggleTextAlign())}
                  isActive={textAlign !== 'left'}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
                
                <AccessibilityButton
                  icon="≡↕"
                  title="Line Height"
                  onPress={() => dispatch(increaseLineHeight())}
                  isActive={lineHeight > 1.2}
                  theme={{ text: getTextColor(), background: darkMode ? '#111827' : '#f9fafb', primary: '#8b5cf6' }}
                />
              </View>

              <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: '#8b5cf6' }]}
                onPress={() => dispatch(resetAllAccessibility())}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.resetButtonGradient}
                >
                  <Text style={styles.resetButtonText}>🔄 Reset All Accessibility</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface AccessibilityButtonProps {
  icon: string;
  title: string;
  onPress: () => void;
  isActive: boolean;
  theme: any;
}

function AccessibilityButton({ icon, title, onPress, isActive, theme }: AccessibilityButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.accessibilityButton,
        {
          backgroundColor: isActive ? theme.primary : theme.background,
          borderColor: isActive ? theme.primary : theme.text,
        },
      ]}
      onPress={onPress}
      accessibilityLabel={title}
      accessibilityHint={`Toggle ${title} accessibility feature`}
      activeOpacity={0.7}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ 
          fontSize: 20, 
          color: isActive ? 'white' : theme.text,
          marginBottom: 4
        }}>
          {icon}
        </Text>
        <Text
          style={[
            styles.buttonText,
            {
              color: isActive ? 'white' : theme.text,
            },
          ]}
          numberOfLines={2}
          adjustsFontSizeToFit={true}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 40,
    maxHeight: Dimensions.get('window').height * 0.9,
    minHeight: Dimensions.get('window').height * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  handleBar: {
    alignItems: 'center',
    marginBottom: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  accessibilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  accessibilityButton: {
    width: (Dimensions.get('window').width - 80) / 3,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 6,
    marginBottom: 8,
  },
  buttonText: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  resetButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
