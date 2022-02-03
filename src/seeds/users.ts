import { IUserData } from '@/interfaces/response';
import UserModel from '@/models/users.model';
import logger from '@/utils/logger';
import { hashSync } from 'bcrypt';

const users: IUserData[] = [
  {
    email: 'test1@test.com',
    name: 'Test User 1',
    password: hashSync('test_usr@1', 10),
    role: 'public',
  },
  {
    email: 'test2@test.com',
    name: 'Test User 2',
    password: hashSync('test_usr@2', 10),
    role: 'public',
  },
  {
    email: 'test3@test.com',
    name: 'Test User 3',
    password: hashSync('test_usr@3', 10),
    role: 'private',
  },
  {
    email: 'test4@test.com',
    name: 'Test User 4',
    password: hashSync('test_usr@4', 10),
    role: 'private',
  },
  {
    email: 'test5@test.com',
    name: 'Test User 5',
    password: hashSync('test_usr@5', 10),
    role: 'admin',
  },
  {
    email: 'test6@test.com',
    name: 'Test User 6',
    password: hashSync('test_usr@6', 10),
    role: 'admin',
  },
];

export const migrateUsers = async () => {
  try {
    logger.info('---- Users Migration Started ----');
    const existingUserCount = await UserModel.count({});

    if (existingUserCount === 0) {
      await UserModel.insertMany(users);
      logger.info('---- Users Migration Completed ----');
    } else {
      logger.info('---- User data already exists. Migration not needed. ----');
    }
  } catch (error) {
    logger.error(`Error while migrating users: ${JSON.stringify(error)}`);
    process.exit(1);
  }
};
