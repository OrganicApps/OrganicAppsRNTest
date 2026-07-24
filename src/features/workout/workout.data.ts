import type { Workout } from './workout.types';

const warmup = require('../../../assets/workout/warmup.webp');
const powerwalk = require('../../../assets/workout/powerwalk.webp');
const running = require('../../../assets/workout/running.webp');
const sprint = require('../../../assets/workout/sprint.webp');
const walking = require('../../../assets/workout/walking.webp');
const cooldown = require('../../../assets/workout/cooldown.webp');

export const WORKOUT: Workout = {
  id: 'cardio-energy-10',
  title: 'Cardio Energy',
  subtitle: 'Full body · Beginner',
  description:
    'A compact interval workout that gradually raises your heart rate and ends with a gentle cooldown.',
  equipment: ['No equipment', 'Training shoes'],
  restSeconds: 10,
  exercises: [
    { id: 'march', name: 'Warm-up march', cue: 'Easy pace, relaxed shoulders', durationSeconds: 30, image: warmup },
    { id: 'step-touch', name: 'Step touch', cue: 'Stay light on your feet', durationSeconds: 30, image: powerwalk },
    { id: 'knee-drive', name: 'Alternating knee drive', cue: 'Brace your core', durationSeconds: 30, image: running },
    { id: 'quick-feet', name: 'Quick feet', cue: 'Short, controlled steps', durationSeconds: 25, image: sprint },
    { id: 'side-reach', name: 'Side step & reach', cue: 'Reach long through the arms', durationSeconds: 30, image: walking },
    { id: 'high-knees', name: 'High knees', cue: 'Land softly', durationSeconds: 25, image: running },
    { id: 'skater', name: 'Low-impact skater', cue: 'Keep your hips back', durationSeconds: 30, image: powerwalk },
    { id: 'fast-march', name: 'Fast power march', cue: 'Drive your arms', durationSeconds: 30, image: sprint },
    { id: 'box-step', name: 'Box step', cue: 'Breathe evenly', durationSeconds: 30, image: walking },
    { id: 'cooldown', name: 'Cooldown walk', cue: 'Slow down and recover', durationSeconds: 35, image: cooldown },
  ],
};

export const getWorkoutDuration = (workout: Workout) =>
  workout.exercises.reduce((total, exercise) => total + exercise.durationSeconds, 0) +
  workout.restSeconds * (workout.exercises.length - 1);

export const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  return `${minutes}:${String(safeSeconds % 60).padStart(2, '0')}`;
};
