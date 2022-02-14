import { model, Schema } from 'mongoose';
import type { Document } from 'mongoose';
import type { IUserSchema } from '@interfaces/schema';

const userSchema: Schema = new Schema({
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  name: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  role: {
    type: 'string',
    required: true,
  },
});

const UserModel = model<IUserSchema & Document>('Users', userSchema);
export default UserModel;
