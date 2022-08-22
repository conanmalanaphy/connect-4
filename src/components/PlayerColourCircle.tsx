import { Circle } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { playersColourState } from "state";

interface IPlayerColourCircle {
  colour: string;
  player: number;
}

const PlayerColourCircle: FC<IPlayerColourCircle> = ({ colour, player }) => {
  const [playersColours, setPlayersColours] = useRecoilState(playersColourState);

  return (
    <Circle
      m={1}
      size="30px"
      boxShadow="inner"
      cursor="pointer"
      bg={colour}
      onClick={() => {
        const colours = [...playersColours];
        colours[player-1] = colour;

        setPlayersColours(colours)
      }}
    />
  );
};

export default PlayerColourCircle;
