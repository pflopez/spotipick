import { Track } from "@spotify/web-api-ts-sdk";
import React, { useContext } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import { BsPlayCircle } from "react-icons/bs";

interface Props {
  track: Track;
  selectTrack: (track: Track) => void;
}
export default function TrackComponent({ track, selectTrack }: Props) {
  const spotify = useContext<Spotify>(SpotifyContext);

  return (
    <article className="rounded bg-slate-200 text-sm transition duration-150 ease-in-out  hover:-translate-y-2">
      <img
        className="rounded-t aspect-square mb-3 cursor-pointer"
        src={track.album.images[0].url}
        alt={track.album.name}
        onClick={() => selectTrack(track)}
      />
      <div className="flex gap-3 items-start p-2 mb-3 text-left">
        <a target="_blank" href={track.uri} className="mt-1.5">
          <BsPlayCircle className="h-6 w-auto" />
        </a>
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
