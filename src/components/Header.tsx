import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleMenu } from '../store/accessibilitySlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { darkMode, contrast, biggerText, dyslexia } = useAppSelector(
    (state) => state.accessibility
  );

  const getTextColor = () => {
    if (darkMode) {
      return contrast ? '#ffffff' : '#ffffff';
    }
    return contrast ? '#000000' : '#1f2937';
  };

  const getButtonStyle = () => {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    };
  };

  const getFontFamily = () => {
    return dyslexia ? 'System' : 'System';
  };

  return (
    <SafeAreaView edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-2">
        {/* Left Side - Accessibility Button */}
        <TouchableOpacity
          onPress={() => dispatch(toggleMenu())}
          className="flex-row items-center rounded-full px-3 py-2"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
          accessibilityLabel="Accessibility menu"
          accessibilityHint="Tap to open accessibility options">
          <View className="mr-2 h-6 w-6 items-center justify-center rounded-full border border-black">
            <Ionicons name="accessibility" size={16} color="#374151" />
          </View>
          <Text
            className="font-medium text-gray-800"
            style={{
              fontFamily: getFontFamily(),
              fontSize: biggerText ? 16 : 14,
            }}>
            Accessibility
          </Text>
        </TouchableOpacity>

        {/* Right Side - Language Selector */}
        <TouchableOpacity
          className="flex-row items-center rounded-full px-3 py-2"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
          accessibilityLabel="Language selector"
          accessibilityHint="Currently set to English, tap to change language">
          <View className="mr-2 h-3 w-5">
            <Text>🇿🇦</Text>
          </View>
          <Text
            className="mr-1 font-medium text-gray-800"
            style={{
              fontFamily: getFontFamily(),
              fontSize: biggerText ? 16 : 14,
            }}>
            English
          </Text>
          <Text
            className="text-gray-800"
            style={{
              fontSize: biggerText ? 14 : 12,
            }}>
            ▼
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
