import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Sun,
  Moon,
  Eye,
  Type,
  MoreHorizontal,
  Pause,
  MousePointer,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
} from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleDarkMode,
  increaseLineHeight,
  toggleTextAlign,
  toggleMenu,
  toggleContrast,
  toggleHighlightLinks,
  toggleBiggerText,
  toggleTextSpacing,
  togglePauseAnimations,
  toggleDyslexia,
  toggleCursor,
  resetAllAccessibility,
} from '../store/accessibilitySlice';

const { width, height } = Dimensions.get('window');

export default function AccessibilityMenu() {
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
    isMenuOpen,
  } = useAppSelector((state) => state.accessibility);

  // Theme configuration
  const theme = {
    surface: darkMode ? '#1f2937' : '#ffffff',
    text: darkMode ? '#ffffff' : '#1f2937',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    primary: '#8b5cf6',
    border: darkMode ? '#374151' : '#e5e7eb',
    background: darkMode ? '#111827' : '#f9fafb',
  };

  const updateSetting = (setting: string, value: any) => {
    switch (setting) {
      case 'darkMode':
        dispatch(toggleDarkMode());
        break;
      case 'highContrast':
        dispatch(toggleContrast());
        break;
      case 'fontSize':
        dispatch(toggleBiggerText());
        break;
      case 'letterSpacing':
        dispatch(toggleTextSpacing());
        break;
      case 'pauseAnimations':
        dispatch(togglePauseAnimations());
        break;
      case 'dyslexiaFont':
        dispatch(toggleDyslexia());
        break;
      case 'largerCursor':
        dispatch(toggleCursor());
        break;
      case 'textAlign':
        dispatch(toggleTextAlign());
        break;
      case 'lineHeight':
        dispatch(increaseLineHeight());
        break;
    }
  };

  const resetAllSettings = () => {
    dispatch(resetAllAccessibility());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMenuOpen}
      onRequestClose={() => dispatch(toggleMenu())}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Accessibility Menu
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => dispatch(toggleMenu())}
            >
              <Text style={[styles.closeButtonText, { color: theme.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.accessibilityGrid}>
              <AccessibilityButton
                icon={darkMode ? Sun : Moon}
                title="Dark Mode"
                onPress={() => updateSetting('darkMode', !darkMode)}
                isActive={darkMode}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={Eye}
                title="High Contrast"
                onPress={() => updateSetting('highContrast', !contrast)}
                isActive={contrast}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={Type}
                title="Bigger Text"
                onPress={() => updateSetting('fontSize', !biggerText)}
                isActive={biggerText}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={MoreHorizontal}
                title="Text Spacing"
                onPress={() => updateSetting('letterSpacing', !textSpacing)}
                isActive={textSpacing}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={Pause}
                title="Pause Animations"
                onPress={() => updateSetting('pauseAnimations', !pauseAnimations)}
                isActive={pauseAnimations}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={Type}
                title="Dyslexia Font"
                onPress={() => updateSetting('dyslexiaFont', !dyslexia)}
                isActive={dyslexia}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={MousePointer}
                title="Large Cursor"
                onPress={() => updateSetting('largerCursor', !cursor)}
                isActive={cursor}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={textAlign === 'center' ? AlignCenter : textAlign === 'right' ? AlignRight : AlignLeft}
                title="Text Align"
                onPress={() => updateSetting('textAlign', textAlign)}
                isActive={textAlign !== 'left'}
                theme={theme}
              />
              
              <AccessibilityButton
                icon={MoreHorizontal}
                title="Line Height"
                onPress={() => updateSetting('lineHeight', lineHeight)}
                isActive={lineHeight > 1.2}
                theme={theme}
              />
            </View>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: theme.primary }]}
              onPress={resetAllSettings}
            >
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.resetButtonGradient}
              >
                <RotateCcw size={20} color="white" strokeWidth={2} />
                <Text style={styles.resetButtonText}>Reset All Accessibility</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

interface AccessibilityButtonProps {
  icon: React.ComponentType<any>;
  title: string;
  onPress: () => void;
  isActive: boolean;
  theme: any;
}

function AccessibilityButton({ icon: Icon, title, onPress, isActive, theme }: AccessibilityButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.accessibilityButton,
        {
          backgroundColor: isActive ? theme.primary : theme.background,
          borderColor: isActive ? theme.primary : theme.border,
        },
      ]}
      onPress={onPress}
      accessibilityLabel={title}
      accessibilityHint={`Toggle ${title} accessibility feature`}
    >
      <Icon
        size={24}
        color={isActive ? 'white' : theme.text}
        strokeWidth={2}
      />
      <Text
        style={[
          styles.buttonText,
          {
            color: isActive ? 'white' : theme.text,
          },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
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
  accessibilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  accessibilityButton: {
    width: (width - 72) / 3,
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
  },
  buttonText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
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
