import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CompletionScreen } from '@/features/workout/CompletionScreen';
import { CountdownScreen } from '@/features/workout/CountdownScreen';
import { PlayerScreen } from '@/features/workout/PlayerScreen';
import { WorkoutDetailsScreen } from '@/features/workout/WorkoutDetailsScreen';
import { WORKOUT } from '@/features/workout/workout.data';
import { useWorkoutPlayer } from '@/features/workout/useWorkoutPlayer';

export default function WorkoutScreen() {
  const player = useWorkoutPlayer(WORKOUT);
  const [detailsListExpanded, setDetailsListExpanded] = useState(false);

  const screen = useMemo(() => {
    switch (player.stage) {
      case 'countdown':
        return <CountdownScreen countdown={player.countdown} onCancel={player.exit} />;
      case 'exercise':
      case 'rest':
        return <PlayerScreen player={player} workout={WORKOUT} />;
      case 'complete':
        return <CompletionScreen player={player} workout={WORKOUT} />;
      default:
        return (
          <WorkoutDetailsScreen
            expanded={detailsListExpanded}
            workout={WORKOUT}
            onStart={player.start}
            onToggleExpanded={() => setDetailsListExpanded((value) => !value)}
          />
        );
    }
  }, [detailsListExpanded, player]);

  return <View style={styles.container}>{screen}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
