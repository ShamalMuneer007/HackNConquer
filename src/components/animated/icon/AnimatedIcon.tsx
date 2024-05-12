import React, { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import { File } from "buffer";
interface Props {
  size?: number;
  icon: any;
}
function AnimatedIcon({ size = 150, icon }: Props) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <Player
      ref={playerRef}
      icon={icon}
      size={size}
      onComplete={() => playerRef.current?.playFromBeginning()}
    />
  );
}

export default AnimatedIcon;
