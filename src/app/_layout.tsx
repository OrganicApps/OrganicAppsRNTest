import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
