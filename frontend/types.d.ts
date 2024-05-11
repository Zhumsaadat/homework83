export interface ArtistsTypes {
    _id: string;
    name: string;
    image: string | null;
    info: string;
}

export interface ArtistsMutation {
  name: string;
  image: string | null;
  info: string;
}

export interface AlbumsTypes {
    _id: string;
    singer: string;
    name: string;
    date: string;
    image: string | null;
}

export interface AlbumMutation {
  singer: string;
  name: string;
  date: string;
  image: string | null;
  isPublished: boolean;
}

export interface TracksTypes {
    _id: string;
    album: string;
    name: string;
    duration: string;
    sequence: number;
    isPublished: boolean;
}

export interface TracksMutation {
  album: string;
  name: string;
  duration: string;
  sequence: number;
  isPublished: boolean
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface UserTypes {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        },
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: UserTypes;
}

export interface GlobalError {
    error: string;
}

export interface tracksHistoryTypes {
    token: string;
    track: string;
}

export interface History {
    _id: string;
    user: string;
    track: {
        album: {
            artist: string;
        };
        name: string;
    };
    datetime: string;
}