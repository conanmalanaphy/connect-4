import { ChakraProvider, Container, HStack, VStack, Heading, Center } from "@chakra-ui/react";
import Board from "components/Board";
import GameControls from "components/GameControls";
import PlayerNames from "components/PlayerNames";
import GameProgress from "components/GameProgress";
import WinCounter from "components/WinCounter";
import { FC } from "react";
import { RecoilRoot } from "recoil";

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Center margin="1rem">
        <Heading as='h1' size='lg'>
          Connect 4
        </Heading>
      </Center>
      <Container maxWidth="80vw" as={HStack}>
        <Container py={4} as={VStack} gap="1rem">
          <Board />
          <GameProgress />
          <GameControls />
        </Container>
        <Container py={4} as={VStack}>
          <PlayerNames />
          <WinCounter />
        </Container>
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
