import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccessibilityState {
  darkMode: boolean;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  isMenuOpen: boolean;
  contrast: boolean;
  highlightLinks: boolean;
  biggerText: boolean;
  textSpacing: boolean;
  pauseAnimations: boolean;
  dyslexia: boolean;
  cursor: boolean;
}

const initialState: AccessibilityState = {
  darkMode: false,
  lineHeight: 1.2,
  letterSpacing: 0,
  textAlign: 'left',
  isMenuOpen: false,
  contrast: false,
  highlightLinks: false,
  biggerText: false,
  textSpacing: false,
  pauseAnimations: false,
  dyslexia: false,
  cursor: false,
};

export const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    increaseLineHeight: (state) => {
      state.lineHeight = state.lineHeight === 1.2 ? 1.5 : state.lineHeight === 1.5 ? 1.8 : 1.2;
    },
    increaseLetterSpacing: (state) => {
      state.letterSpacing = state.letterSpacing === 0 ? 1 : state.letterSpacing === 1 ? 2 : 0;
    },
    toggleTextAlign: (state) => {
      state.textAlign = state.textAlign === 'left' ? 'center' : state.textAlign === 'center' ? 'right' : 'left';
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleContrast: (state) => {
      state.contrast = !state.contrast;
    },
    toggleHighlightLinks: (state) => {
      state.highlightLinks = !state.highlightLinks;
    },
    toggleBiggerText: (state) => {
      state.biggerText = !state.biggerText;
    },
    toggleTextSpacing: (state) => {
      state.textSpacing = !state.textSpacing;
    },
    togglePauseAnimations: (state) => {
      state.pauseAnimations = !state.pauseAnimations;
    },
    toggleDyslexia: (state) => {
      state.dyslexia = !state.dyslexia;
    },
    toggleCursor: (state) => {
      state.cursor = !state.cursor;
    },
    resetAllAccessibility: (state) => {
      return { ...initialState, isMenuOpen: state.isMenuOpen };
    },
    loadAccessibilitySettings: (state, action: PayloadAction<Partial<AccessibilityState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  toggleDarkMode,
  increaseLineHeight,
  increaseLetterSpacing,
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
  loadAccessibilitySettings,
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
