import { boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState, winCountState } from "state";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

function isWinningRow(a?: number, b?: number, c?: number, d?: number) {
  // Don't bother checking the other values if the first value isn't a number
  if (typeof a !== "number") {
    return false;
  }

  return a === b && a === c && a === d;
}

const testDiagonalUpLeftWin = (board: number[][]): boolean => {
  let hasWon = false;

  // Starting from top final column up until there is no posibilty of 4 in a row
  for (let c = 6; c >= 3; c--) {
    for (let r = 0; r < 2; r++) {
      if (
        isWinningRow(
          board[c][r],
          board[c - 1][r + 1],
          board[c - 2][r + 2],
          board[c - 3][r + 3]
        )
      ) {
        hasWon = true;
        break;
      }
    }
  }

  return hasWon;
};

const testDiagonalUpRightWin = (board: number[][]): boolean => {
  let hasWon = false;

  // Starting from column 1 up until there is no posibilty of 4 in a row
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 2; r++) {
      if (
        isWinningRow(
          board[c][r],
          board[c + 1][r + 1],
          board[c + 2][r + 2],
          board[c + 3][r + 3]
        )
      ) {
        hasWon = true;
        break;
      }
    }
  }

  return hasWon;
};

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const [winCount, setWinCountState] = useRecoilState(winCountState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      testDiagonalUpRightWin(newBoard) ||
      testDiagonalUpLeftWin(newBoard)
    ) {
      setGameOver(true);

      // We want to keep a store of how many times each player has won
      const updatedWinCount = [...winCount];
      updatedWinCount[player - 1] = updatedWinCount[player - 1] + 1;

      setWinCountState(updatedWinCount);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
