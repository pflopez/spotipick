import GenreBtn from "@/app/components/genreBtn";
import { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function GenrePicker({
  genres,
  submitGenre,
}: {
  genres: string[];
  submitGenre: (genre: string) => void;
}) {
  const [picks, setPicks] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);

  useEffect(() => {
    setPicks(shuffle(genres).slice(0, 5));
  }, [genres]);

  useEffect(() => {
    // updating `skipped` shuffles and gives new picks
    const filtered = genres.filter((genre) => !skipped.includes(genre));
    setPicks(shuffle(filtered).slice(0, 5));
  }, [skipped, genres]);

  function skipGenres() {
    // remove the current picks from genres
    setSkipped((prevState) => [...prevState, ...picks]);
  }

  return (
    <section className="text-center">
      <h2 className="p-2 font-bold">Pick a genre</h2>

      <div className="mb-10">
        {picks.map((genre, i) => (
          <GenreBtn
            key={i}
            genre={genre}
            onSelect={() => submitGenre(genre)}
          ></GenreBtn>
        ))}
      </div>
      {picks.length === 0 && skipped.length > 0 && (
        <div>Woah nothing works for you huh.</div>
      )}
      <button
        onClick={skipGenres}
        className="rounded bg-slate-300 p-2 flex items-center gap-1 justify-center m-auto"
      >
        <TbReload /> Give me other genres
      </button>
    </section>
  );
}
