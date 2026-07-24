import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius, spacing } from '@/constants/theme';

import { formatTime } from './workout.data';
import type { WorkoutPlayer } from './useWorkoutPlayer';
import type { Workout } from './workout.types';

export function CompletionScreen({ player, workout }: { player: WorkoutPlayer; workout: Workout }) {
  return (
    <ImageBackground source={require('../../../assets/workout/complete.webp')} style={styles.background}>
      <View style={styles.shade} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.copy}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
          <Text style={styles.title}>You did it!</Text>
          <Text style={styles.subtitle}>{workout.title} is complete</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>◷</Text>
            <Text style={styles.statValue}>{formatTime(player.elapsedSeconds)}</Text>
            <Text style={styles.statLabel}>active time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>{workout.exercises.length}</Text>
            <Text style={styles.statLabel}>exercises</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <PrimaryButton appearance="light" onPress={player.exit}>
            Continue
          </PrimaryButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: radius.pill,
    height: 58,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 58,
  },
  badgeText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
  },
  bottom: {
    width: '100%',
  },
  copy: {
    alignItems: 'center',
  },
  safe: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingTop: 100,
  },
  shade: {
    backgroundColor: 'rgba(24,11,12,0.58)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  statDivider: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 60,
    width: 1,
  },
  statIcon: {
    color: colors.white,
    fontSize: 22,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },
  stats: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: radius.large,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    width: '100%',
  },
  statValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 17,
  },
  title: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: spacing.sm,
  },
});
