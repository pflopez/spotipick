import { Track } from "@spotify/web-api-ts-sdk";

interface Props {
  track: Track;
  selectTrack: (track: Track) => void;
}
export default function TrackComponent({ track, selectTrack }: Props) {
  return (
    <article
      className="rounded p-5 bg-slate-200 w-[150px] text-sm"
      onClick={() => selectTrack(track)}
    >
      <img
        className="rounded aspect-square"
        src={track.album.images[0].url}
        alt={track.album.name}
      />
      <h2 className="mt-1 font-medium leading-none">{track.name}</h2>
      <p className="text-xs text-muted-foreground">
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
    </article>
  );
}
