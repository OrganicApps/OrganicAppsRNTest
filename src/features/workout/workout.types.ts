import type { ImageSourcePropType } from 'react-native';

export type Exercise = {
  id: string;
  name: string;
  cue: string;
  durationSeconds: number;
  image: ImageSourcePropType;
};

export type Workout = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  equipment: string[];
  restSeconds: number;
  exercises: Exercise[];
};

export type WorkoutStage = 'details' | 'countdown' | 'exercise' | 'rest' | 'complete';

export type WorkoutPlayerState = {
  stage: WorkoutStage;
  countdown: number;
  exerciseIndex: number;
  secondsRemaining: number;
  elapsedSeconds: number;
  isPlaying: boolean;
  startedAt: number | null;
};
