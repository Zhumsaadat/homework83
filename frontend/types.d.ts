export interface ArtistApi{
    __v: number;
    _id: string;
    image: string | null;
    info: string;
    name: string;
}

export interface ArtistsApi{
    [key: string]: ArtistApi[];
}

export interface AlbumApi {
    __v: number;
    _id: string;
    image: string | null;
    date: number;
    name: string;
    singer: string
}

export  interface  TrackApi {
    __v: number;
    _id: string;
    album: string;
    duration: string;
    name: string
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}
export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    massage: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export  interface GlobalError {
    error: string;
}
