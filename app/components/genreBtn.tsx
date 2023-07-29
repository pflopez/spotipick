export default function GenreBtn({
  genre,
  onSelect,
}: {
  genre: string;
  onSelect: () => void;
}) {
  return (
    <button className="rounded bg-blue-100 py-2 px-5 m-1" onClick={onSelect}>
      {genre}
    </button>
  );
}
