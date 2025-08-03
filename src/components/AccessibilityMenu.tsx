import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
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

export default function AccessibilityMenu() {
  const dispatch = useAppDispatch();
  const { isMenuOpen } = useAppSelector((state) => state.accessibility);

  const accessibilityOptions = [
    {
      title: 'Contrast+',
      icon: '🌓',
      onPress: () => dispatch(toggleContrast()),
    },
    {
      title: 'Highlight Links',
      icon: '🔗',
      onPress: () => dispatch(toggleHighlightLinks()),
    },
    {
      title: 'Bigger Text',
      icon: 'T+',
      onPress: () => dispatch(toggleBiggerText()),
    },
    {
      title: 'Text Spacing',
      icon: '↔',
      onPress: () => dispatch(toggleTextSpacing()),
    },
    {
      title: 'Pause Animations',
      icon: '⏸',
      onPress: () => dispatch(togglePauseAnimations()),
    },
    {
      title: 'Dyslexia',
      icon: '🧠',
      onPress: () => dispatch(toggleDyslexia()),
    },
    {
      title: 'Cursor',
      icon: '↗',
      onPress: () => dispatch(toggleCursor()),
    },
    {
      title: 'Text Align',
      icon: '≡',
      onPress: () => dispatch(toggleTextAlign()),
    },
    {
      title: 'Line Height',
      icon: '≡↕',
      onPress: () => dispatch(increaseLineHeight()),
    },
  ];

  return (
    <Modal
      transparent={true}
      visible={isMenuOpen}
      animationType="slide"
      onRequestClose={() => dispatch(toggleMenu())}
    >
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-t-3xl p-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#ffffff', // White text
                fontFamily: 'System' // Use system font
              }}
            >
              Accessibility Menu
            </Text>
            <LinearGradient
              colors={['#8b5cf6', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-8 h-8 rounded-full items-center justify-center"
            >
              <TouchableOpacity
                onPress={() => dispatch(toggleMenu())}
                className="w-8 h-8 rounded-full items-center justify-center"
                accessibilityLabel="Close accessibility menu"
              >
                <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Grid of Options - 3x3 layout */}
          <View style={styles.gridContainer}>
            {accessibilityOptions.map((option, index) => (
              <AccessibilityOption
                key={index}
                title={option.title}
                icon={option.icon}
                onPress={option.onPress}
              />
            ))}
          </View>

          {/* Reset Button - Centered below grid */}
          <View className="items-center mt-6">
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-full py-4 px-6 items-center"
              style={{
                borderRadius: 25, // Rounded corners
              }}
            >
              <TouchableOpacity
                onPress={() => dispatch(resetAllAccessibility())}
                className="rounded-full py-4 px-6 items-center"
                accessibilityLabel="Reset all accessibility settings"
              >
                <View className="flex-row items-center">
                  <Text className="text-white font-semibold text-lg mr-2">🔄</Text>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      fontSize: 18,
                      fontFamily: 'System'
                    }}
                  >
                    Reset All Accessibility
                  </Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Bottom indicator */}
          <View className="items-center mt-4">
            <View
              className="rounded-full"
              style={{
                width: 134,
                height: 5,
                backgroundColor: '#ffffff', // White indicator
              }}
            />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

interface AccessibilityOptionProps {
  title: string;
  icon: string;
  onPress: () => void;
}

function AccessibilityOption({ title, icon, onPress }: AccessibilityOptionProps) {
  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.optionButton}
    >
      <TouchableOpacity
        onPress={onPress}
        className="flex-1 items-center justify-center"
        accessibilityLabel={title}
        accessibilityHint={`Toggle ${title} accessibility feature`}
      >
        <View className="w-8 h-8 mb-2 items-center justify-center">
          <Text style={{ fontSize: 24, color: '#ffffff' }}>{icon}</Text>
        </View>
        <Text
          style={styles.optionText}
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Styles object for the component
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  optionButton: {
    width: '30%',
    marginBottom: 16,
    borderRadius: 16, // Rounded corners
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff', // White text
    fontFamily: 'System', // Use system font
    lineHeight: 18,
  },
});
