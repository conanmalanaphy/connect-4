import { Flex, Input, InputLeftAddon, InputGroup, Box } from "@chakra-ui/react";
import PlayerColourCircle from "components/PlayerColourCircle";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { playersNamesState } from "state";
import { playerOneColours, playerTwoColours } from "const";

interface IPlayerName {
  colours: string[];
  placeholderText: string;
  player: number;
  addOnText: string;
}

const PlayerName: FC<IPlayerName> = ({ colours, placeholderText, player, addOnText }) => {
  const [playersNames, setPlayersNames] = useRecoilState(playersNamesState);

  return (
    <Flex>
      <InputGroup>
        <InputLeftAddon children={addOnText} />
        <Input
          minWidth="8rem"
          marginRight="1rem"
          marginBottom="1rem"
          value={playersNames[player-1]}
          onChange={(event) => {
            const value = event.target.value;

            const names = [...playersNames];
            names[player - 1] = value

            setPlayersNames(names)
          }}
          placeholder={placeholderText}
        />
      </InputGroup>
      {colours.map((colour) => {
        return <PlayerColourCircle key={colour} colour={colour} player={player} />
      })}
    </Flex>
  );
};

const PlayerNames: FC = () => {
  return (
    <Box>
      <PlayerName colours={playerOneColours} player={1} placeholderText="Player One Name" addOnText="Player 1" />
      <PlayerName colours={playerTwoColours} player={2} placeholderText="Player Two Name" addOnText="Player 2" />
    </Box>
  );
};

export default PlayerNames;
