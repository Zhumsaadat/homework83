import User from './models/User';
import { Model } from 'mongoose';

export interface Artist {
  name: string;
  image: string | null;
  info: string;
}

export interface AlbumsMutation {
  name: string;
  singer: string;
  date: number;
  image: string | null
}

export interface TracksMutation {
  name: string;
  duration: string;
  album: string
}

export interface UserMutation {
  username: string;
  password: string;
  token: string;
}

export interface TrackHistoryMutation {
  user: string;
  track: string;
  datetime: Date;
}


interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<User, {}, UserMethods>;
