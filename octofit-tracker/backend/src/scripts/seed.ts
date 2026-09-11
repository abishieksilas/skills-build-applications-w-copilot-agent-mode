import 'dotenv/config';
import { connectDatabase, database } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya.runner',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        avatarColor: '#ef8354',
      },
      {
        username: 'leo.lifts',
        email: 'leo@example.com',
        displayName: 'Leo Martins',
        avatarColor: '#3d5a80',
      },
      {
        username: 'sofia.moves',
        email: 'sofia@example.com',
        displayName: 'Sofia Patel',
        avatarColor: '#6a994e',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        motto: 'Small steps, strong finish',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Iron Circuit',
        motto: 'Train smart together',
        members: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 38,
        calories: 410,
        completedAt: new Date('2026-09-09T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 45,
        calories: 360,
        completedAt: new Date('2026-09-09T18:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        calories: 180,
        completedAt: new Date('2026-09-10T06:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, points: 1280, rank: 1, period: 'September 2026' },
      { user: users[1]._id, points: 1145, rank: 2, period: 'September 2026' },
      { user: users[2]._id, points: 980, rank: 3, period: 'September 2026' },
    ]);

    await Workout.insertMany([
      {
        name: 'Trail Starter',
        category: 'Cardio',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Brisk walk', 'Incline walk', 'Cool down'],
      },
      {
        name: 'Full Body Forge',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Goblet squat', 'Push-up', 'Bent-over row', 'Plank'],
      },
      {
        name: 'Mobility Reset',
        category: 'Recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Worlds greatest stretch', 'Cat-cow', 'Hip opener'],
      },
    ]);

    console.log(`Seeded ${users.length} users and ${teams.length} teams`);
    console.log('Database seeding complete');
    await database.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    await database.close();
    process.exit(1);
  }
}

seedDatabase();
