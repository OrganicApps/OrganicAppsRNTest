import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius, spacing } from '@/constants/theme';

import { formatTime, getWorkoutDuration } from './workout.data';
import type { Workout } from './workout.types';

type Props = {
  workout: Workout;
  expanded: boolean;
  onStart: () => void;
  onToggleExpanded: () => void;
};

export function WorkoutDetailsScreen({ expanded, onStart, onToggleExpanded, workout }: Props) {
  const visibleExercises = expanded ? workout.exercises : workout.exercises.slice(0, 4);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={workout.exercises[2].image} style={styles.heroImage} />
          <View style={styles.heroShade} />
          <View style={styles.heroTop}>
            <View style={styles.roundButton}>
              <Text style={styles.roundButtonText}>‹</Text>
            </View>
            <View style={styles.roundButton}>
              <Text style={styles.shareText}>↗</Text>
            </View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>{workout.subtitle.toUpperCase()}</Text>
            <Text style={styles.heroTitle}>{workout.title}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{workout.description}</Text>
          <View style={styles.stats}>
            <Stat value={formatTime(getWorkoutDuration(workout))} label="duration" />
            <View style={styles.divider} />
            <Stat value={String(workout.exercises.length)} label="exercises" />
            <View style={styles.divider} />
            <Stat value="Easy" label="intensity" />
          </View>

          <Text style={styles.sectionTitle}>Equipment</Text>
          <View style={styles.chips}>
            {workout.equipment.map((item) => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <Text style={styles.sectionMeta}>{workout.exercises.length} total</Text>
          </View>
          <View style={styles.exerciseList}>
            {visibleExercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseRow}>
                <Image source={exercise.image} style={styles.thumbnail} />
                <View style={styles.exerciseCopy}>
                  <Text style={styles.exerciseName}>
                    {index + 1}. {exercise.name}
                  </Text>
                  <Text style={styles.exerciseDuration}>{exercise.durationSeconds} sec</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            ))}
          </View>
          <Pressable accessibilityRole="button" style={styles.showAll} onPress={onToggleExpanded}>
            <Text style={styles.showAllText}>{expanded ? 'Show less' : 'Show all 10 exercises'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton onPress={onStart}>Start workout</PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  chevron: {
    color: colors.muted,
    fontSize: 28,
  },
  chip: {
    backgroundColor: '#FFEDEE',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chipText: {
    color: '#B9363B',
    fontSize: 14,
    fontWeight: '600',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  content: {
    padding: spacing.xl,
  },
  description: {
    color: '#4E4E52',
    fontSize: 16,
    lineHeight: 23,
  },
  divider: {
    backgroundColor: colors.border,
    height: 32,
    width: 1,
  },
  exerciseCopy: {
    flex: 1,
    gap: 3,
  },
  exerciseDuration: {
    color: colors.muted,
    fontSize: 13,
  },
  exerciseList: {
    gap: spacing.md,
  },
  exerciseName: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '600',
  },
  exerciseRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  eyebrow: {
    color: '#FFE3E4',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  hero: {
    height: 310,
    justifyContent: 'space-between',
  },
  heroCopy: {
    gap: spacing.xs,
    padding: spacing.xl,
  },
  heroImage: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  heroShade: {
    backgroundColor: 'rgba(0,0,0,0.34)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  roundButtonText: {
    color: colors.black,
    fontSize: 34,
    lineHeight: 36,
    marginTop: -3,
  },
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  sectionHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xxxl,
  },
  sectionMeta: {
    color: colors.muted,
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.lg,
    marginTop: spacing.xxxl,
  },
  shareText: {
    fontSize: 21,
  },
  showAll: {
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  showAllText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  stats: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: radius.medium,
    flexDirection: 'row',
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  statValue: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '800',
  },
  thumbnail: {
    borderRadius: radius.small,
    height: 66,
    width: 96,
  },
});
