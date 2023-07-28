"use client";
import GenreBtn from "@/app/components/genreBtn";
import { useEffect, useState } from "react";
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function GenrePicker({
  genres,
  submitGenres,
}: {
  genres: string[];
  submitGenres: (genres: string[]) => void;
}) {
  const [picks, setPicks] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenre] = useState<string[]>([]);
  useEffect(() => {
    setPicks(shuffle(genres).slice(0, 5));
  }, [genres]);

  function pickGenre(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenre(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenre([...selectedGenres, genre]);
    }
  }

  return (
    <section>
      Pick at least one genre:
      {selectedGenres.map((d, i) => (
        <div key={i}>s {d}</div>
      ))}
      <div>
        {picks.map((genre, i) => (
          <GenreBtn
            key={i}
            genre={genre}
            onSelect={() => pickGenre(genre)}
          ></GenreBtn>
        ))}
      </div>
      <button onClick={() => submitGenres(selectedGenres)}>Next</button>
    </section>
  );
}
