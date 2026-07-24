import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Workout, WorkoutPlayerState } from './workout.types';

const initialState: WorkoutPlayerState = {
  countdown: 3,
  elapsedSeconds: 0,
  exerciseIndex: 0,
  isPlaying: true,
  secondsRemaining: 0,
  stage: 'details',
  startedAt: null,
};

export function useWorkoutPlayer(workout: Workout) {
  const [state, setState] = useState<WorkoutPlayerState>(initialState);

  useEffect(() => {
    if (state.stage === 'countdown') {
      const timeout = setTimeout(() => {
        setState((current) => {
          if (current.stage !== 'countdown') return current;
          if (current.countdown > 1) return { ...current, countdown: current.countdown - 1 };
          return {
            ...current,
            countdown: 0,
            isPlaying: true,
            secondsRemaining: workout.exercises[0].durationSeconds,
            stage: 'exercise',
            startedAt: Date.now(),
          };
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if ((state.stage !== 'exercise' && state.stage !== 'rest') || !state.isPlaying) return;

    const timeout = setTimeout(() => {
      setState((current) => {
        if ((current.stage !== 'exercise' && current.stage !== 'rest') || !current.isPlaying) return current;

        if (current.secondsRemaining > 1) {
          return {
            ...current,
            elapsedSeconds: current.elapsedSeconds + 1,
            secondsRemaining: current.secondsRemaining - 1,
          };
        }

        if (current.stage === 'exercise') {
          const isLastExercise = current.exerciseIndex === workout.exercises.length - 1;
          if (isLastExercise) {
            return {
              ...current,
              elapsedSeconds: current.elapsedSeconds + 1,
              isPlaying: false,
              secondsRemaining: 0,
              stage: 'complete',
            };
          }
          return {
            ...current,
            elapsedSeconds: current.elapsedSeconds + 1,
            secondsRemaining: workout.restSeconds,
            stage: 'rest',
          };
        }

        const nextIndex = current.exerciseIndex + 1;
        return {
          ...current,
          elapsedSeconds: current.elapsedSeconds + 1,
          exerciseIndex: nextIndex,
          secondsRemaining: workout.exercises[nextIndex].durationSeconds,
          stage: 'exercise',
        };
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [state.countdown, state.isPlaying, state.secondsRemaining, state.stage, workout]);

  const start = useCallback(() => {
    setState({ ...initialState, countdown: 3, isPlaying: true, stage: 'countdown' });
  }, []);

  const exit = useCallback(() => setState(initialState), []);

  const togglePlayback = useCallback(() => {
    setState((current) => {
      if (current.stage !== 'exercise' && current.stage !== 'rest') return current;
      return { ...current, isPlaying: !current.isPlaying };
    });
  }, []);

  const next = useCallback(() => {
    setState((current) => {
      if (current.stage === 'rest') {
        const nextIndex = current.exerciseIndex + 1;
        return {
          ...current,
          exerciseIndex: nextIndex,
          secondsRemaining: workout.exercises[nextIndex].durationSeconds,
          stage: 'exercise',
        };
      }
      if (current.exerciseIndex === workout.exercises.length - 1) {
        return { ...current, isPlaying: false, secondsRemaining: 0, stage: 'complete' };
      }
      return {
        ...current,
        exerciseIndex: current.exerciseIndex + 1,
        secondsRemaining: workout.exercises[current.exerciseIndex + 1].durationSeconds,
        stage: 'exercise',
      };
    });
  }, [workout]);

  const previous = useCallback(() => {
    setState((current) => {
      const previousIndex = Math.max(0, current.exerciseIndex - 1);
      return {
        ...current,
        exerciseIndex: previousIndex,
        secondsRemaining: workout.exercises[previousIndex].durationSeconds,
        stage: 'exercise',
      };
    });
  }, [workout]);

  const addRest = useCallback(() => {
    setState((current) =>
      current.stage === 'rest' ? { ...current, secondsRemaining: current.secondsRemaining + 10 } : current,
    );
  }, []);

  const completeForDemo = useCallback(() => {
    setState((current) => ({ ...current, isPlaying: false, secondsRemaining: 0, stage: 'complete' }));
  }, []);

  const currentExercise = workout.exercises[state.exerciseIndex];
  const nextExercise = workout.exercises[state.exerciseIndex + 1] ?? null;

  return useMemo(
    () => ({
      ...state,
      addRest,
      completeForDemo,
      currentExercise,
      exit,
      next,
      nextExercise,
      previous,
      start,
      togglePlayback,
    }),
    [addRest, completeForDemo, currentExercise, exit, next, nextExercise, previous, start, state, togglePlayback],
  );
}

export type WorkoutPlayer = ReturnType<typeof useWorkoutPlayer>;
