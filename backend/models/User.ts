import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserMethods, UserModel, UserMutation } from '../types';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserMutation, UserModel, UserMethods> ({
  username: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

UserSchema.method('checkPassword', async function (password: string) {
  return await  bcrypt.compare(password, this.password);
})

UserSchema.pre("save",async function (next) {
  if(!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await  bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
})

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  }
})

const User = mongoose.model<UserMutation, UserModel>("User", UserSchema);

export default User;