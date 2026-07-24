import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '@/constants/theme';

import { formatTime, getWorkoutDuration } from './workout.data';
import type { WorkoutPlayer } from './useWorkoutPlayer';
import type { Workout } from './workout.types';

export function PlayerScreen({ player, workout }: { player: WorkoutPlayer; workout: Workout }) {
  const isRest = player.stage === 'rest';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.media}>
        <Image source={player.currentExercise.image} style={styles.mediaImage} />
        <View style={styles.mediaShade} />
        <View style={styles.mediaHeader}>
          <IconButton label="×" onPress={player.exit} />
          <View style={styles.mediaHeaderRight}>
            <IconButton label="◎" onPress={() => {}} />
            <IconButton label="⚙" onPress={() => {}} />
          </View>
        </View>

        {isRest ? (
          <View style={styles.restHero}>
            <Text style={styles.restLabel}>SHORT REST</Text>
            <Text style={styles.restTime}>{formatTime(player.secondsRemaining)}</Text>
            <Text style={styles.upNext}>Up next · {player.nextExercise?.name}</Text>
          </View>
        ) : (
          <View style={styles.mediaBottom}>
            <View style={styles.liveChip}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{player.isPlaying ? 'PLAYING' : 'PAUSED'}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.progress}>
        {workout.exercises.map((exercise, index) => (
          <View
            key={exercise.id}
            style={[styles.progressItem, index <= player.exerciseIndex && styles.progressItemActive]}
          />
        ))}
      </View>

      <View style={styles.controlsArea}>
        {isRest ? (
          <View style={styles.restControls}>
            <Text style={styles.restTitle}>Catch your breath</Text>
            <View style={styles.restButtons}>
              <Pressable style={styles.secondaryButton} onPress={player.addRest}>
                <Text style={styles.secondaryButtonText}>+10 sec</Text>
              </Pressable>
              <Pressable style={styles.nextButton} onPress={player.next}>
                <Text style={styles.nextButtonText}>Next exercise</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.titleBlock}>
              <Text style={styles.exerciseName}>{player.currentExercise.name}</Text>
              <Text style={styles.cue}>{player.currentExercise.cue}</Text>
            </View>
            <View style={styles.timerRow}>
              <View style={styles.timerSide}>
                <Text style={styles.timerValue}>
                  {player.exerciseIndex + 1}/{workout.exercises.length}
                </Text>
                <Text style={styles.timerLabel}>exercise</Text>
              </View>
              <View style={styles.timerMain}>
                <Text style={styles.timerMainValue}>{formatTime(player.secondsRemaining)}</Text>
              </View>
              <View style={[styles.timerSide, styles.timerRight]}>
                <Text style={styles.timerValue}>{formatTime(getWorkoutDuration(workout))}</Text>
                <Text style={styles.timerLabel}>total</Text>
              </View>
            </View>

            <View style={styles.playback}>
              <Pressable
                accessibilityLabel="Previous exercise"
                disabled={player.exerciseIndex === 0}
                style={[styles.trackButton, player.exerciseIndex === 0 && styles.disabled]}
                onPress={player.previous}
              >
                <Text style={styles.trackIcon}>|‹</Text>
              </Pressable>
              <Pressable accessibilityLabel="Pause or resume" style={styles.playButton} onPress={player.togglePlayback}>
                <Text style={styles.playIcon}>{player.isPlaying ? 'Ⅱ' : '▶'}</Text>
              </Pressable>
              <Pressable accessibilityLabel="Next exercise" style={styles.trackButton} onPress={player.next}>
                <Text style={styles.trackIcon}>›|</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      {__DEV__ && (
        <Pressable style={styles.demoButton} onPress={player.completeForDemo}>
          <Text style={styles.demoText}>Demo: complete</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

function IconButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Text style={styles.iconText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  controlsArea: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  cue: {
    color: colors.muted,
    fontSize: 15,
  },
  demoButton: {
    alignSelf: 'center',
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  demoText: {
    color: colors.muted,
    fontSize: 11,
  },
  disabled: {
    opacity: 0.25,
  },
  exerciseName: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  iconText: {
    color: colors.black,
    fontSize: 22,
  },
  liveChip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.58)',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  liveDot: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: 7,
    width: 7,
  },
  liveText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  media: {
    height: '48%',
  },
  mediaBottom: {
    bottom: spacing.lg,
    left: spacing.xl,
    position: 'absolute',
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: spacing.xl,
    position: 'absolute',
    right: spacing.xl,
    top: spacing.md,
  },
  mediaHeaderRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mediaImage: {
    height: '100%',
    width: '100%',
  },
  mediaShade: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: radius.medium,
    flex: 1,
    height: 56,
    justifyContent: 'center',
  },
  nextButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  playback: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: radius.medium,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-around',
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  playIcon: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  progress: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  progressItem: {
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    flex: 1,
    height: 4,
  },
  progressItemActive: {
    backgroundColor: colors.accent,
  },
  restButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  restControls: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.xl,
  },
  restHero: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  restLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  restTime: {
    color: colors.white,
    fontSize: 64,
    fontWeight: '800',
    marginVertical: spacing.sm,
  },
  restTitle: {
    color: colors.black,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  safe: {
    backgroundColor: colors.white,
    flex: 1,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.medium,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondaryButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  timerLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  timerMain: {
    alignItems: 'center',
    flex: 1,
  },
  timerMainValue: {
    color: colors.black,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  timerRight: {
    alignItems: 'flex-end',
  },
  timerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  timerSide: {
    flex: 1,
    gap: 2,
  },
  timerValue: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '700',
  },
  titleBlock: {
    gap: spacing.sm,
  },
  trackButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 60,
  },
  trackIcon: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '500',
  },
  upNext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
});
