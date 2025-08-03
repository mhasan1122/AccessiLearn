import './global.css';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainScreen from './src/screens/MainScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainScreen />
      </SafeAreaProvider>
    </Provider>
  );
}
