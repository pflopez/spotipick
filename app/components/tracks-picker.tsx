import { useContext, useEffect, useState } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import { Page, Track } from "@spotify/web-api-ts-sdk";
import TrackComponent from "@/app/components/track";

export default function TracksPicker({
  selectedGenre,
  onSubmitTracks,
}: {
  selectedGenre: string;
  onSubmitTracks: (tracks: Track[]) => void;
}) {
  const spotify = useContext<Spotify>(SpotifyContext);
  const [tracks, setTracks] = useState<Page<Track>>();
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

  useEffect(() => {
    async function getTracks() {
      const t = await spotify.getTracks(selectedGenre);
      setTracks(t.tracks);
    }
    getTracks();
  }, [selectedGenre, spotify]);

  function selectTrack(track: Track) {
    if (selectedTracks.includes(track)) {
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  function submitTracks() {
    onSubmitTracks(selectedTracks);
  }

  return (
    <section>
      <h2>Now pick your favorite track from this</h2>
      <div className="flex flex-wrap gap-2">
        {tracks?.items.map((track) => (
          <TrackComponent
            key={track.id}
            track={track}
            selectTrack={selectTrack}
          />
        ))}
      </div>

      <div>
        Selected Tracks: {selectedTracks.map((track) => track.name).join(", ")}
      </div>
      <button onClick={submitTracks}>Next</button>
    </section>
  );
}
