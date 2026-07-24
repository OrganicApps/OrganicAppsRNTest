import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '@/constants/theme';

export function CountdownScreen({ countdown, onCancel }: { countdown: number; onCancel: () => void }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/workout/warmup.webp')} style={styles.background} />
      <View style={styles.shade} />
      <SafeAreaView style={styles.safe}>
        <Pressable accessibilityLabel="Close" accessibilityRole="button" style={styles.close} onPress={onCancel}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
        <View style={styles.center}>
          <Text style={styles.label}>GET READY</Text>
          <View style={styles.countCircle}>
            <Text style={styles.count}>{countdown}</Text>
          </View>
          <Text style={styles.exercise}>Warm-up march</Text>
        </View>
        <View />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  center: {
    alignItems: 'center',
    gap: spacing.xxl,
  },
  close: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: radius.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  closeText: {
    color: colors.black,
    fontSize: 30,
    lineHeight: 32,
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  count: {
    color: colors.white,
    fontSize: 76,
    fontWeight: '800',
  },
  countCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,87,92,0.88)',
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.pill,
    borderWidth: 3,
    height: 150,
    justifyContent: 'center',
    width: 150,
  },
  exercise: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  label: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  shade: {
    backgroundColor: 'rgba(0,0,0,0.48)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});
