import { model, Schema } from 'mongoose';
import type { Document } from 'mongoose';
import type { IResourceSchema } from '@interfaces/schema';
import { ObjectId } from 'mongodb';

const resourceSchema: Schema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  type: {
    type: 'string',
    required: true,
  },
  accessType: {
    type: 'string',
    required: true,
  },
  createdBy: {
    type: ObjectId,
    required: false,
  },
});

const ResourceModel = model<IResourceSchema & Document>(
  'Resources',
  resourceSchema,
);
export default ResourceModel;
