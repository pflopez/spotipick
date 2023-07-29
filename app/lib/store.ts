import { createContext } from "react";
import { Spotify } from "@/app/lib/spotify";

const context = createContext(new Spotify());
export default context;
