import { act, renderHook } from "@testing-library/react";
import { usePlayPiece } from "hooks";
import { RecoilRoot, useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { Board, Player } from "types";

const render = () => {
  const { result } = renderHook(
    () => ({
      play: usePlayPiece(),
      board: useRecoilValue(boardState),
      player: useRecoilValue(playerState),
      gameOver: useRecoilValue(gameOverState),
    }),
    {
      wrapper: RecoilRoot,
    }
  );

  return {
    result,
    play: (col: number) => {
      act(() => {
        result.current.play(col);
      });
    },
    assertGame: (player: Player, gameOver: boolean, board: Board) => {
      expect(result.current.board).toEqual(board);
      expect(result.current.player).toEqual(player);
      expect(result.current.gameOver).toEqual(gameOver);
    },
  };
};

afterEach(() => {
  // We are persisting the results in local storage so we
  // will need to clear before each test.
  localStorage.clear();
});

test("should win with 4 in a row vertically", () => {
  const { play, assertGame } = render();

  [0, 1, 0, 1, 0, 1, 0].forEach(play);

  // Player 1 won the game!
  assertGame(1, true, [[1, 1, 1, 1], [2, 2, 2], [], [], [], [], []]);

  play(1);
  // Can't play any more pieces after the game is over
  assertGame(1, true, [[1, 1, 1, 1], [2, 2, 2], [], [], [], [], []]);
});

test("should win with 4 in a row horizontally", () => {
  const { play, assertGame } = render();

  [0, 6, 1, 6, 3, 6, 4, 5, 2].forEach(play);

  // Player 1 won the game!
  assertGame(1, true, [[1], [1], [1], [1], [1], [2], [2, 2, 2]]);
});

test("should not play a piece when the column is full", () => {
  const { play, assertGame } = render();

  [0, 0, 0, 0, 0, 0].forEach(play);

  assertGame(1, false, [[1, 2, 1, 2, 1, 2], [], [], [], [], [], []]);

  play(0);
  // No change because column is full
  assertGame(1, false, [[1, 2, 1, 2, 1, 2], [], [], [], [], [], []]);
});

test("should be a diagonal Up Right win when it starts on the first row", () => {
  const { play, assertGame } = render();

  [0, 1, 1, 2, 2, 3, 2, 3, 4, 3, 3].forEach(play);

  assertGame(1, true, [[1], [2, 1], [2, 1, 1], [2, 2, 2, 1], [1], [], []]);
});

test("should be a diagonal Up Right win when it starts on the middle", () => {
  const { play, assertGame } = render();

  [2, 3, 3, 4, 4, 5, 4, 5, 6, 5, 5].forEach(play);

  assertGame(1, true, [[], [], [1], [2, 1], [2, 1, 1], [2, 2, 2, 1], [1]]);
});

test("should be a diagonal Up left win start on the end row", () => {
  const { play, assertGame } = render();

  [6, 5, 5, 4, 3, 4, 4, 3, 3, 2, 3].forEach(play);

  assertGame(1, true, [[], [], [2], [1, 2, 1, 1], [2, 2, 1], [2, 1], [1]]);
});

test("should be a diagonal Up left win when start in the middle", () => {
  const { play, assertGame } = render();

  [4, 3, 3, 2, 1, 2, 2, 1, 1, 0, 1].forEach(play);

  assertGame(1, true, [[2], [1, 2, 1, 1], [2, 2, 1], [2, 1], [1], [], []]);
});
