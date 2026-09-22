export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface GamePlatform {
  platform: Platform;
}

export interface Game {
  id: number;
  slug: string;
  name: string;

  released: string | null;

  background_image:
    | string
    | null;

  rating: number;

  metacritic:
    | number
    | null;

  platforms?: GamePlatform[];

  genres?: Genre[];
}

export interface GamesResponse {
  count: number;

  next:
    | string
    | null;

  previous:
    | string
    | null;

  results: Game[];
}