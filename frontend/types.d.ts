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