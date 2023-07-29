import { Scopes, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";

export class Spotify {
  sdk: SpotifyApi;
  constructor() {
    const id = "eca9422cc1054392987f599a59720d33";
    const redirect = "http://localhost:3000/";

    this.sdk = SpotifyApi.withUserAuthorization(id, redirect, Scopes.all);
  }

  getItems(search: string) {
    return this.sdk.search(search, ["album"]);
  }

  getGenres() {
    return this.sdk.recommendations.genreSeeds();
  }

  authenticate() {
    return this.sdk.authenticate();
  }

  getTracks(genre: string) {
    const search = `genre:${genre}`;
    return this.sdk.search(search, ["track"]);
  }

  getRecommendations(tracks: Track[]) {
    const ids = tracks.map((track) => track.id);
    return this.sdk.recommendations.get({ seed_tracks: ids });
  }
}
