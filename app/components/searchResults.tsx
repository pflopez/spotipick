import Album from "@/app/components/album";
import { SearchResults } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export default function SearchResults(props: { search: string }) {
  const [items, setItems] = useState<SearchResults>();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/search?q=${props.search}`,
      );
      const items = await response.json();
      setItems(items);
    }
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="inline-grid grid-cols-4 gap-4">
        {items &&
          items.albums.items.map((d) => <Album key={d.id} album={d}></Album>)}
      </div>
    </div>
  );
}
