import { useContext, useEffect, useState } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import { Page, Track } from "@spotify/web-api-ts-sdk";
import TrackComponent from "@/app/components/track";
import TrackRow from "@/app/components/trackRow";

export default function TracksPicker({
  selectedGenre,
  onSubmitTracks,
}: {
  selectedGenre: string;
  onSubmitTracks: (tracks: Track[]) => void;
}) {
  const COUNT = 5;
  const spotify = useContext<Spotify>(SpotifyContext);
  const [tracks, setTracks] = useState<Page<Track>>();
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

  const [displayedTracks, setDisplayedTracks] = useState<Track[]>([]);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    async function getTracks() {
      const t = await spotify.getTracks(selectedGenre);
      setTracks(t.tracks);
    }
    getTracks();
  }, [selectedGenre, spotify]);

  useEffect(() => {
    if (tracks?.items) {
      setDisplayedTracks(
        tracks?.items.slice(displayIndex, displayIndex + COUNT),
      );
    }
  }, [tracks, displayIndex]);

  function selectTrack(track: Track) {
    if (selectedTracks.includes(track)) {
    } else {
      setSelectedTracks([...selectedTracks, track]);
      setDisplayIndex((prev) => prev + COUNT);
    }
  }

  function submitTracks() {
    console.log("ss");
    onSubmitTracks(selectedTracks);
  }

  return (
    <section>
      <h2>Now pick your favorite track from this</h2>
      <div className="grid grid-cols-5 gap-2">
        {displayedTracks.map((track) => (
          <TrackComponent
            key={track.id}
            track={track}
            selectTrack={selectTrack}
          />
        ))}
      </div>

      <div>Selected Tracks </div>
      <div className="mb-1">
        {selectedTracks.map((track) => (
          <TrackRow key={track.id} track={track} selectTrack={selectTrack} />
        ))}
      </div>
      <button onClick={submitTracks}>Next</button>
    </section>
  );
}
