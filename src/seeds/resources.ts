import { IResourceData } from '@/interfaces/response';
import ResourceModel from '@/models/resources.model';
import logger from '@/utils/logger';

const resources: IResourceData[] = [
  {
    name: 'Resource 1',
    type: 'type 1',
    accessType: 'public',
  },
  {
    name: 'Resource 2',
    type: 'type 1',
    accessType: 'public',
  },
  {
    name: 'Resource 3',
    type: 'type 1',
    accessType: 'private',
  },
  {
    name: 'Resource 4',
    type: 'type 1',
    accessType: 'admin',
  },
  {
    name: 'Resource 5',
    type: 'type 2',
    accessType: 'public',
  },
  {
    name: 'Resource 6',
    type: 'type 2',
    accessType: 'private',
  },
  {
    name: 'Resource 7',
    type: 'type 2',
    accessType: 'private',
  },
  {
    name: 'Resource 8',
    type: 'type 2',
    accessType: 'admin',
  },
  {
    name: 'Resource 9',
    type: 'type 3',
    accessType: 'public',
  },
  {
    name: 'Resource 10',
    type: 'type 3',
    accessType: 'private',
  },
  {
    name: 'Resource 11',
    type: 'type 3',
    accessType: 'admin',
  },
  {
    name: 'Resource 12',
    type: 'type 3',
    accessType: 'admin',
  },
];

export const migrateResources = async () => {
  try {
    logger.info('---- Resources Migration Started ----');
    const existingUserCount = await ResourceModel.count({});

    if (existingUserCount === 0) {
      await ResourceModel.insertMany(resources);
      logger.info('---- Resources Migration Completed ----');
    } else {
      logger.info(
        '---- Resource data already exists. Migration not needed. ----',
      );
    }
  } catch (error) {
    logger.error(`Error while migrating Resources: ${JSON.stringify(error)}`);
    process.exit(1);
  }
};
