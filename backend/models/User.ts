import bcrypt from 'bcrypt';
import { UserMethods, UserModel, UserMutation } from '../types';
import { randomUUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserMutation, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<UserMutation>, username: string): Promise<boolean> {
        if (!this.isModified('username')) return true;
        const user: HydratedDocument<UserMutation> | null = await User.findOne({username});
        return !Boolean(user);
      },
      message: 'This user is already registered',
    }
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

UserSchema.method('checkPassword', async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  }
});


const User = mongoose.model<UserMutation, UserModel>('User', UserSchema);

export default User;