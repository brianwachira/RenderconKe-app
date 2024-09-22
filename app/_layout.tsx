import { useRenderConfStore } from '@/store/renderConfStore';
import { differenceInMinutes } from '@/utils/formatDate';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
   // ...FontAwesome.font,
    SCProLight: require('../assets/fonts/SourceCodePro-Light.ttf'),
    SCProBold: require('../assets/fonts/SourceCodePro-Bold.ttf'),
    SCProLightItalic: require('../assets/fonts/SourceCodePro-LightItalic.ttf'),
    SCProMediumItalic: require('../assets/fonts/SourceCodePro-MediumItalic.ttf'),
    SCProRegular: require('../assets/fonts/SourceCodePro-Regular.ttf'),
    SCProSemiBold: require('../assets/fonts/SourceCodePro-SemiBold.ttf'),
    SCProItalic: require('../assets/fonts/SourceCodePro-Italic.ttf'),
  });

  const { refreshData, lastRefreshed } = useRenderConfStore();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const fetchData = async () => {
      if (!lastRefreshed || differenceInMinutes(new Date(), new Date(lastRefreshed)) > 5) {
        await refreshData();
      }
    };

    fetchData();
  }, [lastRefreshed, refreshData]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
