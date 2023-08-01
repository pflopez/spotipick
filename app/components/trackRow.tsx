import { Track } from "@spotify/web-api-ts-sdk";
import React, { useContext } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import { BsPlayCircle } from "react-icons/bs";

interface Props {
  track: Track;
  selectTrack: (track: Track) => void;
}
export default function TrackRow({ track, selectTrack }: Props) {
  const spotify = useContext<Spotify>(SpotifyContext);

  function play(e: React.MouseEvent<HTMLButtonElement>) {
    spotify.play(track);
    e.preventDefault();
    return false;
  }

  return (
    <article className="rounded text-sm flex ">
      <img
        className="rounded-t aspect-square mb-3 cursor-pointer h-12"
        src={track.album.images[0].url}
        alt={track.album.name}
        onClick={() => selectTrack(track)}
      />
      <div className="flex gap-3 items-start p-2 mb-3 text-left">
        <button onClick={(e) => play(e)} className="mt-1.5">
          <BsPlayCircle className="h-6 w-auto" />
        </button>
        <div>
          <button
            className="mt-1 font-medium leading-none text-left"
            onClick={() => selectTrack(track)}
          >
            {track.name}
          </button>
          <p className="text-xs text-muted-foreground">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}
