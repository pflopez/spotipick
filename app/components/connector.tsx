import { useCallback, useContext, useEffect, useState } from "react";
import { Spotify } from "@/app/lib/spotify";
import SpotifyContext from "@/app/lib/store";
import { Device } from "@spotify/web-api-ts-sdk";
import { TbCircleCheck, TbPlugConnectedX } from "react-icons/tb";

export default function Connector() {
  const spotify = useContext<Spotify>(SpotifyContext);
  const [device, setDevice] = useState<Device>();

  const setUserDevice = useCallback(async () => {
    const userDevice = await spotify.getDevice();
    if (userDevice) {
      setDevice(userDevice);
    }
  }, [spotify]);

  useEffect(() => {
    setUserDevice();
  }, [spotify, setUserDevice]);

  async function reload() {
    setUserDevice();
  }

  return (
    <div>
      {device && (
        <div className="flex items-center gap-1">
          <TbCircleCheck></TbCircleCheck>Connected
        </div>
      )}
      {!device && (
        <div className="flex items-center gap-1">
          <TbPlugConnectedX /> No player active. check spotify and{" "}
          <button className="bg-blue-500" onClick={reload}>
            Reload
          </button>
        </div>
      )}
    </div>
  );
}
