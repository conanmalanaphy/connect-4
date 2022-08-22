import { Circle, Stack, Heading, Center, Button } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { winCountState, playersColourState } from "state";

const WinCount: FC = () => {
  const [winCount, setWinCount] = useRecoilState(winCountState);
  const playersColours = useRecoilValue(playersColourState);

  return (
    <Stack spacing={6} paddingTop={3}>
      <Center>
        <Heading as='h4' size='md'>
          Win Count
        </Heading>
      </Center>
      <Center margin={"auto"}>
        <Circle
          m={1}
          size="30px"
          boxShadow="inner"
          bg={playersColours[0]}
        > 
          {winCount[0]} 
        </Circle>
        <Circle
          m={1}
          size="30px"
          boxShadow="inner"
          bg={playersColours[1]}
        >
          {winCount[1]} 
        </Circle>
      </Center>
      <Button onClick={()=>setWinCount([0,0])}>
        Clear Win count
      </Button>
    </Stack>
  );
};

export default WinCount;
